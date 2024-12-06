import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MoreVertical, Pencil, Trash2, Package, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { Brand } from '../../types';
import { useBrandsStore } from '../../store/brands';
import { useProductsStore } from '../../store/products';
import { Button } from '../ui/Button';
import BrandFormDialog from './BrandFormDialog';

interface BrandCardProps {
  brand: Brand; // Props containing brand details
}

export default function BrandCard({ brand }: BrandCardProps) {
  const [showMenu, setShowMenu] = useState(false); // State to toggle the dropdown menu
  const [isEditFormOpen, setIsEditFormOpen] = useState(false); // State to open/close the edit dialog
  const deleteBrand = useBrandsStore((state) => state.deleteBrand); // Function to delete a brand
  const products = useProductsStore((state) =>
    state.products.filter((p) => p.brandId === brand.id) // Filter products belonging to the brand
  );
  const totalRevenue = products.reduce((acc, p) => acc + p.price * p.stock, 0); // Calculate total revenue for the brand

  const handleDelete = () => {
    // Confirm and delete the brand
    if (confirm('Are you sure you want to delete this brand?')) {
      deleteBrand(brand.id);
      toast.success('Brand deleted successfully'); // Show a success toast
    }
  };

  return (
    <motion.div
      layout // Enable layout animation
      initial={{ opacity: 0, y: 20 }} // Initial animation for card appearance
      animate={{ opacity: 1, y: 0 }} // Animation when card is visible
      exit={{ opacity: 0, y: -20 }} // Animation when card is removed
      className="group relative bg-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden max-w-md mx-auto sm:max-w-none sm:mx-0"
    >
      {/* Background gradient effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Link wrapping the card */}
      <Link to={`/brands/${brand.id}`} className="block">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:space-x-5">
            {/* Brand logo */}
            <div className="relative mb-4 sm:mb-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50 p-0.5">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                {products.length} Products
              </div>
            </div>

            {/* Brand details */}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                {brand.name}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {brand.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {/* Total products */}
                <div className="bg-blue-50 rounded-lg p-2 sm:p-3">
                  <div className="flex items-center text-blue-600 mb-1">
                    <Package className="h-3 w-3 mr-1" />
                    <span className="text-xs font-medium">Total Products</span>
                  </div>
                  <span className="text-xs sm:text-base font-semibold text-gray-900">
                    {products.length}
                  </span>
                </div>

                {/* Revenue */}
                <div className="bg-green-50 rounded-lg p-2 sm:p-3">
                  <div className="flex items-center text-green-600 mb-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span className="text-xs font-medium">Revenue</span>
                  </div>
                  <span className="text-xs sm:text-base font-semibold text-gray-900">
                    ${totalRevenue.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Dropdown menu button */}
      <div className="absolute top-4 right-4">
        <div className="relative">
          <Button
            variant="secondary"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              setShowMenu(!showMenu); // Toggle menu visibility
            }}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>

          {/* Dropdown menu */}
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} // Animation on menu appearance
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-0 mt-2 w-40 sm:w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
            >
              <div className="py-1">
                {/* Edit button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditFormOpen(true);
                    setShowMenu(false); // Close menu after clicking
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                >
                  <Pencil className="h-4 w-4 mr-2 text-blue-500" />
                  Edit
                </button>
                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(); // Handle delete action
                    setShowMenu(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Edit brand form dialog */}
      <BrandFormDialog
        open={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)} // Close dialog callback
        brand={brand} // Pass brand data to the form
      />
    </motion.div>
  );
}
