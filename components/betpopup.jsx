'use client';

import { useState } from 'react';

export default function BetPopup({
  number,
  onClose,
  onSubmit
}) {

  const [amount,setAmount] =
    useState('');

  return (

    <div className="popupOverlay">

      <div className="popup">

        <h2>
          Bet On {number}
        </h2>

        <input
          placeholder="Enter Amount"

          value={amount}

          onChange={(e)=>
            setAmount(e.target.value)
          }
        />

        <button
          onClick={()=>
            onSubmit(amount)
          }
        >
          Place Bet
        </button>

        <button onClick={onClose}>
          Close
        </button>

      </div>

    </div>
  );
}
