import React, { useState } from 'react';
import { SAMPLE_PRODUCTS, Product } from '../data/templates';
import { ShoppingBag, Star, X, Plus, Minus, ArrowRight, Check, Tag } from 'lucide-react';

interface CartItem extends Product {
  quantity: number;
}

export const EcommerceTemplate: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Apparel' | 'Footwear' | 'Accessories'>('All');
  const [cart, setCart] = useState<CartItem[]>([
    { ...SAMPLE_PRODUCTS[0], quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);

  const filtered = selectedCategory === 'All'
    ? SAMPLE_PRODUCTS
    : SAMPLE_PRODUCTS.filter(p => p.category === selectedCategory);

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'LAUNCH20') {
      setDiscountPercent(20);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "LAUNCH20" for 20% off!');
    }
  };

  const handleCheckout = () => {
    setOrderComplete(true);
    setTimeout(() => {
      setCart([]);
      setOrderComplete(false);
      setIsCartOpen(false);
    }, 3000);
  };

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-full font-sans antialiased relative">
      {/* Top microbar */}
      <div className="bg-emerald-950/70 border-b border-emerald-900/40 text-emerald-300 text-[11px] py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Tag className="w-3.5 h-3.5 text-emerald-400" />
        Use code <span className="font-bold underline">LAUNCH20</span> at checkout for 20% off all studio essentials
      </div>

      {/* Header */}
      <header className="px-6 py-4 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-white text-zinc-950 font-black rounded-lg flex items-center justify-center text-sm tracking-tighter">
            Æ
          </div>
          <span className="font-bold tracking-tight text-base text-white">AESTHETE OBJECTS</span>
        </div>

        <nav className="hidden sm:flex items-center gap-5 text-xs text-zinc-400">
          {(['All', 'Apparel', 'Footwear', 'Accessories'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`transition-colors ${selectedCategory === cat ? 'text-white font-semibold underline underline-offset-4' : 'hover:text-zinc-200'}`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Cart Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors flex items-center gap-2 text-xs"
        >
          <ShoppingBag className="w-4 h-4 text-zinc-200" />
          <span className="hidden sm:inline font-medium">Bag</span>
          {totalItemCount > 0 && (
            <span className="bg-white text-zinc-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {totalItemCount}
            </span>
          )}
        </button>
      </header>

      {/* Hero Showcase Banner */}
      <div className="px-6 py-10 max-w-6xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-800/70 border border-zinc-800 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-2">Autumn / Winter '26</span>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Functional minimalism tailored for the modern nomad.
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
              Engineered with sustainable wool, Japanese selvage cotton, and aerospace titanium hardware.
            </p>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSelectedCategory('All')}
                className="bg-white hover:bg-zinc-200 text-zinc-950 px-5 py-2.5 rounded-xl font-semibold text-xs transition-colors flex items-center gap-2"
              >
                Shop Collection <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border border-zinc-700/60 shadow-2xl shrink-0">
            <img 
              src={SAMPLE_PRODUCTS[0].image} 
              alt="Featured piece" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </div>
      </div>

      {/* Product Catalog */}
      <div className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Curated Releases ({filtered.length})</h2>
          <div className="text-xs text-zinc-400">
            Free shipping on orders over $150
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <div 
              key={product.id}
              className="group rounded-2xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              <div className="relative h-56 bg-zinc-950 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur border border-zinc-700 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[11px] text-amber-400 mb-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-zinc-500">({product.reviewsCount})</span>
                  </div>
                  <h3 className="font-semibold text-sm text-zinc-100 mb-1 group-hover:text-white transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-bold text-white">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-zinc-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-2 bg-zinc-800 hover:bg-white hover:text-zinc-950 text-zinc-200 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide-over Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-zinc-900 border-l border-zinc-800 h-full p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-zinc-300" />
                  <h3 className="text-base font-bold text-white">Your Shopping Bag ({totalItemCount})</h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              {cart.length === 0 ? (
                <div className="text-center py-16 text-zinc-500 text-xs">
                  Your bag is currently empty.
                </div>
              ) : (
                <div className="space-y-4 max-h-[42vh] overflow-y-auto pr-1">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 items-center">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-white truncate">{item.name}</div>
                        <div className="text-xs text-zinc-400">${item.price} each</div>
                        <div className="flex items-center gap-2 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-white">
                        ${item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            <div className="border-t border-zinc-800 pt-4 space-y-4">
              {/* Promo code */}
              <form onSubmit={applyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon (try LAUNCH20)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white uppercase placeholder-zinc-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white rounded-lg"
                >
                  Apply
                </button>
              </form>
              {discountPercent > 0 && (
                <div className="text-xs text-emerald-400 font-medium">
                  {discountPercent}% discount applied!
                </div>
              )}
              {promoError && (
                <div className="text-xs text-rose-400">
                  {promoError}
                </div>
              )}

              {/* Pricing breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {orderComplete ? (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs rounded-xl flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Order simulated successfully!
                </div>
              ) : (
                <button
                  disabled={cart.length === 0}
                  onClick={handleCheckout}
                  className="w-full py-3 bg-white hover:bg-zinc-200 disabled:opacity-40 text-zinc-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Secure Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
