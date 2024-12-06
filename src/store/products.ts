import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

// Import local images for EcoGlow products
import RadianceSerum1 from '../assets/products/ecoglow/radiance-serum-1.jpg';
import RadianceSerum2 from '../assets/products/ecoglow/radiance-serum-2.jpg';
import HydratingMoisturizer1 from '../assets/products/ecoglow/hydrating-moisturizer-1.jpg';
import HydratingMoisturizer2 from '../assets/products/ecoglow/hydrating-moisturizer-2.jpg';

// Import local images for ArtisanWood products
import CoffeeTable1 from '../assets/products/artisanwood/coffee-table-1.jpg';
import CoffeeTable2 from '../assets/products/artisanwood/coffee-table-2.jpg';
import DiningChairSet1 from '../assets/products/artisanwood/dining-chair-set-1.jpg';
import DiningChairSet2 from '../assets/products/artisanwood/dining-chair-set-2.jpg';

// Import local images for TechVibe products
import SmartSpeaker1 from '../assets/products/techvibe/smart-speaker-1.jpg';
import SmartSpeaker2 from '../assets/products/techvibe/smart-speaker-2.jpg';
import WirelessEarbuds1 from '../assets/products/techvibe/wireless-earbuds-1.jpg';
import WirelessEarbuds2 from '../assets/products/techvibe/wireless-earbuds-2.jpg';
import GamingConsole1 from '../assets/products/techvibe/gaming-console-1.jpg';
import GamingConsole2 from '../assets/products/techvibe/gaming-console-2.jpg';

interface ProductsState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'userId'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  getProductsByBrand: (brandId: string) => Product[];
}

// Demo products data with local image imports
const DEMO_PRODUCTS: Product[] = [
  // EcoGlow Products
  {
    id: '1',
    name: 'Radiance Serum',
    description: 'Brightening vitamin C serum for glowing skin',
    category: 'Skincare',
    price: 49.99,
    images: [
      { id: '1', url: new URL(RadianceSerum1, import.meta.url).href, type: 'local' },
      { id: '2', url: new URL(RadianceSerum2, import.meta.url).href, type: 'local' }
    ],
    brandId: '1',
    userId: '1',
    stock: 100,
    createdAt: new Date().toISOString(),
    status: 'published',
    discount: {
      enabled: true,
      amount: 10
    }
  },
  {
    id: '2',
    name: 'Hydrating Moisturizer',
    description: 'Deep hydration for all skin types',
    category: 'Skincare',
    price: 39.99,
    images: [
      { id: '3', url: new URL(HydratingMoisturizer1, import.meta.url).href, type: 'local' },
      { id: '4', url: new URL(HydratingMoisturizer2, import.meta.url).href, type: 'local' }
    ],
    brandId: '1',
    userId: '1',
    stock: 150,
    createdAt: new Date().toISOString(),
    status: 'published'
  },

  // ArtisanWood Products
  {
    id: '3',
    name: 'Wooden Coffee Table',
    description: 'Handcrafted coffee table made from reclaimed wood',
    category: 'Furniture',
    price: 299.99,
    images: [
      { id: '5', url: new URL(CoffeeTable1, import.meta.url).href, type: 'local' },
      { id: '6', url: new URL(CoffeeTable2, import.meta.url).href, type: 'local' }
    ],
    brandId: '2',
    userId: '1',
    stock: 10,
    createdAt: new Date().toISOString(),
    status: 'published'
  },
  {
    id: '4',
    name: 'Dining Chair Set',
    description: 'Set of 4 handmade dining chairs',
    category: 'Furniture',
    price: 599.99,
    images: [
      { id: '7', url: new URL(DiningChairSet1, import.meta.url).href, type: 'local' },
      { id: '8', url: new URL(DiningChairSet2, import.meta.url).href, type: 'local' }
    ],
    brandId: '2',
    userId: '1',
    stock: 5,
    createdAt: new Date().toISOString(),
    status: 'published',
    discount: {
      enabled: true,
      amount: 15
    }
  },

  // TechVibe Products
  {
    id: '5',
    name: 'Smart Speaker',
    description: 'Voice-controlled smart speaker with premium sound',
    category: 'Electronics',
    price: 199.99,
    images: [
      { id: '9', url: new URL(SmartSpeaker1, import.meta.url).href, type: 'local' },
      { id: '10', url: new URL(SmartSpeaker2, import.meta.url).href, type: 'local' }
    ],
    brandId: '3',
    userId: '1',
    stock: 75,
    createdAt: new Date().toISOString(),
    status: 'published'
  },
  {
    id: '6',
    name: 'Wireless Earbuds',
    description: 'Premium wireless earbuds with noise cancellation',
    category: 'Electronics',
    price: 149.99,
    images: [
      { id: '11', url: new URL(WirelessEarbuds1, import.meta.url).href, type: 'local' },
      { id: '12', url: new URL(WirelessEarbuds2, import.meta.url).href, type: 'local' }
    ],
    brandId: '3',
    userId: '1',
    stock: 100,
    createdAt: new Date().toISOString(),
    status: 'published',
    discount: {
      enabled: true,
      amount: 20
    }
  },
  {
    id: '7',
    name: 'Gaming Console',
    description: 'Premium gaming console with disk.',
    category: 'Electronics',
    price: 359.99,
    images: [
      { id: '13', url: new URL(GamingConsole1, import.meta.url).href, type: 'local' },
      { id: '14', url: new URL(GamingConsole2, import.meta.url).href, type: 'local' }
    ],
    brandId: '3',
    userId: '1',
    stock: 118,
    createdAt: new Date().toISOString(),
    status: 'published',
    discount: {
      enabled: true,
      amount: 25
    }
  }
];

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: DEMO_PRODUCTS,

      addProduct: (product) => {
        const newProduct: Product = {
          ...product,
          id: Math.random().toString(36).substr(2, 9),
          userId: '1',
          createdAt: new Date().toISOString(),
          images: product.images?.map((img) => ({
            ...img,
            id: img.id || Math.random().toString(36).substr(2, 9),
            url: typeof img.url === 'string' ? img.url : new URL(img.url, import.meta.url).href,
            type: 'local'
          })) || []
        };
        set((state) => ({ products: [...state.products, newProduct] }));
      },

      updateProduct: (id, product) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? {
              ...p,
              ...product,
              images: product.images?.map((img) => ({
                ...img,
                id: img.id || Math.random().toString(36).substr(2, 9),
                url: typeof img.url === 'string' ? img.url : new URL(img.url, import.meta.url).href,
                type: 'local'
              })) || p.images
            } : p
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      getProduct: (id) => {
        return get().products.find((p) => p.id === id);
      },

      getProductsByBrand: (brandId) => {
        return get().products.filter((p) => p.brandId === brandId);
      },
    }),
    {
      name: 'products-storage',
    }
  )
);