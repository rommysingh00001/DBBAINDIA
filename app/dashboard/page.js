'use client'

import { useRouter } from 'next/navigation'
import './globals.css'

export default function Home() {

  const router = useRouter()

  return (

    <main className="loginPage">

      <div className="loginBox">

        <h1>DBBA INDIA</h1>

        <input placeholder="Mobile" />

        <input
          placeholder="Password"
          type="password"
        />

        <button
          onClick={() =>
            router.push('/dashboard')
          }
        >
          Login
        </button>

        <button
          onClick={() =>
            router.push('/signup')
          }
        >
          Signup
        </button>

      </div>

    </main>
  )
}
