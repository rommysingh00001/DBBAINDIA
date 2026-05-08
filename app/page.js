'use client';

import { useEffect, useState } from 'react';
import './globals.css';
import { supabase } from '../lib/supabase';

export default function Home() {

  const numbers = Array.from({ length: 100 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  const [user, setUser] = useState(null);

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const [wallet, setWallet] = useState(0);

  const [selectedNumber, setSelectedNumber] = useState('');
  const [betAmount, setBetAmount] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const [history, setHistory] = useState([]);

  useEffect(() => {

    const saved = localStorage.getItem('dbbaUser');

    if (saved) {

      const parsed = JSON.parse(saved);

      setUser(parsed);
      setWallet(parsed.wallet);

      fetchHistory(parsed.mobile);

    }

  }, []);

  const createAccount = async () => {

    if (!name || !mobile || !password) {
      alert('Fill all fields');
      return;
    }

    const userId =
      name.substring(0, 3).toUpperCase() +
      mobile.slice(-4);

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          mobile,
          password,
          user_id: userId,
          wallet: 1000,
        },
      ])
      .select();

    if (error) {
      alert(error.message);
      return;
    }

    localStorage.setItem(
      'dbbaUser',
      JSON.stringify(data[0])
    );

    setUser(data[0]);
    setWallet(1000);

  };

  const selectNumber = (num) => {

    if (wallet <= 0) {
      alert('Wallet Empty');
      return;
    }

    setSelectedNumber(num);
    setShowPopup(true);

  };

  const placeBet = async () => {

    const amount = Number(betAmount);

    if (!amount || amount <= 0) {
      alert('Enter valid amount');
      return;
    }

    if (amount > wallet) {
      alert('Insufficient Balance');
      return;
    }

    const newWallet = wallet - amount;

    await supabase
      .from('users')
      .update({ wallet: newWallet })
      .eq('mobile', user.mobile);

    await supabase
      .from('bets')
      .insert([
        {
          user_mobile: user.mobile,
          selected_number: selectedNumber,
          amount,
        },
      ]);

    const updatedUser = {
      ...user,
      wallet: newWallet,
    };

    localStorage.setItem(
      'dbbaUser',
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
    setWallet(newWallet);

    fetchHistory(user.mobile);

    setShowPopup(false);
    setBetAmount('');

  };

  const fetchHistory = async (mobile) => {

    const { data } = await supabase
      .from('bets')
      .select('*')
      .eq('user_mobile', mobile)
      .order('id', { ascending: false });

    setHistory(data || []);

  };

  if (!user) {

    return (

      <main className="signupPage">

        <div className="signupCard">

          <h1>DBBA INDIA</h1>

          <p>Create Account</p>

          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button onClick={createAccount}>
            Create Account
          </button>

        </div>

      </main>

    );

  }

  return (

    <main>

      <header className="header">

        <div>
          <h1>DBBA INDIA</h1>
          <p>User ID: {user.user_id}</p>
        </div>

        <div className="walletBox">
          <span>Wallet Balance</span>
          <h2>₹{wallet}</h2>
        </div>

      </header>

      <section className="hero">

        <h2>
          Select Your Lucky Number
          <br />
          <span>Win Massive Rewards</span>
        </h2>

      </section>

      <section className="numbersSection">

        <div className="topTitle">
          <h3>Choose Number</h3>
          <p>00 - 99</p>
        </div>

        <div className="grid">

          {numbers.map((num) => (

            <button
              key={num}
              className="numberBtn"
              onClick={() =>
                selectNumber(num)
              }
            >
              {num}
            </button>

          ))}

        </div>

      </section>

      <section className="historySection">

        <h3>Bet History</h3>

        <div className="historyGrid">

          {history.map((bet) => (

            <div
              className="historyCard"
              key={bet.id}
            >

              <h4>{bet.selected_number}</h4>

              <p>₹{bet.amount}</p>

            </div>

          ))}

        </div>

      </section>

      {showPopup && (

        <div className="popupOverlay">

          <div className="popupCard">

            <h2>
              Selected Number:
              {' '}
              {selectedNumber}
            </h2>

            <input
              type="number"
              placeholder="Enter Amount"
              value={betAmount}
              onChange={(e) =>
                setBetAmount(e.target.value)
              }
            />

            <button onClick={placeBet}>
              Place Bet
            </button>

          </div>

        </div>

      )}

    </main>

  );
}
