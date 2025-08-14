'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';
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
  specifications: Record<string, string>;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ItemPage({ params }: PageProps) {
  const { id } = use(params);
  const { addItem, removeItem, isInCart, getItemCount } = useCart();
  const item: Item | undefined = itemsData.find((item) => item.id === parseInt(id));

  if (!item) {
    notFound();
  }

  const itemInCart = isInCart(item.id);

  const handleCartAction = () => {
    if (itemInCart) {
      removeItem(item.id);
    } else {
      addItem(item);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Back to all items
            </Link>
            <Link 
              href="/cart"
              className="relative bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>🛒</span>
              Cart
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6">
              <div className="space-y-4">
                {item.assets.map((asset, index) => (
                  <div key={index} className="relative h-80 bg-gray-200 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <div className="text-center">
                        <div className="text-6xl mb-4">📷</div>
                        <span className="text-lg">{item.name}</span>
                        <div className="text-sm mt-2">Image {index + 1}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{item.name}</h1>
                <span className="text-3xl font-bold text-green-600">${item.price}</span>
              </div>

              <div className="flex gap-4 mb-6">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {item.category}
                </span>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {item.condition}
                </span>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </div>

              {item.specifications && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Specifications</h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <dl className="grid grid-cols-1 gap-3">
                      {Object.entries(item.specifications).map(([key, value]) => (
                        <div key={key} className="flex flex-col sm:flex-row">
                          <dt className="font-medium text-gray-900 sm:w-1/3 capitalize">
                            {key.replace(/_/g, ' ')}:
                          </dt>
                          <dd className="text-gray-700 sm:w-2/3">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <a
                  href={`https://wa.me/905368968229?text=${encodeURIComponent(
                    `Hi! I'm interested in the ${item.name} listed for $${item.price}.\n\nIs this item still available? When can I arrange pickup?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>💬</span>
                  Contact on WhatsApp
                </a>
                <button 
                  onClick={handleCartAction}
                  className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    itemInCart 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <span>{itemInCart ? '🗑️' : '🛒'}</span>
                  {itemInCart ? 'Remove from Cart' : 'Add to Cart'}
                </button>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-800 mb-1">Pickup Information</h3>
                <p className="text-sm text-yellow-700">
                  This item is available for pickup only. Please contact the seller to arrange a convenient time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
