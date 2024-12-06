import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Product, Brand } from '../../types';
import { Button } from '../ui/Button';

interface ProductTableRowProps {
  product: Product;
  brand?: Brand;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductTableRow({ product, brand, onEdit, onDelete }: ProductTableRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      {/* Product Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-10 w-10 rounded-lg object-cover"
          />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{product.name}</div>
            <div className="text-sm text-gray-500">{brand?.name}</div>
          </div>
        </div>
      </td>

      {/* Category Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          {product.category}
        </span>
      </td>

      {/* Stock Column */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.stock}
      </td>

      {/* Price Column */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ${product.price.toFixed(2)}
      </td>

      {/* Actions Column */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button
          variant="secondary"
          size="sm"
          className="mr-2 bg-blue-400 hover:bg-blue-500"
          onClick={() => onEdit(product)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(product)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
}
