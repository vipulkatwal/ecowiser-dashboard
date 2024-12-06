import React from 'react';

export function ProductTableHeader() {
  return (
    <thead className="bg-gray-50">
      <tr>
        {/* Product Column Header */}
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Product
        </th>

        {/* Category Column Header */}
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Category
        </th>

        {/* Stock Column Header */}
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Stock
        </th>

        {/* Price Column Header */}
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Price
        </th>

        {/* Actions Column Header */}
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
}
