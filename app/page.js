import './globals.css';

export default function Home() {
  const numbers = Array.from({ length: 100 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  return (
    <main>
      <header className="header">
        <div>
          <h1>DBBA INDIA</h1>
          <p>Virtual Number Selection Platform</p>
        </div>

        <div className="wallet">
          <span>Wallet Balance</span>
          <h2>₹25,000</h2>
        </div>
      </header>

      <section className="hero">
        <h2>
          Select Your Lucky Number
          <br />
          <span>Win Up To 90x Rewards</span>
        </h2>

        <p>
          Choose numbers from 00 to 99 and check daily results.
        </p>

        <div className="heroButtons">
          <button>Play Now</button>
          <button className="secondary">How To Play</button>
        </div>
      </section>

      <section className="numbersSection">
        <div className="topBar">
          <div>
            <h3>Choose Number</h3>
            <p>Select any number between 00 - 99</p>
          </div>

          <div className="resultBox">
            <span>Today's Result Time</span>
            <h4>09:15 AM</h4>
          </div>
        </div>

        <div className="grid">
          {numbers.map((num) => (
            <button key={num} className="numberBtn">
              {num}
            </button>
          ))}
        </div>

        <div className="betArea">
          <button className="betBtn">Place Bet</button>
        </div>
      </section>
    </main>
  );
}
