'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import '../globals.css';

export default function Dashboard() {

  const numbers = Array.from(
    { length: 100 },
    (_, i) => i.toString().padStart(2, '0')
  );

  const [user, setUser] = useState(null);

  const [wallet, setWallet] = useState(0);

  const [history, setHistory] = useState([]);

  useEffect(() => {

    const saved =
      localStorage.getItem('dbbaUser');

    if (saved) {

      const parsed = JSON.parse(saved);

      setUser(parsed);
      setWallet(parsed.wallet);

      fetchHistory(parsed.mobile);
    }

  }, []);

  const placeBet = async (number) => {

    const amount = prompt(
      `Enter amount for ${number}`
    );

    if (!amount) return;

    const betAmount = Number(amount);

    if (betAmount > wallet) {
      alert('Low Balance');
      return;
    }

    const newWallet =
      wallet - betAmount;

    setWallet(newWallet);

    await supabase
      .from('users')
      .update({
        wallet:newWallet
      })
      .eq('mobile', user.mobile);

    await supabase
      .from('bets')
      .insert([
        {
          user_mobile:user.mobile,
          selected_number:number,
          amount:betAmount,
          status:'Pending'
        }
      ]);

    fetchHistory(user.mobile);

    alert('Bet Placed');
  };

  const fetchHistory = async (mobile) => {

    const { data } = await supabase
      .from('bets')
      .select('*')
      .eq('user_mobile', mobile)
      .order('id', {
        ascending:false
      });

    setHistory(data || []);
  };

  return (

    <main className="dashboard">

      <div className="topBar">

        <div className="walletCard">
          <h3>Wallet</h3>
          <h1>₹{wallet}</h1>
        </div>

        <div className="walletCard">
          <h3>User</h3>
          <h1>
            {user?.name || 'Player'}
          </h1>
        </div>

      </div>

      <h2 className="title">
        Place Bet
      </h2>

      <div className="numberGrid">

        {numbers.map((num)=>(

          <button
            key={num}
            className="numberBtn"
            onClick={() =>
              placeBet(num)
            }
          >
            {num}
          </button>

        ))}

      </div>

      <h2 className="title">
        Bet History
      </h2>

      <div>

        {history.map((bet)=>(

          <div
            className="historyCard"
            key={bet.id}
          >

            <div>
              <h3>
                {bet.selected_number}
              </h3>

              <p>
                ₹{bet.amount}
              </p>
            </div>

            <div>
              <h3>
                {bet.status}
              </h3>
            </div>

          </div>

        ))}

      </div>

    </main>
  );
}
