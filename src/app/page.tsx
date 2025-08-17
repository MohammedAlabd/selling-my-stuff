'use client';

import ItemCard from '@/components/ItemCard';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import itemsData from '@/data/items.json';
import { useState, useMemo } from 'react';

interface Item {
  id: number;
  asGoodAsNew?: boolean;
  soldOut?: boolean;
  name: string;
  description: string;
  price: number;
  condition: string;
  category: string;
  assets: string[];
  specifications?: Record<string, string | undefined>;
}

type SortOption = 'name' | 'price-low' | 'price-high' | 'condition' | 'category';

export default function Home() {
  const { getItemCount } = useCart();
  const [sortBy, setSortBy] = useState<SortOption>('condition');
  const items: Item[] = itemsData;

  const sortedItems = useMemo(() => {
    const sorted = [...items];

    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'condition':
        return sorted.sort((a, b) => {
          // "As Good As New" items should come first
          if (a.asGoodAsNew && !b.asGoodAsNew) return -1;
          if (!a.asGoodAsNew && b.asGoodAsNew) return 1;

          // Then sort by condition quality
          const conditionOrder = { 'excellent': 1, 'Excellent': 1, 'good': 2, 'Good': 2, 'fair': 3, 'Fair': 3 };
          const aOrder = conditionOrder[a.condition as keyof typeof conditionOrder] || 4;
          const bOrder = conditionOrder[b.condition as keyof typeof conditionOrder] || 4;
          return aOrder - bOrder;
        });
      case 'category':
        return sorted.sort((a, b) => a.category.localeCompare(b.category));
      default:
        return sorted;
    }
  }, [items, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Moving Sale - Everything Must Go!
              </h1>
              <p className="text-gray-600 mt-2">
                Quality household items and furniture at great prices
              </p>
            </div>
            <Link
              href="/cart"
              className="relative bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>🛒</span>
              Cart
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sorting Controls */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <label htmlFor="sort-select" className="text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="condition">Condition (Best First)</option>
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="category">Category</option>
            </select>
          </div>
          <div className="text-sm text-gray-500">
            {sortedItems.length} items
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            Contact me for pickup arrangements and additional questions
          </p>
        </div>
      </footer>
    </div>
  );
}
