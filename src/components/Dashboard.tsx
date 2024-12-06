import React from 'react';
import { Link } from 'react-router-dom';
import { useBrandsStore } from '../store/brands';
import { useProductsStore } from '../store/products';
import { Box, Package, TrendingUp, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const brands = useBrandsStore((state) => state.brands);
  const products = useProductsStore((state) => state.products);

  const totalRevenue = products.reduce((acc, product) => acc + product.price, 0);
  const lowStockProducts = products.filter((product) => product.stock < 50);

  const stats = [
    {
      name: 'Total Brands',
      value: brands.length,
      icon: Box,
      color: 'bg-blue-500',
      link: '/brands',
    },
    {
      name: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'bg-green-500',
      link: '/products',
    },
    {
      name: 'Low Stock Items',
      value: lowStockProducts.length,
      icon: TrendingUp,
      color: 'bg-yellow-500',
      link: '/products',
    },
    {
      name: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-purple-500',
      link: '/products',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Dashboard Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Dashboard
        </h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            to={stat.link}
            className="group bg-white overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-4 md:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon
                    className={`h-6 w-6 text-white ${stat.color} rounded-md p-1`}
                  />
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-xl md:text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            {/* Hover Animation */}
            <div
              className={`absolute bottom-0 inset-x-0 h-1 ${stat.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform`}
            />
          </Link>
        ))}
      </div>

      {/* Recent Products and Brands */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Products
          </h2>
          <div className="space-y-4">
            {products.slice(0, 5).map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="flex items-center p-3 md:p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-8 w-8 md:h-10 md:w-10 rounded-md object-cover"
                />
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {product.name}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 truncate">
                    {product.category}
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  ${product.price}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Brands */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Brands
          </h2>
          <div className="space-y-4">
            {brands.slice(0, 5).map((brand) => (
              <Link
                key={brand.id}
                to={`/brands/${brand.id}`}
                className="flex items-center p-3 md:p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 w-8 md:h-10 md:w-10 rounded-md object-cover"
                />
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {brand.name}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 truncate max-w-xs">
                    {brand.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
