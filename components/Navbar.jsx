'use client'

import Link from 'next/link'

export default function Navbar() {

  return (

    <div className="navbar">

      <div>

        <h1 className="logo">
          DBBA INDIA
        </h1>

        <p className="subLogo">
          Virtual Number Selection Platform
        </p>

      </div>

      <div className="navRight">

        <div className="walletBox">
          ₹ 25,000
        </div>

        <Link href="/">
          <button className="loginBtn">
            Login
          </button>
        </Link>

      </div>

    </div>
  )
}
