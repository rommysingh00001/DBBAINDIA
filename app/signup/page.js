'use client';

import {
  useState
} from 'react';

import {
  useRouter
} from 'next/navigation';

import {
  supabase
} from '../../lib/supabase';

import '../globals.css';

export default function Signup() {

  const router =
    useRouter();

  const [name,setName] =
    useState('');

  const [mobile,setMobile] =
    useState('');

  const [password,setPassword] =
    useState('');

  const signup = async ()=>{

    await supabase
      .from('users')
      .insert([
        {
          name,
          mobile,
          password,
          wallet:0
        }
      ]);

    alert('Signup Success');

    router.push('/');
  };

  return (

    <main className="authPage">

      <div className="authCard">

        <h1>SIGNUP</h1>

        <input
          placeholder="Name"

          value={name}

          onChange={(e)=>
            setName(e.target.value)
          }
        />

        <input
          placeholder="Mobile"

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

        <button onClick={signup}>
          SIGNUP
        </button>

      </div>

    </main>
  );
}
