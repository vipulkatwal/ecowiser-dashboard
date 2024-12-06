import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Product, ProductImage } from '../../types';
import { useProductsStore } from '../../store/products';
import { useBrandsStore } from '../../store/brands';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ImageUpload } from './ImageUpload';

interface ProductFormDialogProps {
  open: boolean;
  onClose: () => void;
  product?: Product;
}

export default function ProductFormDialog({
  open,
  onClose,
  product,
}: ProductFormDialogProps) {
  const addProduct = useProductsStore((state) => state.addProduct);
  const updateProduct = useProductsStore((state) => state.updateProduct);
  const brands = useBrandsStore((state) => state.brands);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form data based on the product if available
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    images: [] as ProductImage[],
    brandId: '',
    stock: 0,
    status: 'published' as const,
    scheduledDate: '',
    discount: {
      enabled: false,
      amount: 0,
    },
  });

  useEffect(() => {
    // Populate form fields if editing an existing product
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        images: product.images,
        brandId: product.brandId,
        stock: product.stock,
        status: product.status,
        scheduledDate: product.scheduledDate || '',
        discount: product.discount || { enabled: false, amount: 0 },
      });
    } else {
      // Initialize fields for adding a new product
      setFormData({
        name: '',
        description: '',
        category: '',
        price: 0,
        images: [],
        brandId: brands[0]?.id || '',
        stock: 0,
        status: 'published',
        scheduledDate: '',
        discount: {
          enabled: false,
          amount: 0,
        },
      });
    }
  }, [product, brands]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (product) {
        // Update product
        updateProduct(product.id, formData);
        toast.success('Product updated successfully');
      } else {
        // Add new product
        addProduct(formData);
        toast.success('Product created successfully');
      }
      onClose();
    } catch (error) {
      toast.error(product ? 'Failed to update product' : 'Failed to create product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-xl w-full overflow-y-auto max-h-[90vh]"
        >
          <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
            {product ? 'Edit Product' : 'Add Product'}
          </Dialog.Title>

          {/* Form to add/edit a product */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-sm font-medium text-gray-900">Basic Information</h3>

                <Input
                  label="Product Name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="p-2 text-lg bg-blue-50 border-none hover:bg-gray-300"
                />

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    className="block w-full rounded-md p-2 text-lg bg-blue-50 border-none hover:bg-gray-300 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <Input
                  label="Category"
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, category: e.target.value }))
                  }
                  className="p-2 text-lg bg-blue-50 border-none hover:bg-gray-300"
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Price"
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, price: parseFloat(e.target.value) }))
                    }
                    className="p-2 text-lg bg-blue-50 border-none hover:bg-gray-300"
                  />

                  <Input
                    label="Stock"
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, stock: parseInt(e.target.value) }))
                    }
                    className="p-2 text-lg bg-blue-50 border-none hover:bg-gray-300"
                  />
                </div>

                {/* Brand Selection */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Brand
                  </label>
                  <select
                    className="block w-full rounded-md p-2 text-lg bg-blue-50 border-none hover:bg-gray-300 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={formData.brandId}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, brandId: e.target.value }))
                    }
                    required
                  >
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Product Images and Visibility */}
              <div className="space-y-6">
                <h3 className="text-sm font-medium text-gray-900">Product Images</h3>
                <ImageUpload
                  images={formData.images}
                  onChange={(images) => setFormData((prev) => ({ ...prev, images }))}
                />

                <h3 className="text-sm font-medium text-gray-900">Visibility</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    {['published', 'scheduled', 'hidden'].map((status) => (
                      <label key={status} className="flex items-center">
                        <input
                          type="radio"
                          value={status}
                          checked={formData.status === status}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, status: e.target.value as any }))
                          }
                          className="mr-2"
                        />
                        <span className="text-sm capitalize">{status}</span>
                      </label>
                    ))}
                  </div>

                  {/* Scheduled Date (if applicable) */}
                  {formData.status === 'scheduled' && (
                    <Input
                      type="datetime-local"
                      label="Schedule Date"
                      required
                      value={formData.scheduledDate}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, scheduledDate: e.target.value }))
                      }
                      className="p-2 text-lg bg-blue-50 border-none hover:bg-gray-300"
                    />
                  )}
                </div>

                {/* Discount Section */}
                <div className="space-y-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.discount.enabled}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          discount: { ...prev.discount, enabled: e.target.checked }
                        }))
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Enable discount</span>
                  </label>

                  {formData.discount.enabled && (
                    <Input
                      label="Discount Amount (%)"
                      type="number"
                      min="0"
                      max="100"
                      required
                      value={formData.discount.amount}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          discount: { ...prev.discount, amount: parseFloat(e.target.value) }
                        }))
                      }
                      className="p-2 text-lg bg-blue-50 border-none hover:bg-gray-300"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={isLoading}>
                {product ? 'Update' : 'Add Product'}
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
