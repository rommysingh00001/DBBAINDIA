'use client';

import './globals.css';

export default function Home() {

  const numbers = Array.from(
    { length: 100 },
    (_, i) => i.toString().padStart(2, '0')
  );

  return (

    <main className="main">

      <div className="topBar">

        <div className="walletCard">
          <h3>Wallet</h3>
          <h1>₹1000</h1>
        </div>

        <div className="resultCard">
          <h3>Latest Result</h3>
          <h1>--</h1>
        </div>

      </div>

      <h2 className="title">
        Place Your Bet
      </h2>

      <div className="numberGrid">

        {numbers.map((num) => (

          <button
            className="numberBtn"
            key={num}
          >
            {num}
          </button>

        ))}

      </div>

    </main>
  );
}
