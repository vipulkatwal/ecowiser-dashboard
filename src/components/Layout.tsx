import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import brandLogo from '/src/assets/brandLogo.png';

import {
  LayoutDashboard,
  Box,
  Package,
  Users,
  Tags,
  ShoppingCart,
  Ticket,
  MessageCircle,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '../store/auth';
import SettingsPanel from './settings/SettingsPanel';

function Layout() {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const logout = useAuthStore((state) => state.logout);

  // Navigation structure
  const navigation = [
    {
      section: 'MENU',
      items: [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        { name: 'Products', href: '/products', icon: Package },
        { name: 'Brands', href: '/brands', icon: Box },
      ],
    },
    {
      section: 'BUSINESS',
      items: [
        { name: 'Customers', href: '/customers', icon: Users },
        { name: 'Categories', href: '/categories', icon: Tags },
        { name: 'Orders', href: '/orders', icon: ShoppingCart },
        { name: 'Coupons', href: '/coupons', icon: Ticket },
        { name: 'Chats', href: '/chats', icon: MessageCircle, badge: 4 },
      ],
    },
    {
      section: 'OTHER',
      items: [
        { name: 'Settings', href: '/settings', icon: Settings },
        { name: 'Logout', onClick: logout, icon: LogOut, className: 'text-red-600 hover:bg-red-50' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarCollapsed ? 'w-16' : 'w-64'
          } bg-white border-r border-gray-200 transition-all duration-300`}
        >
          <div className="flex flex-col h-full">
            {/* Logo Section */}
            <div className="flex items-center h-14 px-4 border-b border-gray-200">
              {!isSidebarCollapsed && (
                <img src={brandLogo} alt="Brand Logo" className="h-14" />
              )}
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-2 py-4 space-y-6 overflow-y-auto">
              {navigation.map((group) => (
                <div key={group.section}>
                  {!isSidebarCollapsed && (
                    <h2 className="text-xs font-semibold text-gray-400 mb-2">
                      {group.section}
                    </h2>
                  )}
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const isActive = location.pathname === item.href;
                      if (item.onClick) {
                        return (
                          <button
                            key={item.name}
                            onClick={item.onClick}
                            className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                              item.className || 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <item.icon
                              className={`h-5 w-5 ${
                                isActive ? 'text-blue-600' : 'text-gray-400'
                              }`}
                            />
                            {!isSidebarCollapsed && <span className="ml-3">{item.name}</span>}
                          </button>
                        );
                      }
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                            isActive
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <item.icon
                            className={`h-5 w-5 ${
                              isActive ? 'text-blue-600' : 'text-gray-400'
                            }`}
                          />
                          {!isSidebarCollapsed && <span className="ml-3">{item.name}</span>}
                          {item.badge && (
                            <span className="ml-auto bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="flex items-center justify-center w-full py-2 bg-gray-100 hover:bg-gray-200"
            >
              {isSidebarCollapsed ? '→' : '←'}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="py-6"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </motion.div>
        </main>
      </div>

      {/* Settings Panel (Modal/Overlay) */}
      <SettingsPanel open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}

export default Layout;
