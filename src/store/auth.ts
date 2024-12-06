import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

// Define the AuthState interface
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

// Demo user for testing
const DEMO_USER: User = {
  id: '1',
  email: 'demo@example.com',
  name: 'Demo User',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces',
};

// Create the Zustand store with persistent state using the `persist` middleware
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,  // Initial state of the user
      isAuthenticated: false,  // User is not authenticated initially

      // Login function
      login: async (email: string, password: string) => {
        // Simulate API call for login
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check credentials and set user state accordingly
        if (email === 'demo@example.com' && password === 'demo123') {
          set({ user: DEMO_USER, isAuthenticated: true });
        } else {
          throw new Error('Invalid credentials');
        }
      },

      // Signup function
      signup: async (email: string, password: string, name: string) => {
        // Simulate API call for signup
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Create a new user object
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),  // Generate a unique ID
          email,
          name,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,  // Generate a random avatar using email
        };

        // Set the user state and mark as authenticated
        set({ user: newUser, isAuthenticated: true });
      },

      // Logout function
      logout: () => {
        // Clear user data and set authentication to false
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',  // Persist store with a specific name
    }
  )
);
