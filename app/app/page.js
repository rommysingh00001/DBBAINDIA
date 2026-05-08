"use client";

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- अपनी Supabase डिटेल्स यहाँ पेस्ट करें ---
const supabaseUrl = 'https://meqzyznfpiqitdrxsxax.supabase.co/rest/v1/'; 
const supabaseKey = 'sb_publishable_UX18XHfoD65kZ2lrBtF9xg_CoYJFLo7';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function DBBAIndiaPage() {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [balance, setBalance] = useState(25000);
  
  // 00 से 99 तक नंबर की लिस्ट
  const numbers = Array.from({ length: 100 }, (_, i) => i.toString().padStart(2, '0'));

  const handleNumberSelect = (num) => {
    setSelectedNumber(num);
  };

  const handlePlaceBet = async () => {
    if (!selectedNumber) {
      alert("कृपया पहले एक नंबर चुनें!");
      return;
    }

    const betAmount = 100;
    if (balance < betAmount) {
      alert("वॉलेट में बैलेंस कम है!");
      return;
    }

    // डेटाबेस में बेट सेव करना
    const { error } = await supabase
      .from('bets')
      .insert([{ number_selected: selectedNumber, amount: betAmount }]);

    if (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
    } else {
      setBalance(balance - betAmount);
      alert(`बधाई हो! नंबर ${selectedNumber} पर ₹${betAmount} का दांव लग गया है।`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div>
          <h1 className="text-2xl font-bold text-yellow-400">DBBA INDIA</h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Virtual Selection</p>
        </div>
        <div className="bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-700 shadow-inner">
          <p className="text-[10px] text-zinc-400 uppercase">Wallet</p>
          <h2 className="text-lg font-bold text-green-400">₹ {balance}</h2>
        </div>
      </header>

      {/* Hero Section */}
      <main className="p-6 max-w-5xl mx-auto">
        <div className="text-center mt-6 mb-10">
          <h2 className="text-4xl font-extrabold mb-2 tracking-tight">
            Win <span className="text-yellow-400">90x</span> Rewards
          </h2>
          <p className="text-zinc-400 text-sm">Choose your lucky number from 00 to 99</p>
        </div>

        {/* Selection Display */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 mb-10 text-center">
          <p className="text-zinc-500 text-xs uppercase mb-2">Your Current Selection</p>
          <div className="text-6xl font-black text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">
            {selectedNumber || '--'}
          </div>
        </div>

        {/* Grid of Numbers */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
          {numbers.map((num) => (
            <button
              key={num}
              onClick={() => handleNumberSelect(num)}
              className={`py-4 rounded-xl font-bold text-lg transition-all border ${
                selectedNumber === num 
                ? 'bg-yellow-400 text-black border-yellow-400 scale-110 shadow-[0_0_20px_rgba(250,204,21,0.4)]' 
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center sticky bottom-10">
          <button 
            onClick={handlePlaceBet}
            className="bg-green-500 text-black px-16 py-5 rounded-2xl font-black text-xl hover:bg-green-400 transition-all shadow-[0_10px_30px_rgba(34,197,94,0.3)] active:scale-95"
          >
            PLACE BET (₹100)
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-10 border-t border-zinc-900 text-center">
        <p className="text-zinc-600 text-[10px] uppercase tracking-tighter">
          © 2026 DBBA INDIA. Virtual number gaming interface.
        </p>
      </footer>
    </div>
  );
}
