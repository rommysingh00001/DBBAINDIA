"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {
  const [winningNumber, setWinningNumber] = useState("");
  const [bets, setBets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchBets();
  }, []);

  async function fetchUsers() {
    const { data } = await supabase.from("users").select("*");
    if (data) setUsers(data);
  }

  async function fetchBets() {
    const { data } = await supabase
      .from("bets")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setBets(data);
  }

  async function declareResult() {
    if (!winningNumber) return;

    setLoading(true);

    await supabase.from("results").insert([
      {
        number: winningNumber,
      },
    ]);

    const { data: allBets } = await supabase
      .from("bets")
      .select("*");

    for (const bet of allBets) {
      const isWinner = bet.number == winningNumber;

      if (isWinner) {
        const winAmount = bet.amount * 90;

        const { data: userData } = await supabase
          .from("users")
          .select("*")
          .eq("id", bet.user_id)
          .single();

        if (userData) {
          await supabase
            .from("users")
            .update({
              wallet: userData.wallet + winAmount,
            })
            .eq("id", bet.user_id);
        }
      }
    }

    alert("Winning Number Declared");
    setWinningNumber("");
    fetchUsers();
    fetchBets();
    setLoading(false);
  }

  const totalBetAmount = bets.reduce(
    (sum, bet) => sum + bet.amount,
    0
  );

  return (
    <div className="adminPage">
      <h1 className="adminTitle">ADMIN PANEL</h1>

      <div className="adminCard">
        <h2>Declare Winning Number</h2>

        <input
          className="adminInput"
          type="number"
          placeholder="Enter Winning Number"
          value={winningNumber}
          onChange={(e) => setWinningNumber(e.target.value)}
        />

        <button
          className="adminBtn"
          onClick={declareResult}
        >
          {loading ? "Processing..." : "Declare Result"}
        </button>
      </div>

      <div className="adminGrid">
        <div className="adminBox">
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>

        <div className="adminBox">
          <h3>Total Bets</h3>
          <p>{bets.length}</p>
        </div>

        <div className="adminBox">
          <h3>Total Bet Amount</h3>
          <p>₹ {totalBetAmount}</p>
        </div>
      </div>

      <div className="adminCard">
        <h2>User Wallet Balances</h2>

        {users.map((user) => (
          <div key={user.id} className="listItem">
            <span>{user.email}</span>
            <span>₹ {user.wallet}</span>
          </div>
        ))}
      </div>

      <div className="adminCard">
        <h2>All Bets Record</h2>

        {bets.map((bet) => (
          <div key={bet.id} className="listItem">
            <span>
              {bet.number}
            </span>

            <span>
              ₹ {bet.amount}
            </span>

            <span>
              {new Date(
                bet.created_at
              ).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
