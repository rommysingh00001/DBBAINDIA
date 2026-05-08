export default function AdminPanel() {
  return (
    <main className="adminPanel">

      <aside className="sidebar">
        <div>
          <h1>DBBA ADMIN</h1>
          <p>Control Center</p>
        </div>

        <ul>
          <li className="active">Dashboard</li>
          <li>Winning Number</li>
          <li>User Bets</li>
          <li>Wallet</li>
          <li>Results</li>
          <li>Users</li>
        </ul>
      </aside>

      <section className="mainContent">

        <div className="dashboardTop">
          <div>
            <h2>Admin Dashboard</h2>
            <span>Manage DBBA INDIA Platform</span>
          </div>

          <button>Logout</button>
        </div>

        <div className="statsBoxes">

          <div className="statBox">
            <p>Total Users</p>
            <h3>1,250</h3>
          </div>

          <div className="statBox">
            <p>Total Bets</p>
            <h3>8,540</h3>
          </div>

          <div className="statBox">
            <p>Collection</p>
            <h3>₹1,25,000</h3>
          </div>

          <div className="statBox">
            <p>Winning No.</p>
            <h3>47</h3>
          </div>

        </div>

        <div className="publishCard">

          <div className="cardHeader">
            <h3>Publish Winning Number</h3>
            <span>Today's Result Control</span>
          </div>

          <div className="publishArea">
            <input type="text" placeholder="Enter Winning Number" />
            <button>Publish</button>
          </div>

        </div>

        <div className="recentBets">

          <div className="cardHeader">
            <h3>Recent Bets</h3>
            <span>Realtime Bet Activity</span>
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
                <td className="green">Winner</td>
              </tr>

              <tr>
                <td>Aman</td>
                <td>12</td>
                <td>₹1000</td>
                <td className="red">Lost</td>
              </tr>

              <tr>
                <td>Rohit</td>
                <td>89</td>
                <td>₹200</td>
                <td className="yellow">Pending</td>
              </tr>

            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}
