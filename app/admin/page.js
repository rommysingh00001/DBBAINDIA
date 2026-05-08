export default function AdminPanel() {
  return (
    <main className="adminLayout">

      <aside className="adminSide">

        <div className="logoArea">
          <h1>DBBA ADMIN</h1>
          <p>Premium Control Panel</p>
        </div>

        <nav>
          <button className="navActive">Dashboard</button>
          <button>Winning Number</button>
          <button>User Bets</button>
          <button>Wallet</button>
          <button>Results</button>
          <button>Users</button>
        </nav>

      </aside>

      <section className="adminMain">

        <div className="adminHero">

          <div>
            <h2>Admin Dashboard</h2>
            <p>Manage your entire DBBA INDIA platform</p>
          </div>

          <button>Logout</button>

        </div>

        <div className="premiumStats">

          <div className="premiumCard">
            <span>Total Users</span>
            <h3>1,250</h3>
          </div>

          <div className="premiumCard">
            <span>Total Bets</span>
            <h3>8,540</h3>
          </div>

          <div className="premiumCard">
            <span>Total Collection</span>
            <h3>₹1,25,000</h3>
          </div>

          <div className="premiumCard">
            <span>Winning Number</span>
            <h3>47</h3>
          </div>

        </div>

        <div className="actionGrid">

          <div className="glassCard">

            <div className="glassHeader">
              <h3>Publish Result</h3>
              <p>Update today winning number</p>
            </div>

            <div className="publishBox">
              <input type="text" placeholder="Enter Winning Number" />
              <button>Publish</button>
            </div>

          </div>

          <div className="glassCard">

            <div className="glassHeader">
              <h3>Quick Stats</h3>
              <p>Platform realtime overview</p>
            </div>

            <div className="quickStats">

              <div>
                <span>Active Users</span>
                <h4>845</h4>
              </div>

              <div>
                <span>Today's Bets</span>
                <h4>4,521</h4>
              </div>

              <div>
                <span>Total Winners</span>
                <h4>126</h4>
              </div>

            </div>

          </div>

        </div>

        <div className="tableCard">

          <div className="glassHeader">
            <h3>Recent Bets</h3>
            <p>Latest betting activity</p>
          </div>

          <table>

            <thead>
              <tr>
                <th>User</th>
                <th>Number</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>Rahul</td>
                <td>47</td>
                <td>₹500</td>
                <td className="success">Winner</td>
              </tr>

              <tr>
                <td>Aman</td>
                <td>12</td>
                <td>₹1000</td>
                <td className="danger">Lost</td>
              </tr>

              <tr>
                <td>Rohit</td>
                <td>89</td>
                <td>₹200</td>
                <td className="pending">Pending</td>
              </tr>

            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}
