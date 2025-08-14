'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  condition: string;
  category: string;
  assets: string[];
}

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <Link href={`/item/${item.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-64 bg-gray-200">
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="text-4xl mb-2">📷</div>
              <span className="text-sm">{item.name}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {item.name}
            </h3>
            <span className="text-xl font-bold text-green-600">
              ${item.price}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>
          
          <div className="flex justify-between items-center">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {item.category}
            </span>
            <span className="text-sm text-gray-500">
              {item.condition}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}