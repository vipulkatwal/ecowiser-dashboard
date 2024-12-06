export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  display: {
    density: 'comfortable' | 'compact';
    animations: boolean;
  };
}

export interface ImageType {
  id: string;
  url: string;
  file?: File;
  type: 'url' | 'file';
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  logo: string;
  images: ImageType[];
  userId: string;
  createdAt: string;
  status: 'active' | 'inactive';
  website?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  images: ImageType[];
  brandId: string;
  userId: string;
  stock: number;
  createdAt: string;
  status: 'published' | 'scheduled' | 'hidden';
  scheduledDate?: string;
  discount?: {
    enabled: boolean;
    amount: number;
  };
}