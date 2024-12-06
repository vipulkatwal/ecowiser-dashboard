import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Brand } from '../../types';
import { useBrandsStore } from '../../store/brands';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface BrandFormDialogProps {
  open: boolean; // Controls whether the dialog is open or closed
  onClose: () => void; // Function to handle dialog close
  brand?: Brand; // Optional brand object for edit mode
}

export default function BrandFormDialog({
  open,
  onClose,
  brand,
}: BrandFormDialogProps) {
  const addBrand = useBrandsStore((state) => state.addBrand); // Add new brand
  const updateBrand = useBrandsStore((state) => state.updateBrand); // Update existing brand
  const [isLoading, setIsLoading] = useState(false); // Loading state for form submission
  const [formData, setFormData] = useState({
    name: '', // Brand name
    description: '', // Brand description
    logo: '', // Brand logo URL
    status: 'active' as const, // Status of the brand ('active' or 'inactive')
    website: '', // Brand website
    socialLinks: { // Social media links
      facebook: '',
      twitter: '',
      instagram: '',
    },
  });

  // Updates form data when a brand is provided (edit mode)
  useEffect(() => {
    if (brand) {
      setFormData({
        name: brand.name,
        description: brand.description,
        logo: brand.logo,
        status: brand.status,
        website: brand.website || '',
        socialLinks: brand.socialLinks || {
          facebook: '',
          twitter: '',
          instagram: '',
        },
      });
    } else {
      // Reset form data for add mode
      setFormData({
        name: '',
        description: '',
        logo: '',
        status: 'active',
        website: '',
        socialLinks: {
          facebook: '',
          twitter: '',
          instagram: '',
        },
      });
    }
  }, [brand]);

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Show loading indicator

    try {
      // Ensure a logo URL is provided
      if (!formData.logo) {
        throw new Error('Please provide a logo URL');
      }

      const brandData = {
        ...formData,
        images: [{ id: '1', url: formData.logo, type: 'url' }], // Add logo to images array
      };

      // Update existing brand or add a new one based on the mode
      if (brand) {
        updateBrand(brand.id, brandData);
        toast.success('Brand updated successfully');
      } else {
        addBrand(brandData);
        toast.success('Brand created successfully');
      }
      onClose(); // Close dialog after successful submission
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save brand'); // Handle errors
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      {/* Full-screen semi-transparent overlay */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Centered dialog container */}
      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Dialog.Panel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.95 }} // Animation on open
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto rounded-lg bg-white p-4 sm:p-6 md:p-8 shadow-xl overflow-y-auto max-h-[90vh]"
        >
          {/* Dialog Title */}
          <Dialog.Title className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-3 sm:mb-4">
            {brand ? 'Edit Brand' : 'Add Brand'} {/* Dynamic title based on mode */}
          </Dialog.Title>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 space-y-3 md:space-y-0"
          >
            {/* Brand Name */}
            <div className="md:col-span-2">
              <Input
                label="Brand Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full text-sm sm:text-base md:text-lg p-1 sm:p-2 bg-blue-50 border-none hover:bg-gray-300"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                className="block w-full rounded-md p-1 sm:p-2 text-sm sm:text-base bg-blue-50 border-none hover:bg-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Logo URL */}
            <Input
              label="Logo URL"
              type="url"
              required
              value={formData.logo}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, logo: e.target.value }))
              }
              placeholder="https://example.com/logo.png"
              className="w-full text-xs sm:text-sm p-1 sm:p-2 bg-blue-50 border-none hover:bg-gray-300"
            />

            {/* Website */}
            <Input
              label="Website"
              type="url"
              value={formData.website}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, website: e.target.value }))
              }
              className="w-full text-xs sm:text-sm p-1 sm:p-2 bg-blue-50 border-none hover:bg-gray-300"
            />

            {/* Social Links */}
            <div className="md:col-span-2 space-y-2 sm:space-y-3">
              <h4 className="text-xs sm:text-sm font-medium text-gray-900">
                Social Links
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                {Object.entries(formData.socialLinks).map(([key, value]) => (
                  <Input
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize key
                    value={value}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        socialLinks: {
                          ...prev.socialLinks,
                          [key]: e.target.value,
                        },
                      }))
                    }
                    className="w-full text-xs sm:text-sm p-1 sm:p-2 bg-blue-50 border-none hover:bg-gray-300"
                  />
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="md:col-span-2 space-y-2 sm:space-y-3">
              <h4 className="text-xs sm:text-sm font-medium text-gray-900">
                Status
              </h4>
              <div className="flex flex-wrap items-center space-x-3 sm:space-x-4">
                {['active', 'inactive'].map((status) => (
                  <label key={status} className="flex items-center text-xs sm:text-sm">
                    <input
                      type="radio"
                      value={status}
                      checked={formData.status === status}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          status: e.target.value as any,
                        }))
                      }
                      className="mr-1 sm:mr-2"
                    />
                    <span className="capitalize">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="md:col-span-2 flex justify-end space-x-2 sm:space-x-3 mt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                disabled={isLoading}
                className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
              >
                {brand ? 'Update Brand' : 'Add Brand'} {/* Dynamic button text */}
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
