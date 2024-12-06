import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit2, Trash2, Package } from 'lucide-react';
import { toast } from 'sonner';
import { useBrandsStore } from '../../store/brands';
import { useProductsStore } from '../../store/products';
import { Button } from '../ui/Button';
import DeleteDialog from '../ui/DeleteDialog';
import BrandFormDialog from './BrandFormDialog';
import ProductCard from '../products/ProductCard';

export default function BrandDetail() {
  const { id } = useParams(); // Get brand ID from the route
  const navigate = useNavigate(); // Navigation function
  const brand = useBrandsStore((state) => state.getBrand(id!)); // Fetch brand details by ID
  const products = useProductsStore((state) => state.getProductsByBrand(id!)); // Fetch products for the brand
  const deleteBrand = useBrandsStore((state) => state.deleteBrand); // Function to delete the brand
  const [isEditFormOpen, setIsEditFormOpen] = useState(false); // State for edit dialog visibility
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for delete confirmation dialog

  if (!brand) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Brand not found</h2>
        <p className="mt-2 text-gray-600">
          The brand you're looking for doesn't exist.
        </p>
        <Link to="/brands" className="mt-4 inline-block text-blue-600 hover:text-blue-500">
          Back to Brands
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteBrand(brand.id); // Delete brand function
    toast.success('Brand deleted successfully'); // Show success toast
    navigate('/brands'); // Navigate back to brands list
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap">
        <Button
          variant="secondary"
          onClick={() => navigate('/brands')} // Navigate back to brands
          className="flex items-center mb-4 md:mb-0"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Brands
        </Button>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            onClick={() => setIsEditFormOpen(true)} // Open edit dialog
            className="mb-4 md:mb-0"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => setIsDeleteDialogOpen(true)} // Open delete confirmation dialog
            className="mb-4 md:mb-0"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} // Animate appearance
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-32 w-32 md:h-48 md:w-48 rounded-lg object-cover mx-auto md:mx-0"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-gray-900">{brand.name}</h1>
              <p className="mt-2 text-gray-600">{brand.description}</p>
              <div className="mt-4 flex items-center space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {products.length} Products
                </span>
                <span className="text-sm text-gray-500">
                  Created on {new Date(brand.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Products</h2>
          <Link to="/products">
            <Button variant="secondary">
              <Package className="h-4 w-4 mr-2" />
              View All Products
            </Button>
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
            <p className="mt-1 text-sm text-gray-500">
              This brand doesn't have any products yet.
            </p>
            <div className="mt-6">
              <Link to="/products">
                <Button type="button">Add Product</Button>
              </Link>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }} // Animate product grid appearance
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} /> // Render each product card
            ))}
          </motion.div>
        )}
      </div>

      {/* Edit brand dialog */}
      <BrandFormDialog
        open={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)} // Close edit dialog
        brand={brand} // Pass brand details to dialog
      />

      {/* Delete confirmation dialog */}
      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)} // Close delete dialog
        onConfirm={handleDelete} // Confirm delete action
        title="Delete Brand"
        description="Are you sure you want to delete this brand? This action cannot be undone and will affect all associated products."
      />
    </div>
  );
}
