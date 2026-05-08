import './globals.css';
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
