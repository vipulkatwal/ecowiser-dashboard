import React from 'react';
import { Ticket } from 'lucide-react';
import { EmptyState } from '../ui/EmptyState';

export default function CouponsList() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Coupons</h1>
      <EmptyState
        icon={Ticket}
        title="No coupons yet"
        description="Create discount coupons to attract more customers"
        action={{
          label: 'Create Coupon',
          onClick: () => {},
        }}
      />
    </div>
  );
}