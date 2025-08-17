'use client';

import { useState } from 'react';
import { useTranslation } from '@/context/I18nContext';

interface Item {
  id: number;
  name: string;
  price: number;
  condition: string;
  category: string;
  description: string;
  assets: string[];
  specifications?: Record<string, string | undefined>;
}

interface OfferModalProps {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
  onSubmitOffer: (offerPrice: number) => void;
}

export default function OfferModal({ item, isOpen, onClose, onSubmitOffer }: OfferModalProps) {
  const { t, isRTL } = useTranslation();
  const [offerPrice, setOfferPrice] = useState('');
  const [error, setError] = useState('');

  const translateCondition = (condition: string) => {
    const conditionKey = `condition.${condition.toLowerCase()}`;
    const translation = t(conditionKey);
    return translation === conditionKey ? condition : translation;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(offerPrice);

    if (isNaN(price) || price <= 0) {
      setError(t('alert.validPrice'));
      return;
    }

    if (price >= item.price) {
      setError(t('alert.offerLessThanAsking'));
      return;
    }

    setError('');
    onSubmitOffer(price);
    setOfferPrice('');
    onClose();
  };

  const handleClose = () => {
    setOfferPrice('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`bg-white rounded-lg max-w-md w-full p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className={`flex justify-between items-start mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <h2 className="text-xl font-bold text-gray-900">{t('offer.title')}</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-600">{translateCondition(item.condition)} • {item.category}</p>
          <p className="text-lg font-bold text-green-600 mt-1">
            {t('offer.askingPrice')} ${item.price}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="offer-price" className="block text-sm font-medium text-gray-700 mb-2">
              {t('offer.yourOffer')}
            </label>
            <input
              type="number"
              id="offer-price"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              placeholder={t('offer.placeholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="1"
              step="1"
              required
            />
            {error && (
              <p className="text-red-600 text-sm mt-1">{error}</p>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-600">
              {t('offer.description')}
            </p>
          </div>

          <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {t('offer.cancel')}
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {t('offer.send')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
