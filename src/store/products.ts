import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

// Local image imports (using `import.meta.url` for compatibility with Vite)
const RadianceSerum1 = new URL('../assets/products/ecoglow/radiance-serum-1.jpg', import.meta.url).href;
const RadianceSerum2 = new URL('../assets/products/ecoglow/radiance-serum-2.jpg', import.meta.url).href;
const HydratingMoisturizer1 = new URL('../assets/products/ecoglow/hydrating-moisturizer-1.jpg', import.meta.url).href;
const HydratingMoisturizer2 = new URL('../assets/products/ecoglow/hydrating-moisturizer-2.jpg', import.meta.url).href;

const CoffeeTable1 = new URL('../assets/products/artisanwood/coffee-table-1.jpg', import.meta.url).href;
const CoffeeTable2 = new URL('../assets/products/artisanwood/coffee-table-2.jpg', import.meta.url).href;
const DiningChairSet1 = new URL('../assets/products/artisanwood/dining-chair-set-1.jpg', import.meta.url).href;
const DiningChairSet2 = new URL('../assets/products/artisanwood/dining-chair-set-2.jpg', import.meta.url).href;

const SmartSpeaker1 = new URL('../assets/products/techvibe/smart-speaker-1.jpg', import.meta.url).href;
const SmartSpeaker2 = new URL('../assets/products/techvibe/smart-speaker-2.jpg', import.meta.url).href;
const WirelessEarbuds1 = new URL('../assets/products/techvibe/wireless-earbuds-1.jpg', import.meta.url).href;
const WirelessEarbuds2 = new URL('../assets/products/techvibe/wireless-earbuds-2.jpg', import.meta.url).href;
const GamingConsole1 = new URL('../assets/products/techvibe/gaming-console-1.jpg', import.meta.url).href;
const GamingConsole2 = new URL('../assets/products/techvibe/gaming-console-2.jpg', import.meta.url).href;

interface ProductsState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'userId'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  getProductsByBrand: (brandId: string) => Product[];
}

// Demo products data
const DEMO_PRODUCTS: Product[] = [
  // Ecoglow Products
  {
    id: '1',
    name: 'Radiance Serum',
    description: 'Brightening vitamin C serum for glowing skin',
    category: 'Skincare',
    price: 49.99,
    images: [
      { id: '1', url: RadianceSerum1, type: 'local' },
      { id: '2', url: RadianceSerum2, type: 'local' },
    ],
    brandId: '1',
    userId: '1',
    stock: 100,
    createdAt: new Date().toISOString(),
    status: 'published',
    discount: {
      enabled: true,
      amount: 10,
    },
  },
  {
    id: '2',
    name: 'Hydrating Moisturizer',
    description: 'Deep hydration for all skin types',
    category: 'Skincare',
    price: 39.99,
    images: [
      { id: '3', url: HydratingMoisturizer1, type: 'local' },
      { id: '4', url: HydratingMoisturizer2, type: 'local' },
    ],
    brandId: '1',
    userId: '1',
    stock: 150,
    createdAt: new Date().toISOString(),
    status: 'published',
  },

  // ArtisanWood Products
  {
    id: '3',
    name: 'Coffee Table',
    description: 'Handcrafted wooden coffee table',
    category: 'Furniture',
    price: 199.99,
    images: [
      { id: '5', url: CoffeeTable1, type: 'local' },
      { id: '6', url: CoffeeTable2, type: 'local' },
    ],
    brandId: '2',
    userId: '2',
    stock: 20,
    createdAt: new Date().toISOString(),
    status: 'published',
  },
  {
    id: '4',
    name: 'Dining Chair Set',
    description: 'Set of 4 dining chairs made of oak wood',
    category: 'Furniture',
    price: 299.99,
    images: [
      { id: '7', url: DiningChairSet1, type: 'local' },
      { id: '8', url: DiningChairSet2, type: 'local' },
    ],
    brandId: '2',
    userId: '2',
    stock: 10,
    createdAt: new Date().toISOString(),
    status: 'published',
  },

  // TechVibe Products
  {
    id: '5',
    name: 'Smart Speaker',
    description: 'Voice-controlled smart speaker with high-quality sound',
    category: 'Electronics',
    price: 129.99,
    images: [
      { id: '9', url: SmartSpeaker1, type: 'local' },
      { id: '10', url: SmartSpeaker2, type: 'local' },
    ],
    brandId: '3',
    userId: '3',
    stock: 50,
    createdAt: new Date().toISOString(),
    status: 'published',
  },
  {
    id: '6',
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with noise cancellation',
    category: 'Electronics',
    price: 79.99,
    images: [
      { id: '11', url: WirelessEarbuds1, type: 'local' },
      { id: '12', url: WirelessEarbuds2, type: 'local' },
    ],
    brandId: '3',
    userId: '3',
    stock: 200,
    createdAt: new Date().toISOString(),
    status: 'published',
  },
  {
    id: '7',
    name: 'Gaming Console',
    description: 'Next-gen gaming console with immersive gameplay',
    category: 'Electronics',
    price: 499.99,
    images: [
      { id: '13', url: GamingConsole1, type: 'local' },
      { id: '14', url: GamingConsole2, type: 'local' },
    ],
    brandId: '3',
    userId: '3',
    stock: 30,
    createdAt: new Date().toISOString(),
    status: 'published',
  },
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
            type: 'local',
          })) || [],
        };
        set((state) => ({ products: [...state.products, newProduct] }));
      },

      updateProduct: (id, product) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id
              ? {
                  ...p,
                  ...product,
                  images: product.images?.map((img) => ({
                    ...img,
                    id: img.id || Math.random().toString(36).substr(2, 9),
                    type: 'local',
                  })) || p.images,
                }
              : p
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      getProduct: (id) => get().products.find((p) => p.id === id),

      getProductsByBrand: (brandId) => get().products.filter((p) => p.brandId === brandId),
    }),
    {
      name: 'products-storage',
    }
  )
);
