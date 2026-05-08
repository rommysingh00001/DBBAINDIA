'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import '../globals.css'

export default function Signup() {

  const router = useRouter()

  const [name, setName] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [phone, setPhone] =
    useState('')

  const [password, setPassword] =
    useState('')

  async function signup() {

    await supabase
    .from('users')
    .insert([
      {
        name,
        email,
        phone,
        password,
        wallet:1000
      }
    ])

    alert('Signup Successful')

    router.push('/')
  }

  return (

    <main className="authPage">

      <div className="authBox">

        <h1>Create Account</h1>

        <input
          placeholder="Name"
          value={name}
          onChange={(e)=>
            setName(e.target.value)
          }
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e)=>
            setPhone(e.target.value)
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

        <button onClick={signup}>
          Signup
        </button>

      </div>

    </main>
  )
}
