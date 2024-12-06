import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Brand } from '../types';

// Import local images for demo brands
import EcoGlowLogo from '../assets/logos/ecoglow-logo.jpeg';
import EcoGlowImage1 from '../assets/images/ecoglow-1.jpg';
import EcoGlowImage2 from '../assets/images/ecoglow-2.jpg';

import ArtisanWoodLogo from '../assets/logos/artisanwood-logo.jpeg';
import ArtisanWoodImage1 from '../assets/images/artisanwood-1.jpg';
import ArtisanWoodImage2 from '../assets/images/artisanwood-2.jpg';

import TechVibeLogo from '../assets/logos/techvibe-logo.jpeg';
import TechVibeImage1 from '../assets/images/techvibe-1.jpg';
import TechVibeImage2 from '../assets/images/techvibe-2.jpg';

// Define the BrandsState interface
interface BrandsState {
  brands: Brand[];
  addBrand: (brand: Omit<Brand, 'id' | 'createdAt' | 'userId'>) => void;
  updateBrand: (id: string, brand: Partial<Brand>) => void;
  deleteBrand: (id: string) => void;
  getBrand: (id: string) => Brand | undefined;
}

// Demo brands data with local image imports
const DEMO_BRANDS: Brand[] = [
  {
    id: '1',
    name: 'EcoGlow Skincare',
    description: 'Premium organic and sustainable skincare products made with natural ingredients',
    logo: EcoGlowLogo,
    images: [
      { id: '1', url: EcoGlowImage1, type: 'local' },
      { id: '2', url: EcoGlowImage2, type: 'local' }
    ],
    userId: '1',
    createdAt: new Date().toISOString(),
    status: 'active',
    website: 'https://ecoglow.example.com',
    socialLinks: {
      facebook: 'https://facebook.com/ecoglow',
      instagram: 'https://instagram.com/ecoglow',
      twitter: 'https://twitter.com/ecoglow'
    }
  },
  {
    id: '2',
    name: 'ArtisanWood',
    description: 'Handcrafted furniture and home decor made from sustainable materials',
    logo: ArtisanWoodLogo,
    images: [
      { id: '3', url: ArtisanWoodImage1, type: 'local' },
      { id: '4', url: ArtisanWoodImage2, type: 'local' }
    ],
    userId: '1',
    createdAt: new Date().toISOString(),
    status: 'active',
    website: 'https://artisanwood.example.com',
    socialLinks: {
      facebook: 'https://facebook.com/artisanwood',
      instagram: 'https://instagram.com/artisanwood'
    }
  },
  {
    id: '3',
    name: 'TechVibe',
    description: 'Cutting-edge electronics and smart home devices',
    logo: TechVibeLogo,
    images: [
      { id: '5', url: TechVibeImage1, type: 'local' },
      { id: '6', url: TechVibeImage2, type: 'local' }
    ],
    userId: '1',
    createdAt: new Date().toISOString(),
    status: 'active',
    website: 'https://techvibe.example.com',
    socialLinks: {
      twitter: 'https://twitter.com/techvibe',
      instagram: 'https://instagram.com/techvibe'
    }
  }
];

// Create the Zustand store with persistent state using the `persist` middleware
export const useBrandsStore = create<BrandsState>()(
  persist(
    (set, get) => ({
      brands: DEMO_BRANDS,  // Initial demo brand data

      // Add a new brand to the store
      addBrand: (brand) => {
        const newBrand: Brand = {
          ...brand,
          id: Math.random().toString(36).substr(2, 9),  // Generate unique ID
          userId: '1',  // Static user ID for demo
          createdAt: new Date().toISOString(),  // Set current timestamp
          // Ensure local image type for new brands
          logo: brand.logo || '',
          images: brand.images?.map((img) => ({
            ...img,
            id: img.id || Math.random().toString(36).substr(2, 9),  // Generate unique ID for images
            type: 'local'  // Set image type to 'local'
          })) || []
        };
        set((state) => ({ brands: [...state.brands, newBrand] }));
      },

      // Update an existing brand in the store
      updateBrand: (id, brand) => {
        set((state) => ({
          brands: state.brands.map((b) =>
            b.id === id
              ? {
                  ...b,
                  ...brand,
                  // Ensure local image type when updating
                  logo: brand.logo || b.logo,
                  images: brand.images?.map((img) => ({
                    ...img,
                    id: img.id || Math.random().toString(36).substr(2, 9),  // Generate unique ID for images
                    type: 'local'  // Set image type to 'local'
                  })) || b.images
                }
              : b
          ),
        }));
      },

      // Delete a brand from the store
      deleteBrand: (id) => {
        set((state) => ({
          brands: state.brands.filter((b) => b.id !== id),  // Remove the brand by ID
        }));
      },

      // Get a brand by ID
      getBrand: (id) => {
        return get().brands.find((b) => b.id === id);  // Find and return the brand by ID
      },
    }),
    {
      name: 'brands-storage',  // Persist store with a specific name
    }
  )
);
