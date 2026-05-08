"use client";

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- यहाँ अपनी Supabase डिटेल्स डालें ---
const supabaseUrl = 'YOUR_SUPABASE_URL'; 
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function DBBAIndiaPage() {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [balance, setBalance] = useState(25000);
  const numbers = Array.from({ length: 100 }, (_, i) => i.toString().padStart(2, '0'));

  const handleNumberSelect = (num) => { setSelectedNumber(num); };

  const handlePlaceBet = async () => {
    if (!selectedNumber) { alert("कृपया पहले एक नंबर चुनें!"); return; }
    const betAmount = 100;
    if (balance < betAmount) { alert("वॉलेट में बैलेंस कम है!"); return; }

    const { error } = await supabase.from('bets').insert([{ number_selected: selectedNumber, amount: betAmount }]);

    if (error) { alert("Error: " + error.message); } 
    else {
      setBalance(balance - betAmount);
      alert(`बधाई हो! नंबर ${selectedNumber} पर ₹${betAmount} का दांव लग गया है।`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 border-b border-zinc-700 sticky top-0 bg-black/70 backdrop-blur-md z-50">
        <div>
          <h1 className="text-3xl font-bold tracking-wide text-yellow-400">DBBA INDIA</h1>
          <p className="text-sm text-zinc-400">Virtual Number Selection Platform</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-zinc-800 px-5 py-2 rounded-2xl border border-zinc-700 shadow-lg">
            <p className="text-xs text-zinc-400">Wallet Balance</p>
            <h2 className="text-xl font-bold text-green-400">₹ {balance}</h2>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 md:px-16 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Select Your Lucky Number <br />
            <span className="text-yellow-400">Win Up To 90x Rewards</span>
          </h2>
          <p className="text-zinc-300 text-lg leading-relaxed mb-8">
            Choose numbers from 00 to 99, place your virtual bet, and check daily results at 09:15 AM.
          </p>
        </div>
      </section>

      {/* Number Grid */}
      <section className="px-4 md:px-16 py-8 bg-black/30 rounded-3xl mx-4 border border-zinc-800">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h3 className="text-3xl font-bold">Choose Number: <span className="text-yellow-400">{selectedNumber || '--'}</span></h3>
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-3">
            <p className="text-sm text-zinc-400">Result Time</p>
            <h4 className="text-xl font-bold text-yellow-400">09:15 AM</h4>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
          {numbers.map((num) => (
            <button key={num} onClick={() => handleNumberSelect(num)}
              className={`py-4 rounded-xl font-bold text-lg transition-all border ${
                selectedNumber === num ? 'bg-yellow-400 text-black scale-110 shadow-lg' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600'
              }`}>{num}</button>
          ))}
        </div>

        <div className="text-center mt-10">
          <button onClick={handlePlaceBet} className="bg-green-500 px-12 py-4 rounded-2xl text-black font-bold text-xl hover:scale-105 transition-all shadow-2xl">
            PLACE BET (₹100)
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-16 py-16 grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-700 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h4 className="text-xl font-bold mb-2">Easy Selection</h4>
            <p className="text-zinc-400 text-sm">Smooth mobile-friendly system from 00 to 99.</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-700 text-center">
            <div className="text-4xl mb-4">💰</div>
            <h4 className="text-xl font-bold mb-2">90x Rewards</h4>
            <p className="text-zinc-400 text-sm">Winners receive up to 90 times the selected amount.</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-700 text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-xl font-bold mb-2">Realtime Updates</h4>
            <p className="text-zinc-400 text-sm">Daily result announcements and wallet updates.</p>
          </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-700 py-10 text-center text-zinc-500 text-sm">
        © 2026 DBBA INDIA. For Virtual Gameplay Demo Only.
      </footer>
    </div>
  );
}
