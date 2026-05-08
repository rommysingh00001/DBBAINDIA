'use client'

import '../globals.css'
import { useRouter } from 'next/navigation'

export default function Signup() {

  const router = useRouter()

  return (

    <main className="loginPage">

      <div className="loginBox">

        <h1>Create Account</h1>

        <input placeholder="Name" />

        <input placeholder="Mobile" />

        <input
          placeholder="Password"
          type="password"
        />

        <button
          onClick={() =>
            router.push('/')
          }
        >
          Signup
        </button>

      </div>

    </main>
  )
}
