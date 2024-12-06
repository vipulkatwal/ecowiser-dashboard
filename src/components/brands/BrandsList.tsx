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
  const brands = useBrandsStore((state) => state.brands);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header section with title and account dropdown */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Brands</h1>
        <AccountDropdown />
      </div>

      {/* Card containing search and action buttons */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Search bar */}
          <div className="w-full sm:w-1/2">
            <SearchInput
              placeholder="Search brands..."
              onSearch={setSearchQuery}
            />
          </div>

          {/* Action buttons */}
          <div className="flex space-x-2 w-full sm:w-auto">
            <Button
              onClick={() => setIsFormOpen(true)}
              className="w-full sm:w-auto text-sm px-3 py-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Brand
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

        {/* Content */}
        {filteredBrands.length === 0 ? (
          <EmptyState
            icon={Plus}
            title="No brands found"
            description={
              searchQuery
                ? "We couldn't find any brands matching your search"
                : 'Get started by creating your first brand'
            }
            action={
              !searchQuery
                ? {
                    label: 'Add Brand',
                    href: '#',
                    onClick: () => setIsFormOpen(true),
                  }
                : undefined
            }
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </motion.div>
        )}
      </div>

      {/* Form dialog */}
      <BrandFormDialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
}
