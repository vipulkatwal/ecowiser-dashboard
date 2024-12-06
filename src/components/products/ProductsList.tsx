import React, { useState } from 'react';
import { Plus, Upload } from 'lucide-react';
import { useProductsStore } from '../../store/products';
import { useBrandsStore } from '../../store/brands';
import { Button } from '../ui/Button';
import { SearchInput } from '../ui/SearchInput';
import { ProductTableHeader } from './ProductTableHeader';
import { ProductTableRow } from './ProductTableRow';
import ProductFormDialog from './ProductFormDialog';
import DeleteDialog from '../ui/DeleteDialog';
import { Product } from '../../types';
import AccountDropdown from '../account/AccountDropdown';

export default function ProductsList() {
  const products = useProductsStore((state) => state.products);
  const deleteProduct = useProductsStore((state) => state.deleteProduct);
  const brands = useBrandsStore((state) => state.brands);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        <AccountDropdown />
      </div>

      {/* Products Table Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Search Input */}
          <div className="w-full sm:w-1/2">
            <SearchInput
              placeholder="Search products..."
              onSearch={setSearchQuery}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 w-full sm:w-auto">
            <Button
              onClick={() => setIsFormOpen(true)}
              className="w-full sm:w-auto text-sm px-3 py-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
            <Button
              variant="secondary"
              className="w-full sm:w-auto text-sm px-3 py-2"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <ProductTableHeader />
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <ProductTableRow
                  key={product.id}
                  product={product}
                  brand={brands.find((b) => b.id === product.brandId)}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Form Dialog */}
      <ProductFormDialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
      />

      {/* Delete Product Dialog */}
      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
}
