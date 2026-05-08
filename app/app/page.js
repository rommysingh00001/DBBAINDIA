export default function DBBAIndiaPage() {
  const numbers = Array.from({ length: 100 }, (_, i) => i.toString().padStart(2, '0'));

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
            <h2 className="text-xl font-bold text-green-400">₹ 25,000</h2>
          </div>

          <button className="bg-yellow-400 text-black font-semibold px-5 py-2 rounded-2xl hover:scale-105 transition-all">
            Login
          </button>
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
            Choose numbers from 00 to 99, place your virtual bet, and check daily results announced every morning at 09:15 AM.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-yellow-400 text-black px-8 py-3 rounded-2xl font-bold text-lg hover:scale-105 transition-all">
              Play Now
            </button>

            <button className="border border-zinc-600 px-8 py-3 rounded-2xl font-semibold hover:bg-zinc-800 transition-all">
              How To Play
            </button>
          </div>
        </div>
      </section>

      {/* Number Grid */}
      <section className="px-4 md:px-16 py-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h3 className="text-3xl font-bold">Choose Number</h3>
            <p className="text-zinc-400">Select any number between 00 - 99</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-3">
            <p className="text-sm text-zinc-400">Today's Result Time</p>
            <h4 className="text-xl font-bold text-yellow-400">09:15 AM</h4>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-4">
          {numbers.map((num) => (
            <button
              key={num}
              className="bg-zinc-900 border border-zinc-700 rounded-2xl py-5 text-xl font-bold hover:bg-yellow-400 hover:text-black hover:scale-105 transition-all shadow-lg"
            >
              {num}
            </button>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-green-500 px-10 py-4 rounded-2xl text-black font-bold text-xl hover:scale-105 transition-all shadow-2xl">
            Place Bet
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-16 py-16">
        <h3 className="text-4xl font-bold text-center mb-12">Platform Features</h3>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-700 shadow-xl">
            <div className="text-5xl mb-5">🎯</div>
            <h4 className="text-2xl font-bold mb-3">Easy Number Selection</h4>
            <p className="text-zinc-400 leading-relaxed">
              Smooth and mobile-friendly number selection system from 00 to 99.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-700 shadow-xl">
            <div className="text-5xl mb-5">💰</div>
            <h4 className="text-2xl font-bold mb-3">90x Reward Logic</h4>
            <p className="text-zinc-400 leading-relaxed">
              Winning numbers receive up to 90 times the selected amount.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-700 shadow-xl">
            <div className="text-5xl mb-5">⚡</div>
            <h4 className="text-2xl font-bold mb-3">Realtime Updates</h4>
            <p className="text-zinc-400 leading-relaxed">
              Daily result announcements and wallet updates with realtime system integration.
            </p>
          </div>
        </div>
      </section>

      {/* Required Pages Section */}
      <section className="px-6 md:px-16 py-16 bg-black/40">
        <h3 className="text-4xl font-bold text-center mb-12">Available Pages</h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            'Home',
            'My Bets',
            'Wallet',
            'Results',
            'How To Play',
            'Contact',
          ].map((item) => (
            <div
              key={item}
              className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 text-center hover:border-yellow-400 hover:scale-105 transition-all"
            >
              <h4 className="text-2xl font-bold text-yellow-400">{item}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* How To Play */}
      <section className="px-6 md:px-16 py-16">
        <h3 className="text-4xl font-bold text-center mb-12">How To Play</h3>

        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-6">
          {[
            'Select Number',
            'Enter Amount',
            'Place Bet',
            'Check Results',
          ].map((step, index) => (
            <div
              key={step}
              className="bg-zinc-900 rounded-3xl border border-zinc-700 p-8 text-center"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-yellow-400 text-black flex items-center justify-center text-2xl font-bold mb-5">
                {index + 1}
              </div>
              <h4 className="text-xl font-bold mb-3">{step}</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Complete this step to continue your gameplay process.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Result Banner */}
      <section className="px-6 md:px-16 py-16">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-200 text-black rounded-3xl p-10 text-center shadow-2xl">
          <h3 className="text-4xl font-extrabold mb-4">Today's Winning Number</h3>
          <div className="text-7xl font-black tracking-widest mb-4">47</div>
          <p className="text-lg font-semibold">Results Updated Daily at 09:15 AM</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-700 px-6 md:px-16 py-10 text-center">
        <h4 className="text-2xl font-bold text-yellow-400 mb-3">DBBA INDIA</h4>
        <p className="text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-5">
          This is a UI demo concept for virtual number selection and wallet-based gameplay interface.
        </p>

        <div className="flex justify-center gap-6 flex-wrap text-zinc-400">
          <a href="#" className="hover:text-yellow-400">Home</a>
          <a href="#" className="hover:text-yellow-400">Wallet</a>
          <a href="#" className="hover:text-yellow-400">Results</a>
          <a href="#" className="hover:text-yellow-400">Contact</a>
        </div>

        <p className="text-zinc-600 text-sm mt-8">
          © 2026 DBBA INDIA. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
