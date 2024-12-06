import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Settings,
  Bell,
  CreditCard,
  Lock,
  HelpCircle,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useAuthStore } from '../../store/auth';

interface AccountDropdownProps {
  onOpenSettings: () => void; // Prop for handling "Settings" menu click
}

export default function AccountDropdown({ onOpenSettings }: AccountDropdownProps) {
  const { user, logout } = useAuthStore(); // Auth store for user data and logout function
  const [showDropdown, setShowDropdown] = React.useState(false); // State to toggle the dropdown visibility
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference to detect clicks outside the dropdown

  // Menu items to display in the dropdown
  const menuItems = [
    { icon: User, label: 'Your Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', onClick: onOpenSettings },
    { icon: Bell, label: 'Notifications', href: '/notifications', badge: 3 },
    { icon: CreditCard, label: 'Billing', href: '/billing' },
    { icon: Lock, label: 'Security', href: '/security' },
    { icon: HelpCircle, label: 'Help & Support', href: '/help' },
    { icon: LogOut, label: 'Sign out', onClick: logout, className: 'text-red-600 hover:bg-red-50' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close dropdown if clicked outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown toggle button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors w-full"
      >
        {/* User avatar with online indicator */}
        <div className="relative">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
          />
          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 ring-2 ring-white" />
        </div>

        {/* User name and email */}
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>

        {/* Chevron icon indicating dropdown state */}
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
            showDropdown ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {/* Dropdown menu */}
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} // Animation on dropdown open
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }} // Animation on dropdown close
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 w-64 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50"
          >
            <div className="p-2 space-y-1">
              {/* Render menu items dynamically */}
              {menuItems.map((item) =>
                item.href ? (
                  <Link
                    key={item.label}
                    to={item.href} // Use `Link` for navigation links
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors ${item.className || ''}`}
                    onClick={() => setShowDropdown(false)} // Close dropdown after navigation
                  >
                    <div className="flex items-center">
                      <item.icon className="h-4 w-4 mr-3 text-gray-400" />
                      {item.label}
                    </div>
                    {item.badge && (
                      <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => {
                      item.onClick?.(); // Trigger action for non-navigation items
                      setShowDropdown(false); // Close dropdown after action
                    }}
                    className={`flex items-center w-full px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors ${item.className || ''}`}
                  >
                    <item.icon className="h-4 w-4 mr-3 text-gray-400" />
                    {item.label}
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
