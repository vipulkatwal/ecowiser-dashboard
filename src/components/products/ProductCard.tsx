import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MoreVertical, Pencil, Trash2, Package, Tag } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '../../types';
import { useProductsStore } from '../../store/products';
import { useBrandsStore } from '../../store/brands';
import { Button } from '../ui/Button';
import ProductFormDialog from './ProductFormDialog';

interface ProductCardProps {
  product: Product; // Represents a single product to display in the card
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showMenu, setShowMenu] = useState(false); // State to toggle the options menu
  const [isEditFormOpen, setIsEditFormOpen] = useState(false); // State to toggle the edit form dialog
  const deleteProduct = useProductsStore((state) => state.deleteProduct); // Delete product function from the store
  const brand = useBrandsStore((state) => state.getBrand(product.brandId)); // Retrieve brand information for the product

  /**
   * Handles deleting the product after confirmation.
   */
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(product.id); // Call the delete function from the store
      toast.success('Product deleted successfully'); // Display success toast
    }
  };

  /**
   * Prevents navigation when clicking on the brand link.
   */
  const handleBrandClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default link behavior
    e.stopPropagation(); // Stop the event from propagating to parent elements
  };

  /**
   * Determine the stock status and corresponding styles based on the stock count.
   */
  const stockStatus = product.stock < 50 ? 'low' : product.stock < 100 ? 'medium' : 'high';
  const stockColors = {
    low: 'bg-red-50 text-red-700 border-red-200',
    medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    high: 'bg-green-50 text-green-700 border-green-200',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animated state
      exit={{ opacity: 0, y: -20 }} // Exit animation state
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Main product card content */}
      <Link to={`/products/${product.id}`} className="block">
        {/* Product image with hover effects */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-900">
                {product.category} {/* Product category */}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
                ${product.price.toFixed(2)} {/* Product price */}
              </span>
            </div>
          </div>
        </div>

        {/* Product details */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {product.name} {/* Product name */}
              </h2>
              {brand && (
                <span
                  onClick={handleBrandClick}
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {brand.name} {/* Brand name */}
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {product.description} {/* Product description */}
          </p>

          <div className="flex items-center justify-between">
            {/* Stock status indicator */}
            <div className={`flex items-center px-3 py-1.5 rounded-lg border ${stockColors[stockStatus]}`}>
              <Package className="h-4 w-4 mr-1.5" />
              <span className="text-sm font-medium">{product.stock} in stock</span>
            </div>
            {/* Total price based on stock */}
            <div className="flex items-center text-blue-600">
              <Tag className="h-4 w-4 mr-1.5" />
              <span className="text-sm font-medium">${(product.price * product.stock).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Options menu (Edit/Delete) */}
      <div className="absolute top-4 right-4">
        <div className="relative">
          <Button
            variant="secondary"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity shadow-lg bg-white/90 hover:bg-white"
            onClick={(e) => {
              e.preventDefault(); // Prevent default link behavior
              setShowMenu(!showMenu); // Toggle menu visibility
            }}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>

          {/* Menu dropdown */}
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} // Initial animation state
              animate={{ opacity: 1, scale: 1 }} // Animated state
              className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
            >
              <div className="py-1">
                {/* Edit button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditFormOpen(true); // Open edit form
                    setShowMenu(false); // Close menu
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
                    handleDelete(); // Trigger delete handler
                    setShowMenu(false); // Close menu
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

      {/* Edit form dialog */}
      <ProductFormDialog
        open={isEditFormOpen} // Control dialog visibility
        onClose={() => setIsEditFormOpen(false)} // Close dialog handler
        product={product} // Pass current product to dialog
      />
    </motion.div>
  );
}
