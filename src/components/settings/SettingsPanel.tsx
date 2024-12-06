import React from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Moon, Sun, Monitor, Globe, Bell, Layout } from 'lucide-react';
import { useSettingsStore } from '../../store/settings';
import { Button } from '../ui/Button';

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ open, onClose }: SettingsPanelProps) {
  const { preferences, updatePreferences } = useSettingsStore();

  // Theme options with their respective icons
  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  // Language options
  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
  ];

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* Dialog Panel with motion animation */}
        <Dialog.Panel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-2xl w-full rounded-xl bg-white shadow-xl"
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between p-6 border-b">
            <Dialog.Title className="text-xl font-semibold text-gray-900">Settings</Dialog.Title>
            <Button variant="secondary" onClick={onClose}>Close</Button>
          </div>

          <div className="p-6 space-y-8">
            {/* Theme Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Theme</h3>
              <div className="grid grid-cols-3 gap-3">
                {themeOptions.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => updatePreferences({ theme: value as any })}
                    className={`flex items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                      preferences.theme === value
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Settings */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-gray-500" />
                <h3 className="text-lg font-medium text-gray-900">Language</h3>
              </div>
              <select
                value={preferences.language}
                onChange={(e) => updatePreferences({ language: e.target.value })}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {languageOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Notification Settings */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-gray-500" />
                <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
              </div>
              <div className="space-y-3">
                {Object.entries(preferences.notifications).map(([key, value]) => (
                  <label key={key} className="flex items-center justify-between">
                    <span className="text-gray-700 capitalize">{key}</span>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) =>
                        updatePreferences({
                          notifications: {
                            ...preferences.notifications,
                            [key]: e.target.checked,
                          },
                        })
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Display Settings */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Layout className="h-5 w-5 text-gray-500" />
                <h3 className="text-lg font-medium text-gray-900">Display</h3>
              </div>
              <div className="space-y-4">
                {/* Density setting */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Density</label>
                  <select
                    value={preferences.display.density}
                    onChange={(e) =>
                      updatePreferences({
                        display: {
                          ...preferences.display,
                          density: e.target.value as any,
                        },
                      })
                    }
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="comfortable">Comfortable</option>
                    <option value="compact">Compact</option>
                  </select>
                </div>
                {/* Enable animations setting */}
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Enable animations</span>
                  <input
                    type="checkbox"
                    checked={preferences.display.animations}
                    onChange={(e) =>
                      updatePreferences({
                        display: {
                          ...preferences.display,
                          animations: e.target.checked,
                        },
                      })
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
