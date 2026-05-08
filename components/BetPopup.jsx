'use client'

import { useState } from 'react'

export default function BetPopup({
  selected
}) {

  const [amount, setAmount] =
    useState('')

  const placeBet = () => {

    if (!selected) {
      alert('Select number')
      return
    }

    if (!amount) {
      alert('Enter amount')
      return
    }

    alert(
      `Bet placed on ${selected}`
    )
  }

  return (

    <div className="betPopup">

      <h2>
        Selected Number:
        {selected || '--'}
      </h2>

      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e)=>
          setAmount(e.target.value)
        }
      />

      <button onClick={placeBet}>
        Place Bet
      </button>

    </div>
  )
}
