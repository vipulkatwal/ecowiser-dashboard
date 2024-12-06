import React, { useState } from 'react';
import { Plus, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBrandsStore } from '../../store/brands';
import { Button } from '../ui/Button';
import { SearchInput } from '../ui/SearchInput';
import { EmptyState } from '../ui/EmptyState';
import BrandCard from './BrandCard';
import BrandFormDialog from './BrandFormDialog';
import AccountDropdown from '../account/AccountDropdown';

export default function BrandsList() {
  // Retrieve the list of brands from the store
  const brands = useBrandsStore((state) => state.brands);

  // State to handle the search query for filtering brands
  const [searchQuery, setSearchQuery] = useState('');

  // State to control the visibility of the brand form dialog
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Filter brands based on the search query (case-insensitive)
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header section with title and account dropdown */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Brands</h1>
        <AccountDropdown /> {/* Account dropdown menu */}
      </div>

      {/* Card containing search and action buttons */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 flex items-center justify-between">
          {/* Search bar to filter brands */}
          <div className="w-1/2">
            <SearchInput
              placeholder="Search brands..."
              onSearch={setSearchQuery}
            />
          </div>

          {/* Action buttons for adding a brand or importing CSV */}
          <div className="flex space-x-2">
            {/* Open the form dialog to add a brand */}
            <Button onClick={() => setIsFormOpen(true)} className="">
              <Plus className="h-4 w-4 mr-2" />
              Add Brand
            </Button>

            {/* Button for importing brands via CSV (not implemented in this code) */}
            <Button variant="secondary">
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
          </div>
        </div>

        {/* Content: Show either a message or a grid of brand cards */}
        {filteredBrands.length === 0 ? (
          // Display an empty state when no brands match the search query or when no brands exist
          <EmptyState
            icon={Plus}
            title="No brands found"
            description={
              searchQuery
                ? "We couldn't find any brands matching your search" // When search yields no results
                : "Get started by creating your first brand" // When there are no brands yet
            }
            action={
              !searchQuery
                ? {
                    label: 'Add Brand', // Call-to-action for adding a brand
                    href: '#',
                    onClick: () => setIsFormOpen(true),
                  }
                : undefined
            }
          />
        ) : (
          // Grid layout to display the filtered brands
          <motion.div
            initial={{ opacity: 0 }} // Animation for entry
            animate={{ opacity: 1 }} // Animation for fade-in
            className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {/* Map over filtered brands to display each as a card */}
            {filteredBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} /> // Pass brand data to the card component
            ))}
          </motion.div>
        )}
      </div>

      {/* Form dialog for adding or editing a brand */}
      <BrandFormDialog
        open={isFormOpen} // Controls whether the dialog is open
        onClose={() => setIsFormOpen(false)} // Function to close the dialog
      />
    </div>
  );
}
