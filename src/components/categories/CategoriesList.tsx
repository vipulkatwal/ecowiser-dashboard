import React from 'react';
import { Tags } from 'lucide-react';
import { EmptyState } from '../ui/EmptyState';

export default function CategoriesList() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
      <EmptyState
        icon={Tags}
        title="No categories yet"
        description="Start organizing your products with categories"
        action={{
          label: 'Add Category',
          onClick: () => {},
        }}
      />
    </div>
  );
}