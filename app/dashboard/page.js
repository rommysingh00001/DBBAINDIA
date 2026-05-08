'use client'

import { useState } from 'react'

import '../globals.css'

import Navbar from '../../components/Navbar.jsx'
import WalletCard from '../../components/WalletCard.jsx'
import NumberGrid from '../../components/NumberGrid.jsx'
import BetPopup from '../../components/BetPopup.jsx'

export default function Dashboard() {

  const numbers =
    Array.from(
      { length: 100 },
      (_, i) =>
        i.toString().padStart(2, '0')
    )

  const [selected, setSelected] =
    useState('')

  return (

    <main className="dashboard">

      <Navbar />

      <section className="hero">

        <h1>
          Select Your Lucky Number
        </h1>

        <h2>
          Win Up To 90x Rewards
        </h2>

      </section>

      <div className="topCards">

        <WalletCard
          title="Wallet"
          value="₹1000"
        />

        <WalletCard
          title="Latest Result"
          value="47"
        />

      </div>

      <NumberGrid
        numbers={numbers}
        selected={selected}
        onSelect={setSelected}
      />

      <BetPopup selected={selected} />

    </main>
  )
}
