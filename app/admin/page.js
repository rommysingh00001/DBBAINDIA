export default function AdminPanel() {
  return (
    <main className="adminWrapper">

      <aside className="adminSidebar">
        <h1>DBBA ADMIN</h1>

        <ul>
          <li>Dashboard</li>
          <li>Winning Number</li>
          <li>User Bets</li>
          <li>Wallet Control</li>
          <li>Results</li>
          <li>Users</li>
        </ul>
      </aside>

      <section className="adminContent">

        <div className="adminTopbar">
          <div>
            <h2>Admin Dashboard</h2>
            <p>Manage complete DBBA INDIA platform</p>
          </div>

          <button>Logout</button>
        </div>

        <div className="adminCards">

          <div className="adminCard">
            <span>Total Users</span>
            <h3>1,250</h3>
          </div>

          <div className="adminCard">
            <span>Total Bets</span>
            <h3>8,540</h3>
          </div>

          <div className="adminCard">
            <span>Today's Collection</span>
            <h3>₹1,25,000</h3>
          </div>

          <div className="adminCard">
            <span>Winning Number</span>
            <h3>47</h3>
          </div>

        </div>

        <div className="publishSection">

          <h3>Publish Winning Number</h3>

          <div className="publishControls">
            <input type="text" placeholder="Enter Winning Number" />
            <button>Publish Result</button>
          </div>

        </div>

      </section>

    </main>
  );
}
