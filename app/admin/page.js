export default function AdminPanel() {
  return (
    <main className="adminPage">

      <aside className="sidebar">
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

      <section className="content">

        <div className="topBar">
          <h2>Admin Dashboard</h2>

          <button>Logout</button>
        </div>

        <div className="statsGrid">

          <div className="statCard">
            <h3>Total Users</h3>
            <p>1,250</p>
          </div>

          <div className="statCard">
            <h3>Total Bets</h3>
            <p>8,540</p>
          </div>

          <div className="statCard">
            <h3>Today's Collection</h3>
            <p>₹1,25,000</p>
          </div>

          <div className="statCard">
            <h3>Today's Winning No.</h3>
            <p>47</p>
          </div>

        </div>

        <div className="winnerSection">
          <h3>Update Winning Number</h3>

          <div className="winnerControls">
            <input type="text" placeholder="Enter Number" />
            <button>Publish Result</button>
          </div>
        </div>

        <div className="tableSection">
          <h3>Recent Bets</h3>

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
                <td>Pending</td>
              </tr>

              <tr>
                <td>Aman</td>
                <td>12</td>
                <td>₹1000</td>
                <td>Lost</td>
              </tr>

              <tr>
                <td>Rohit</td>
                <td>47</td>
                <td>₹200</td>
                <td>Winner</td>
              </tr>
            </tbody>
          </table>
        </div>

      </section>
    </main>
  );
}
