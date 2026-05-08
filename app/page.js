'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'
import './globals.css'

export default function Home() {

  const router = useRouter()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  async function login() {

    const { data } =
      await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single()

    if (!data) {

      alert('Invalid Login')

      return
    }

    localStorage.setItem(
      'dbbaUser',
      JSON.stringify(data)
    )

    router.push('/dashboard')
  }

  return (

    <main className="authPage">

      <div className="authBox">

        <h1>DBBA INDIA</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
        />

        <button onClick={login}>
          Login
        </button>

        <button
          onClick={()=>
            router.push('/signup')
          }
        >
          Signup
        </button>

      </div>

    </main>
  )
}
