'use client';

import { useState } from 'react';

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
  const [offerPrice, setOfferPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(offerPrice);

    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid price');
      return;
    }

    if (price >= item.price) {
      setError('Offer should be less than the asking price');
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
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-900">Make an Offer</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.condition} • {item.category}</p>
          <p className="text-lg font-bold text-green-600 mt-1">
            Asking Price: ${item.price}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="offer-price" className="block text-sm font-medium text-gray-700 mb-2">
              Your Offer ($)
            </label>
            <input
              type="number"
              id="offer-price"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              placeholder="Enter your offer"
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
              Your offer will be sent via WhatsApp with the item details. The seller can accept, decline, or counter-offer.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Send Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
