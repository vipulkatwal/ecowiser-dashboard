// types.ts

/**
 * Represents an image with multiple source types and flexible handling
 */
export interface ImageType {
  id: string;
  url: string;
  file?: File;
  type: 'url' | 'file' | 'local';
  alt?: string;
}

/**
 * User preferences for personalization and app settings
 */
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  display: {
    density: 'comfortable' | 'compact' | 'spacious';
    animations: boolean;
    colorScheme?: string;
  };
}

/**
 * User account information with optional extended details
 */
export interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  avatar?: string | ImageType;
  role?: 'admin' | 'seller' | 'customer';
  preferences?: UserPreferences;
  createdAt: string;
  lastLogin?: string;
  isVerified?: boolean;
}

/**
 * Brand representation with comprehensive details
 */
export interface Brand {
  id: string;
  name: string;
  description: string;
  logo: string | ImageType;
  images: ImageType[];
  userId: string;
  createdAt: string;
  status: 'active' | 'inactive' | 'pending';
  website?: string;
  contactEmail?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  tags?: string[];
}

/**
 * Product details with flexible pricing and inventory management
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  comparePrice?: number;
  image: string | ImageType;
  images: ImageType[];
  brandId: string;
  userId: string;
  stock: number;
  minStock?: number;
  maxStock?: number;
  sku?: string;
  barcode?: string;
  createdAt: string;
  updatedAt?: string;
  status: 'published' | 'draft' | 'hidden' | 'archived';
  scheduledDate?: string;
  tags?: string[];
  variants?: ProductVariant[];
  discount?: {
    enabled: boolean;
    type: 'percentage' | 'fixed';
    amount: number;
    startDate?: string;
    endDate?: string;
  };
}

/**
 * Product variant for more complex product configurations
 */
export interface ProductVariant {
  id: string;
  name: string;
  price?: number;
  stock: number;
  sku?: string;
  image?: ImageType;
  attributes: {
    [key: string]: string;
  };
}

/**
 * Utility type for creating optional versions of interfaces
 */
export type Partial<T> = {
  [P in keyof T]?: T[P];
};