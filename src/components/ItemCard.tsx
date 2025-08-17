'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/context/I18nContext';

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

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  const { t, translateCategory } = useTranslation();
  const hasImages = item.assets && item.assets.length > 0;
  const firstImage = hasImages ? item.assets[0] : null;

  const translateCondition = (condition: string) => {
    const conditionKey = `condition.${condition.toLowerCase()}`;
    const translation = t(conditionKey);
    return translation === conditionKey ? condition : translation;
  };

  return (
    <Link href={item.soldOut ? '#' : `/item/${item.id}`} className={`group ${item.soldOut ? 'pointer-events-none' : ''}`}>
      <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${item.soldOut ? 'opacity-60' : ''}`}>
        <div className="relative h-64 bg-gray-200">
          {hasImages && firstImage ? (
            <Image
              src={firstImage}
              alt={item.name}
              fill
              className="object-scale-down group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-2">📷</div>
                <span className="text-sm">{item.name}</span>
              </div>
            </div>
          )}

          {/* As Good As New Badge */}
          {item.asGoodAsNew && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-md">
              {t('badge.asGoodAsNew')}
            </div>
          )}

          {/* Sold Out Overlay */}
          {item.soldOut && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-red-600 text-white text-lg font-bold px-4 py-2 rounded-lg shadow-lg">
                {t('badge.soldOut')}
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {item.name}
            </h3>
            <span className={`text-xl font-bold ${item.soldOut ? 'text-gray-400 line-through' : 'text-green-600'}`}>
              ${item.price}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>

          <div className="flex justify-between items-center">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {translateCategory(item.category)}
            </span>
            <span className="text-sm text-gray-500">
              {translateCondition(item.condition)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}