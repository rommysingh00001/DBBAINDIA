'use client';

import Link from 'next/link';

export default function Navbar() {

  return (

    <div className="navbar">

      <Link href="/dashboard">
        Home
      </Link>

      <Link href="/mybets">
        My Bets
      </Link>

      <Link href="/wallet">
        Wallet
      </Link>

      <Link href="/results">
        Results
      </Link>

      <Link href="/howtoplay">
        How To Play
      </Link>

      <Link href="/contact">
        Contact
      </Link>

    </div>
  );
}
