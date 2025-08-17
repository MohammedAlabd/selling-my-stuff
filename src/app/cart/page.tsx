'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useTranslation } from '@/context/I18nContext';
import LanguageToggle from '@/components/LanguageToggle';

export default function CartPage() {
  const { cart, removeItem, clearCart, getTotalPrice } = useCart();
  const { t, isRTL, translateCategory } = useTranslation();
  const [showBulkOffer, setShowBulkOffer] = useState(false);
  const [bulkOfferPrice, setBulkOfferPrice] = useState('');

  const translateCondition = (condition: string) => {
    const conditionKey = `condition.${condition.toLowerCase()}`;
    const translation = t(conditionKey);
    return translation === conditionKey ? condition : translation;
  };

  const generateWhatsAppMessage = () => {
    if (cart.items.length === 0) return '';

    let message = `${t('whatsapp.interestedIn')}\n\n`;

    cart.items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - $${item.price}\n`;
      message += `   Link: ${window.location.origin}/item/${item.id}\n`;
    });

    message += `${t('whatsapp.total')} $${getTotalPrice()}\n\n`;
    message += t('whatsapp.available');

    return encodeURIComponent(message);
  };

  const generateBulkOfferMessage = (offerPrice: number) => {
    if (cart.items.length === 0) return '';

    let message = `${t('whatsapp.bulkOffer')}\n\n`;

    cart.items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ${t('whatsapp.listed')} $${item.price}\n`;
      message += `   Link: ${window.location.origin}/item/${item.id}\n`;
    });

    message += `${t('whatsapp.totalListedPrice')} $${getTotalPrice()}\n`;
    message += `${t('whatsapp.myBulkOffer')} $${offerPrice}\n\n`;
    message += t('whatsapp.bulkOfferAcceptable');

    return encodeURIComponent(message);
  };

  const handleBulkOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(bulkOfferPrice);

    if (isNaN(price) || price <= 0) {
      alert(t('alert.validPrice'));
      return;
    }

    if (price >= getTotalPrice()) {
      alert(t('alert.offerLessThanTotal'));
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
            <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Link
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                {t('nav.backToItems')}
              </Link>
              <LanguageToggle />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('cart.empty.title')}</h1>
            <p className="text-gray-600 mb-8">{t('cart.empty.subtitle')}</p>
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {t('cart.browseItems')}
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
          <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              {t('nav.backToItems')}
            </Link>
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className={`flex justify-between items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h1 className="text-2xl font-bold text-gray-900">
                {t('cart.title')} ({cart.items.length} {t('items.count')})
              </h1>
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                {t('cart.clearCart')}
              </button>
            </div>

            <div className="space-y-4 mb-8">
              {cart.items.map((item) => (
                <div key={item.id} className={`flex items-center justify-between p-4 border border-gray-200 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📷</span>
                    </div>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{translateCondition(item.condition)} • {translateCategory(item.category)}</p>
                      <p className="text-lg font-bold text-green-600">${item.price}</p>
                    </div>
                  </div>

                  <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <Link
                      href={`/item/${item.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {t('cart.viewDetails')}
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
              <div className={`flex justify-between items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-xl font-bold text-gray-900">
                  {t('cart.total')} ${getTotalPrice()}
                </span>
                <span className="text-sm text-gray-600">
                  {cart.items.length} {t('items.count')}
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
                  {t('cart.contactSeller')}
                </a>

                <button
                  onClick={() => setShowBulkOffer(true)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>💰</span>
                  {t('cart.makeBulkOffer')}
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    {t('cart.contactOrOffer')}
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
          <div className={`bg-white rounded-lg max-w-md w-full p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className={`flex justify-between items-start mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h2 className="text-xl font-bold text-gray-900">{t('bulkOffer.title')}</h2>
              <button
                onClick={() => setShowBulkOffer(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">{t('bulkOffer.cartItems')} ({cart.items.length})</h3>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {cart.items.map((item) => (
                  <div key={item.id} className={`text-sm text-gray-600 flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 mt-2">
                <div className={`flex text-gray-700 justify-between font-semibold ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>{t('bulkOffer.totalListed')}</span>
                  <span className="text-green-600">${getTotalPrice()}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleBulkOfferSubmit}>
              <div className="mb-4">
                <label htmlFor="bulk-offer-price" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('bulkOffer.yourOffer')}
                </label>
                <input
                  type="number"
                  id="bulk-offer-price"
                  value={bulkOfferPrice}
                  onChange={(e) => setBulkOfferPrice(e.target.value)}
                  placeholder={t('bulkOffer.placeholder')}
                  className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  step="1"
                  required
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-600">
                  {t('bulkOffer.description')}
                </p>
              </div>

              <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button
                  type="button"
                  onClick={() => setShowBulkOffer(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  {t('bulkOffer.cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  {t('bulkOffer.send')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
