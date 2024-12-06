import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useProductsStore } from '../../store/products';
import { useBrandsStore } from '../../store/brands';
import { Button } from '../ui/Button';
import DeleteDialog from '../ui/DeleteDialog';
import ProductFormDialog from './ProductFormDialog';

export default function ProductDetail() {
  const { id } = useParams(); // Get the product ID from URL params
  const navigate = useNavigate(); // Navigate function to handle redirections
  const product = useProductsStore((state) => state.getProduct(id!)); // Fetch product details from the store by ID
  const brand = useBrandsStore((state) => state.getBrand(product?.brandId || '')); // Fetch brand details for the product
  const deleteProduct = useProductsStore((state) => state.deleteProduct); // Delete product from the store
  const [isEditFormOpen, setIsEditFormOpen] = useState(false); // State to control edit form visibility
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State to control delete confirmation dialog visibility

  // Return a message if the product is not found
  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Product not found</h2>
        <p className="mt-2 text-gray-600">The product you're looking for doesn't exist.</p>
        <Link to="/products" className="mt-4 inline-block text-blue-600 hover:text-blue-500">
          Back to Products
        </Link>
      </div>
    );
  }

  // Handle the delete action after confirming
  const handleDelete = () => {
    deleteProduct(product.id); // Call the delete function
    toast.success('Product deleted successfully'); // Show success message
    navigate('/products'); // Redirect to the products page
  };

  return (
    <div className="space-y-6">
      {/* Header with navigation buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          onClick={() => navigate('/products')} // Navigate back to the products page
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
        <div className="flex space-x-3">
          {/* Edit button to open the product form */}
          <Button
            variant="secondary"
            onClick={() => setIsEditFormOpen(true)} // Open the edit form dialog
          >
            <Edit2 className="h-4 w-4 mr-2 bg-blue-300" />
            Edit
          </Button>
          {/* Delete button to open the delete confirmation dialog */}
          <Button
            variant="danger"
            onClick={() => setIsDeleteDialogOpen(true)} // Open delete confirmation dialog
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Product detail section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Initial state for animation
        animate={{ opacity: 1, y: 0 }} // Animation when product detail appears
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-start space-x-6">
            {/* Product image */}
            <img
              src={product.image}
              alt={product.name}
              className="h-32 w-32 rounded-lg object-cover"
            />
            <div className="flex-1">
              {/* Product name */}
              <h1 className="text-2xl font-semibold text-gray-900">
                {product.name}
              </h1>
              {/* Product description */}
              <p className="mt-2 text-gray-600">{product.description}</p>
              <div className="mt-4 flex items-center space-x-4">
                {/* Category label */}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {product.category}
                </span>
                {/* Stock status label */}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock < 50 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {product.stock} in stock
                </span>
              </div>
            </div>
            {/* Product price */}
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Display brand information if available */}
          {brand && (
            <div className="mt-6 pt-6 border-t">
              <h2 className="text-lg font-medium text-gray-900">Brand</h2>
              <Link
                to={`/brands/${brand.id}`} // Link to the brand's page
                className="mt-4 flex items-center space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{brand.name}</h3>
                  <p className="text-sm text-gray-500">{brand.description}</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </motion.div>

      {/* Product form dialog for editing */}
      <ProductFormDialog
        open={isEditFormOpen} // Control dialog visibility
        onClose={() => setIsEditFormOpen(false)} // Close the dialog
        product={product} // Pass the current product to the dialog
      />

      {/* Delete confirmation dialog */}
      <DeleteDialog
        open={isDeleteDialogOpen} // Control dialog visibility
        onClose={() => setIsDeleteDialogOpen(false)} // Close the dialog
        onConfirm={handleDelete} // Trigger the delete function
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
}
