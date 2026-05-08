'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import './globals.css';

export default function Home() {

  const router = useRouter();

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {

    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('mobile', mobile)
      .eq('password', password)
      .single();

    if (!data) {
      alert('Invalid Login');
      return;
    }

    localStorage.setItem(
      'dbbaUser',
      JSON.stringify(data)
    );

    router.push('/dashboard');
  };

  return (

    <main className="loginPage">

      <div className="loginCard">

        <h1>DBBA INDIA</h1>

        <p>Login To Continue</p>

        <input
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e)=>
            setMobile(e.target.value)
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
          LOGIN
        </button>

      </div>

    </main>
  );
}
