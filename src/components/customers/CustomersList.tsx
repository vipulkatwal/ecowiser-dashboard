import React from 'react';
import { Users } from 'lucide-react';
import { EmptyState } from '../ui/EmptyState';

export default function CustomersList() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
      <EmptyState
        icon={Users}
        title="No customers yet"
        description="Start adding customers to manage your business relationships"
        action={{
          label: 'Add Customer',
          onClick: () => {},
        }}
      />
    </div>
  );
}