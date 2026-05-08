'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import '../globals.css';

export default function Admin() {

  const [mobile,setMobile] =
    useState('');

  const [wallet,setWallet] =
    useState('');

  const [result,setResult] =
    useState('');

  const addWallet = async () => {

    const { data:user } =
      await supabase
      .from('users')
      .select('*')
      .eq('mobile',mobile)
      .single();

    if (!user) {
      alert('User Not Found');
      return;
    }

    const newBalance =
      Number(user.wallet) +
      Number(wallet);

    await supabase
      .from('users')
      .update({
        wallet:newBalance
      })
      .eq('mobile',mobile);

    alert('Wallet Updated');
  };

  const publishResult = async () => {

    await supabase
      .from('results')
      .insert([
        {
          winning_number:result
        }
      ]);

    const { data:bets } =
      await supabase
      .from('bets')
      .select('*');

    for (const bet of bets) {

      if (
        bet.selected_number === result
      ) {

        const winAmount =
          bet.amount * 90;

        const { data:user } =
          await supabase
          .from('users')
          .select('*')
          .eq(
            'mobile',
            bet.user_mobile
          )
          .single();

        await supabase
          .from('users')
          .update({
            wallet:
              user.wallet +
              winAmount
          })
          .eq(
            'mobile',
            bet.user_mobile
          );

        await supabase
          .from('bets')
          .update({
            status:'Winner'
          })
          .eq('id',bet.id);

      } else {

        await supabase
          .from('bets')
          .update({
            status:'Lost'
          })
          .eq('id',bet.id);
      }
    }

    alert('Result Published');
  };

  return (

    <main className="dashboard">

      <div className="adminCard">

        <h1>ADMIN PANEL</h1>

        <input
          placeholder="User Mobile"
          value={mobile}
          onChange={(e)=>
            setMobile(e.target.value)
          }
        />

        <input
          placeholder="Wallet Amount"
          value={wallet}
          onChange={(e)=>
            setWallet(e.target.value)
          }
        />

        <button onClick={addWallet}>
          Add Wallet
        </button>

        <input
          placeholder="Winning Number"
          value={result}
          onChange={(e)=>
            setResult(e.target.value)
          }
        />

        <button onClick={publishResult}>
          Publish Result
        </button>

      </div>

    </main>
  );
}
