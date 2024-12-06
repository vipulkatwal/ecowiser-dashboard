import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { EmptyState } from '../ui/EmptyState';

export default function OrdersList() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
      <EmptyState
        icon={ShoppingCart}
        title="No orders yet"
        description="Your orders will appear here when customers make purchases"
        action={{
          label: 'View Products',
          onClick: () => {},
        }}
      />
    </div>
  );
}