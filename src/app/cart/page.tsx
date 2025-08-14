'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeItem, clearCart, getTotalPrice } = useCart();

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
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    This will send a WhatsApp message with all selected items
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}