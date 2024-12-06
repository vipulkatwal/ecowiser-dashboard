import React from 'react';
import { MessageCircle } from 'lucide-react';
import { EmptyState } from '../ui/EmptyState';

export default function ChatsList() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Chats</h1>
      <EmptyState
        icon={MessageCircle}
        title="No messages yet"
        description="Start conversations with your customers"
        action={{
          label: 'View Customers',
          onClick: () => {},
        }}
      />
    </div>
  );
}