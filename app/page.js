# SIMPLE WORKING NEXT.JS WEBSITE (NO TAILWIND NEEDED)

Ye version bina Tailwind ke chalega.
Aapko sirf 2 files paste karni hain.

---

# FILE 1 → app/page.js

```javascript
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

      <section className="features">
        <h3>Platform Features</h3>

        <div className="cards">
          <div className="card">
            <div className="icon">🎯</div>
            <h4>Easy Number Selection</h4>
            <p>Mobile-friendly number selection system.</p>
          </div>

          <div className="card">
            <div className="icon">💰</div>
            <h4>90x Reward Logic</h4>
            <p>Winning numbers receive up to 90x rewards.</p>
          </div>

          <div className="card">
            <div className="icon">⚡</div>
            <h4>Realtime Updates</h4>
            <p>Daily result announcements and wallet updates.</p>
          </div>
        </div>
      </section>

      <section className="winner">
        <h3>Today's Winning Number</h3>
        <div className="winnerNumber">47</div>
        <p>Results Updated Daily at 09:15 AM</p>
      </section>
    </main>
  );
}
```

---

# FILE 2 → app/globals.css

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  background: #000;
  color: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  border-bottom: 1px solid #222;
  flex-wrap: wrap;
  gap: 20px;
}

.header h1 {
  color: gold;
  font-size: 40px;
}

.header p {
  color: #999;
}

.wallet {
  background: #111;
  border: 1px solid #333;
  padding: 15px 25px;
  border-radius: 20px;
  text-align: center;
}

.wallet span {
  color: #aaa;
  font-size: 14px;
}

.wallet h2 {
  color: #00ff88;
  margin-top: 5px;
}

.hero {
  text-align: center;
  padding: 100px 20px;
}

.hero h2 {
  font-size: 65px;
  line-height: 1.3;
  font-weight: bold;
}

.hero span {
  color: gold;
}

.hero p {
  margin-top: 25px;
  color: #aaa;
  font-size: 18px;
}

.heroButtons {
  margin-top: 40px;
}

.heroButtons button {
  padding: 15px 35px;
  border-radius: 15px;
  border: none;
  font-size: 18px;
  font-weight: bold;
  margin: 10px;
  cursor: pointer;
}

.heroButtons button:first-child {
  background: gold;
  color: black;
}

.secondary {
  background: transparent;
  border: 1px solid #444 !important;
  color: white;
}

.numbersSection {
  padding: 50px 40px;
}

.topBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
}

.topBar h3 {
  font-size: 40px;
}

.topBar p {
  color: #999;
}

.resultBox {
  background: #111;
  border: 1px solid #333;
  padding: 15px 25px;
  border-radius: 20px;
  text-align: center;
}

.resultBox span {
  color: #999;
}

.resultBox h4 {
  color: gold;
  font-size: 28px;
  margin-top: 5px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 15px;
}

.numberBtn {
  background: #111;
  border: 1px solid #333;
  color: white;
  padding: 22px;
  border-radius: 18px;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.numberBtn:hover {
  background: gold;
  color: black;
}

.betArea {
  text-align: center;
  margin-top: 50px;
}

.betBtn {
  background: #00ff88;
  color: black;
  border: none;
  padding: 18px 45px;
  border-radius: 18px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.features {
  padding: 80px 40px;
  background: #080808;
}

.features h3 {
  text-align: center;
  font-size: 50px;
  margin-bottom: 50px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.card {
  background: #111;
  border: 1px solid #333;
  padding: 35px;
  border-radius: 30px;
}

.icon {
  font-size: 60px;
  margin-bottom: 20px;
}

.card h4 {
  font-size: 28px;
  margin-bottom: 15px;
}

.card p {
  color: #aaa;
  line-height: 1.7;
}

.winner {
  margin: 60px 40px;
  padding: 70px 20px;
  text-align: center;
  background: linear-gradient(to right, gold, #ffd54f);
  color: black;
  border-radius: 35px;
}

.winner h3 {
  font-size: 50px;
}

.winnerNumber {
  font-size: 120px;
  font-weight: bold;
  margin: 20px 0;
}

.winner p {
  font-size: 20px;
  font-weight: bold;
}

@media (max-width: 768px) {
  .hero h2 {
    font-size: 40px;
  }

  .winnerNumber {
    font-size: 80px;
  }

  .features h3,
  .topBar h3 {
    font-size: 35px;
  }
}
```

---

# BAS ITNA KARO

1. app/page.js me first code paste karo
2. app/globals.css me second code paste karo
3. Save + Commit Changes
4. Vercel automatically redeploy karega
5. Premium website live
