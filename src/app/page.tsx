'use client';

import ItemCard from '@/components/ItemCard';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import itemsData from '@/data/items.json';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  condition: string;
  category: string;
  assets: string[];
}

export default function Home() {
  const { getItemCount } = useCart();
  const items: Item[] = itemsData;

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
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
