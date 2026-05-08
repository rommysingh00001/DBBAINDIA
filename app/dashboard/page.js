'use client';

import {
  useEffect,
  useState
} from 'react';

import '../globals.css';

import Navbar
from '../../components/Navbar';

import NumberGrid
from '../../components/NumberGrid';

import WalletCard
from '../../components/WalletCard';

export default function Dashboard() {

  const numbers =
    Array.from(
      { length:100 },
      (_,i)=>
        i.toString()
        .padStart(2,'0')
    );

  const [selected,setSelected] =
    useState('');

  return (

    <main className="dashboard">

      <Navbar />

      <div className="topBar">

        <WalletCard
          title="Wallet"
          value="₹1000"
        />

        <WalletCard
          title="Latest Result"
          value="54"
        />

      </div>

      <h2 className="title">
        Select Number
      </h2>

      <NumberGrid
        numbers={numbers}
        selected={selected}
        onSelect={setSelected}
      />

    </main>
  );
}
