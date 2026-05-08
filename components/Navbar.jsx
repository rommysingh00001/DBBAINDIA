'use client'

import Link from 'next/link'

export default function Navbar(){

  return(

    <div className="bottomNav">

      <Link href="/dashboard">
        Home
      </Link>

      <Link href="/results">
        Results
      </Link>

      <Link href="/wallet">
        Wallet
      </Link>

      <Link href="/profile">
        Profile
      </Link>

    </div>
  )
}
