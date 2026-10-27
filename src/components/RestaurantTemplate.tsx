import React, { useState } from 'react';
import { SAMPLE_MENU, MenuItem } from '../data/templates';
import { Utensils, Calendar, Clock, MapPin, Check, Heart, Sparkles, X } from 'lucide-react';

export const RestaurantTemplate: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Brunch' | 'Mains' | 'Beverages' | 'Desserts'>('All');
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [partySize, setPartySize] = useState('2');
  const [reserveTime, setReserveTime] = useState('19:00');
  const [reserveDate, setReserveDate] = useState('2026-10-25');
  const [guestName, setGuestName] = useState('');

  const filteredItems = activeCategory === 'All' 
    ? SAMPLE_MENU 
    : SAMPLE_MENU.filter(m => m.category === activeCategory);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setReservationSuccess(true);
    setTimeout(() => {
      setShowReservationModal(false);
      setReservationSuccess(false);
      setGuestName('');
    }, 2800);
  };

  return (
    <div className="bg-stone-900 text-stone-100 min-h-full font-serif selection:bg-amber-700 selection:text-white">
      {/* Top Banner */}
      <div className="bg-amber-950/80 border-b border-amber-900/50 py-2 px-4 text-center text-xs tracking-widest uppercase font-sans text-amber-300/90 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        Michelin Guide 2026 Recommended · Farm-to-Table Tasting Experience
      </div>

      {/* Nav */}
      <header className="px-6 py-5 border-b border-stone-800 flex items-center justify-between font-sans">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Utensils className="w-4 h-4" />
          </div>
          <div>
            <div className="text-base font-serif font-bold tracking-wider text-amber-100">L’ATELIER BOTANICA</div>
            <div className="text-[10px] text-stone-400 uppercase tracking-widest font-sans">Kitchen & Cellar</div>
          </div>
        </div>

        <button 
          onClick={() => setShowReservationModal(true)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-sans font-semibold text-xs rounded-full shadow-lg shadow-amber-950 transition-all flex items-center gap-2"
        >
          <Calendar className="w-3.5 h-3.5" /> Reserve Table
        </button>
      </header>

      {/* Hero Visual */}
      <section className="relative px-6 py-20 text-center max-w-4xl mx-auto">
        <span className="text-amber-400/90 font-sans text-xs tracking-[0.25em] uppercase font-medium block mb-3">
          Seasonal Gastronomy
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif text-amber-50 font-normal leading-tight mb-4">
          Where Botanical Heritage Meets Culinary Mastery
        </h1>
        <p className="text-stone-300 font-sans text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mb-8">
          Sourced exclusively from bio-dynamic heirloom orchards within a 40-mile radius, curated daily by Chef Henri Dubois.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-sans">
          <button 
            onClick={() => setShowReservationModal(true)}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-full shadow-md shadow-amber-900/40 transition-colors"
          >
            Book An Evening Experience
          </button>
          <a 
            href="#menu" 
            className="px-6 py-3 border border-stone-700 hover:border-amber-400/50 text-stone-300 hover:text-white rounded-full transition-colors"
          >
            Explore Tasting Menu
          </a>
        </div>
      </section>

      {/* Menu Showcase */}
      <section id="menu" className="px-6 py-12 bg-stone-950/70 border-t border-stone-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-800 gap-4">
            <div>
              <span className="text-amber-500 font-sans text-xs uppercase tracking-widest block mb-1">Curation</span>
              <h2 className="text-2xl font-serif text-amber-100">Autumn Degustation Menu</h2>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-1.5 font-sans text-xs">
              {(['All', 'Mains', 'Brunch', 'Beverages', 'Desserts'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full transition-all ${
                    activeCategory === cat 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium' 
                      : 'text-stone-400 hover:text-stone-200 border border-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <h3 className="font-serif text-base text-amber-100 font-medium">{item.name}</h3>
                    <span className="font-sans font-semibold text-amber-400 text-sm ml-2">${item.price}</span>
                  </div>
                  <p className="font-sans text-xs text-stone-400 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-between font-sans text-[11px] pt-3 border-t border-stone-800/60">
                  <span className="text-stone-500">{item.calories ? `${item.calories} kcal` : 'Artisan Craft'}</span>
                  {item.tag && (
                    <span className="bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-full font-medium">
                      {item.tag}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Details */}
      <section className="px-6 py-12 max-w-4xl mx-auto font-sans grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
        <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800">
          <Clock className="w-5 h-5 text-amber-400 mx-auto mb-2" />
          <div className="font-semibold text-stone-200 mb-1">Hours of Service</div>
          <div className="text-stone-400">Tue – Sun: 17:30 – 23:30<br/>Weekend Brunch: 10:00 – 14:30</div>
        </div>
        <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800">
          <MapPin className="w-5 h-5 text-amber-400 mx-auto mb-2" />
          <div className="font-semibold text-stone-200 mb-1">Location</div>
          <div className="text-stone-400">42 Heritage Courtyard, Grove Ave.<br/>Valet parking available</div>
        </div>
        <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800">
          <Heart className="w-5 h-5 text-amber-400 mx-auto mb-2" />
          <div className="font-semibold text-stone-200 mb-1">Dietary Philosophy</div>
          <div className="text-stone-400">Gluten-free, vegan, and pescatarian pairings customized on request</div>
        </div>
      </section>

      {/* Reservation Modal */}
      {showReservationModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowReservationModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {reservationSuccess ? (
              <div className="py-8 text-center animate-in zoom-in-95">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif text-amber-100 mb-1">Table Reserved</h3>
                <p className="text-xs text-stone-300">
                  We look forward to welcoming you, <span className="text-amber-300 font-semibold">{guestName || 'Guest'}</span>, on {reserveDate} at {reserveTime} ({partySize} Guests).
                </p>
              </div>
            ) : (
              <form onSubmit={handleBooking}>
                <h3 className="font-serif text-xl text-amber-100 mb-1">Reserve Your Table</h3>
                <p className="text-xs text-stone-400 mb-5">Experience our culinary salon. No prepayment required.</p>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Guest Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g., Katherine Vance"
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-300 font-medium mb-1">Party Size</label>
                      <select 
                        value={partySize}
                        onChange={(e) => setPartySize(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="1">1 Guest (Chef's Bar)</option>
                        <option value="2">2 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="6">6 Guests (Private Alcove)</option>
                        <option value="8">8+ Guests (Banquet)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-stone-300 font-medium mb-1">Preferred Time</label>
                      <select 
                        value={reserveTime}
                        onChange={(e) => setReserveTime(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="17:30">5:30 PM</option>
                        <option value="18:30">6:30 PM</option>
                        <option value="19:30">7:30 PM</option>
                        <option value="20:30">8:30 PM</option>
                        <option value="21:15">9:15 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Date</label>
                    <input 
                      type="date"
                      value={reserveDate}
                      onChange={(e) => setReserveDate(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowReservationModal(false)}
                    className="px-4 py-2 border border-stone-700 text-stone-400 hover:text-white rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-lg text-xs transition-colors"
                  >
                    Confirm Reservation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
