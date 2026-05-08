'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminPanel() {

  const [winningNumber, setWinningNumber] = useState('');

  const publishResult = async () => {

    if (!winningNumber) {
      alert('Enter winning number');
      return;
    }

    await supabase
      .from('results')
      .insert([
        {
          winning_number: winningNumber,
        },
      ]);

    await supabase
      .from('bets')
      .update({ status: 'Lost' })
      .neq('selected_number', winningNumber);

    await supabase
      .from('bets')
      .update({ status: 'Winner' })
      .eq('selected_number', winningNumber);

    alert('Result Published');

    setWinningNumber('');

  };

  return (

    <main className="adminLayout">

      <section className="adminMain">

        <div className="glassCard">

          <div className="glassHeader">
            <h3>Publish Result</h3>
            <p>Update today winning number</p>
          </div>

          <div className="publishBox">

            <input
              type="text"
              placeholder="Enter Winning Number"
              value={winningNumber}
              onChange={(e) =>
                setWinningNumber(e.target.value)
              }
            />

            <button onClick={publishResult}>
              Publish
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}
