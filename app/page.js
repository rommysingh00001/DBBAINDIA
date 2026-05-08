export default function Home() {
  const numbers = Array.from({ length: 100 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  return (
    <main className="min-h-screen bg-black text-white">

      <header className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-5 border-b border-zinc-800">
        <div>
          <h1 className="text-4xl font-extrabold text-yellow-400">
            DBBA INDIA
          </h1>

          <p className="text-zinc-400 mt-1">
            Virtual Number Selection Platform
          </p>
        </div>

        <div className="mt-4 md:mt-0 bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-3 text-center">
          <p className="text-zinc-400 text-sm">Wallet Balance</p>

          <h2 className="text-2xl font-bold text-green-400">
            ₹25,000
          </h2>
        </div>
      </header>

      <section className="text-center px-6 md:px-16 py-20">
        <h2 className="text-5xl md:text-7xl font-black leading-tight">
          Select Your Lucky Number
          <br />

          <span className="text-yellow-400">
            Win Up To 90x Rewards
          </span>
        </h2>

        <p className="max-w-3xl mx-auto mt-8 text-zinc-400 text-lg leading-8">
          Choose numbers from 00 to 99, place your virtual bet,
          and check daily results announced every morning at 09:15 AM.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-5">
          <button className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold text-lg">
            Play Now
          </button>

          <button className="border border-zinc-700 px-8 py-4 rounded-2xl font-semibold">
            How To Play
          </button>
        </div>
      </section>

      <section className="px-6 md:px-16 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-10">
          <div>
            <h3 className="text-4xl font-bold">
              Choose Number
            </h3>

            <p className="text-zinc-400 mt-2">
              Select any number between 00 - 99
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 text-center">
            <p className="text-zinc-400 text-sm">
              Today's Result Time
            </p>

            <h4 className="text-yellow-400 text-2xl font-bold mt-1">
              09:15 AM
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-4">
          {numbers.map((num) => (
            <button
              key={num}
              className="bg-zinc-900 border border-zinc-700 rounded-2xl py-5 text-xl font-bold hover:bg-yellow-400 hover:text-black transition-all"
            >
              {num}
            </button>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-green-400 text-black px-10 py-4 rounded-2xl text-xl font-bold">
            Place Bet
          </button>
        </div>
      </section>

      <section className="px-6 md:px-16 py-20 bg-zinc-950">
        <h3 className="text-5xl font-bold text-center mb-16">
          Platform Features
        </h3>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <div className="text-6xl mb-6">🎯</div>

            <h4 className="text-2xl font-bold mb-4">
              Easy Number Selection
            </h4>

            <p className="text-zinc-400 leading-8">
              Smooth and mobile-friendly number selection system from 00 to 99.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <div className="text-6xl mb-6">💰</div>

            <h4 className="text-2xl font-bold mb-4">
              90x Reward Logic
            </h4>

            <p className="text-zinc-400 leading-8">
              Winning numbers receive up to 90 times the selected amount.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <div className="text-6xl mb-6">⚡</div>

            <h4 className="text-2xl font-bold mb-4">
              Realtime Updates
            </h4>

            <p className="text-zinc-400 leading-8">
              Daily result announcements and wallet updates with realtime system integration.
            </p>
          </div>

        </div>
      </section>

      <section className="px-6 md:px-16 py-20">
        <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-black rounded-[40px] p-10 md:p-16 text-center">
          <h3 className="text-4xl md:text-5xl font-black">
            Today's Winning Number
          </h3>

          <div className="text-8xl md:text-9xl font-black my-8">
            47
          </div>

          <p className="text-xl font-semibold">
            Results Updated Daily at 09:15 AM
          </p>
        </div>
      </section>

    </main>
  );
}
