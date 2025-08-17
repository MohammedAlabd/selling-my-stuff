'use client';

import ItemCard from '@/components/ItemCard';
import LanguageToggle from '@/components/LanguageToggle';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useTranslation } from '@/context/I18nContext';
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
  const { t, isRTL, items, loading } = useTranslation();
  const [sortBy, setSortBy] = useState<SortOption>('condition');

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-start">
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('header.title')}
              </h1>
              <p className="text-gray-600 mt-2">
                {t('header.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <Link
                href="/cart"
                className="relative bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
              >
                <span>🛒</span>
                {t('nav.cart')}
                {getItemCount() > 0 && (
                  <span className={`absolute -top-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center ${isRTL ? '-left-2' : '-right-2'}`}>
                    {getItemCount()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sorting Controls */}
        <div className={`mb-6 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <label htmlFor="sort-select" className="text-sm font-medium text-gray-700">
              {t('sort.label')}
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="condition">{t('sort.condition')}</option>
              <option value="name">{t('sort.name')}</option>
              <option value="price-low">{t('sort.priceLowHigh')}</option>
              <option value="price-high">{t('sort.priceHighLow')}</option>
              <option value="category">{t('sort.category')}</option>
            </select>
          </div>
          <div className="text-sm text-gray-500">
            {sortedItems.length} {t('items.count')}
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
            {t('footer.contact')}
          </p>
        </div>
      </footer>
    </div>
  );
}
