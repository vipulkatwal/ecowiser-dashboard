import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserPreferences } from '../types';

// Define the SettingsState interface
interface SettingsState {
  preferences: UserPreferences; // Current user preferences
  updatePreferences: (preferences: Partial<UserPreferences>) => void; // Function to update preferences
}

// Default user preferences
const defaultPreferences: UserPreferences = {
  theme: 'system', // Default theme preference is 'system' (can be light or dark based on the system setting)
  language: 'en', // Default language preference is English
  notifications: {
    email: true, // Enable email notifications
    push: true, // Enable push notifications
    marketing: false, // Disable marketing notifications
  },
  display: {
    density: 'comfortable', // Default display density setting
    animations: true, // Enable animations
  },
};

// Create the Zustand store with persistent state using the `persist` middleware
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      preferences: defaultPreferences, // Initialize with default preferences

      // Function to update user preferences
      updatePreferences: (newPreferences) => {
        set((state) => ({
          preferences: {
            ...state.preferences, // Retain existing preferences
            ...newPreferences, // Overwrite with the new preferences
          },
        }));
      },
    }),
    {
      name: 'settings-storage', // Persist store with a specific name for local storage
    }
  )
);
