'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeItem, clearCart, getTotalPrice } = useCart();
  const [showBulkOffer, setShowBulkOffer] = useState(false);
  const [bulkOfferPrice, setBulkOfferPrice] = useState('');

  const generateWhatsAppMessage = () => {
    if (cart.items.length === 0) return '';

    let message = 'Hi! I am interested in the following items from your moving sale:\n\n';

    cart.items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - $${item.price}\n`;
      message += `   Condition: ${item.condition}\n`;
      message += `   Category: ${item.category}\n\n`;
    });

    message += `Total: $${getTotalPrice()}\n\n`;
    message += 'Are these items still available? When can I arrange pickup for all of them?';

    return encodeURIComponent(message);
  };

  const generateBulkOfferMessage = (offerPrice: number) => {
    if (cart.items.length === 0) return '';

    let message = 'Hi! I would like to make a bulk offer on the following items from your moving sale:\n\n';

    cart.items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - Listed: $${item.price}\n`;
      message += `   Condition: ${item.condition}\n`;
      message += `   Category: ${item.category}\n\n`;
    });

    message += `Total Listed Price: $${getTotalPrice()}\n`;
    message += `My Bulk Offer: $${offerPrice}\n\n`;
    message += 'I am interested in purchasing all these items together. Is this bulk offer acceptable? I can arrange pickup for all items at once if you accept.';

    return encodeURIComponent(message);
  };

  const handleBulkOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(bulkOfferPrice);

    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price');
      return;
    }

    if (price >= getTotalPrice()) {
      alert('Offer should be less than the total asking price');
      return;
    }

    const whatsappUrl = `https://wa.me/905368968229?text=${generateBulkOfferMessage(price)}`;
    window.open(whatsappUrl, '_blank');

    setBulkOfferPrice('');
    setShowBulkOffer(false);
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Back to all items
            </Link>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some items to get started!</p>
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Browse Items
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to all items
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Shopping Cart ({cart.items.length} items)
              </h1>
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Clear Cart
              </button>
            </div>

            <div className="space-y-4 mb-8">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📷</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.condition} • {item.category}</p>
                      <p className="text-lg font-bold text-green-600">${item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Link
                      href={`/item/${item.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-900">
                  Total: ${getTotalPrice()}
                </span>
                <span className="text-sm text-gray-600">
                  {cart.items.length} item{cart.items.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-4">
                <a
                  href={`https://wa.me/905368968229?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>💬</span>
                  Contact Seller for All Items
                </a>

                <button
                  onClick={() => setShowBulkOffer(true)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>💰</span>
                  Make Bulk Offer
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Contact seller or make an offer for all items at once
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bulk Offer Modal */}
      {showBulkOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">Make Bulk Offer</h2>
              <button
                onClick={() => setShowBulkOffer(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Cart Items ({cart.items.length})</h3>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {cart.items.map((item) => (
                  <div key={item.id} className="text-sm text-gray-600 flex justify-between">
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex text-gray-700 justify-between font-semibold">
                  <span>Total Listed Price:</span>
                  <span className="text-green-600">${getTotalPrice()}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleBulkOfferSubmit}>
              <div className="mb-4">
                <label htmlFor="bulk-offer-price" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Bulk Offer ($)
                </label>
                <input
                  type="number"
                  id="bulk-offer-price"
                  value={bulkOfferPrice}
                  onChange={(e) => setBulkOfferPrice(e.target.value)}
                  placeholder="Enter your bulk offer"
                  className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  step="1"
                  required
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-600">
                  Your bulk offer will be sent via WhatsApp with all item details. Buying in bulk often gets better deals!
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowBulkOffer(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Send Bulk Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
