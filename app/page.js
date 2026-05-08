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
  const [results, setResults] = useState([]);
  const [latestResult, setLatestResult] = useState(null);

  useEffect(() => {

    const saved = localStorage.getItem('dbbaUser');

    if (saved) {

      const parsed = JSON.parse(saved);

      setUser(parsed);
      setWallet(parsed.wallet);

      fetchHistory(parsed.mobile);
      fetchResults();
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

    const { data: existingBet } = await supabase
      .from('bets')
      .select('*')
      .eq('user_mobile', user.mobile)
      .eq('selected_number', selectedNumber)
      .eq('status', 'Pending');

    if (existingBet.length > 0) {
      alert('You already placed bet on this number');
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
          status: 'Pending'
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

  const cutBet = async (bet) => {

    const refundWallet = wallet + bet.amount;

    await supabase
      .from('bets')
      .delete()
      .eq('id', bet.id);

    await supabase
      .from('users')
      .update({ wallet: refundWallet })
      .eq('mobile', user.mobile);

    const updatedUser = {
      ...user,
      wallet: refundWallet,
    };

    localStorage.setItem(
      'dbbaUser',
      JSON.stringify(updatedUser)
    );

    setWallet(refundWallet);
    setUser(updatedUser);

    fetchHistory(user.mobile);

  };

  const fetchHistory = async (mobile) => {

    const { data } = await supabase
      .from('bets')
      .select('*')
      .eq('user_mobile', mobile)
      .order('id', { ascending: false });

    setHistory(data || []);

  };

  const fetchResults = async () => {

    const { data } = await supabase
      .from('results')
      .select('*')
      .order('id', { ascending: false });

    setResults(data || []);

    if (data && data.length > 0) {
      setLatestResult(data[0]);
    }

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

    <main className="mainDashboard">

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

      <div className="topCards">

        <div className="infoCard">
          <span>Latest Result</span>
          <h2>
            {latestResult
              ? latestResult.winning_number
              : 'No Result'}
          </h2>
        </div>

        <div className="infoCard">
          <span>Total Bets</span>
          <h2>{history.length}</h2>
        </div>

      </div>

      <section className="numberGrid">

        {numbers.map((num) => (

          <button
            key={num}
            className="numberBox"
            onClick={() => selectNumber(num)}
          >
            {num}
          </button>

        ))}

      </section>

      <section className="historySection">

        <h2>Bet History</h2>

        {history.map((bet) => (

          <div className="historyCard" key={bet.id}>

            <div>
              <h3>{bet.selected_number}</h3>
              <p>₹{bet.amount}</p>
            </div>

            <div>
              <span>{bet.status}</span>

              {bet.status === 'Pending' && (
                <button
                  className="cutBtn"
                  onClick={() => cutBet(bet)}
                >
                  Cut Bet
                </button>
              )}

            </div>

          </div>

        ))}

      </section>

      <section className="historySection">

        <h2>Result History</h2>

        {results.map((item) => (

          <div className="historyCard" key={item.id}>

            <div>
              <h3>{item.winning_number}</h3>
              <p>
                {new Date(item.created_at)
                  .toLocaleString()}
              </p>
            </div>

          </div>

        ))}

      </section>

      {showPopup && (

        <div className="popup">

          <div className="popupBox">

            <h2>Bet on {selectedNumber}</h2>

            <input
              type="number"
              placeholder="Enter Amount"
              value={betAmount}
              onChange={(e) =>
                setBetAmount(e.target.value)
              }
            />

            <button onClick={placeBet}>
              Confirm Bet
            </button>

            <button
              className="cancelBtn"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>

          </div>

        </div>

      )}

    </main>
  );
}
