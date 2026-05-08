'use client'

import { useEffect, useState }
from 'react'

import '../globals.css'

export default function Dashboard() {

  const [user, setUser] =
    useState(null)

  const [selected, setSelected] =
    useState('')

  const [amount, setAmount] =
    useState('')

  useEffect(()=>{

    const data =
      localStorage.getItem(
        'dbbaUser'
      )

    if(data){

      setUser(
        JSON.parse(data)
      )
    }

  },[])

  const numbers =
    Array.from(
      { length:100 },
      (_,i)=>
        i.toString()
        .padStart(2,'0')
    )

  function placeBet(){

    if(!selected){

      alert('Select Number')

      return
    }

    if(!amount){

      alert('Enter Amount')

      return
    }

    alert(
      `Bet Placed On ${selected}`
    )
  }

  return (

    <main className="dashboard">

      <div className="navbar">

        <h1>DBBA INDIA</h1>

        <div className="wallet">

          ₹ {user?.wallet || 0}

        </div>

      </div>

      <div className="hero">

        <h1>
          Win 90x Rewards
        </h1>

      </div>

      <div className="selectedBox">

        Selected Number:
        {selected || '--'}

      </div>

      <div className="numberGrid">

        {
          numbers.map((num)=>(

            <button
              key={num}

              className={
                selected === num
                ? 'active'
                : ''
              }

              onClick={()=>
                setSelected(num)
              }
            >
              {num}
            </button>

          ))
        }

      </div>

      <div className="betBox">

        <input
          type="number"
          placeholder="Bet Amount"

          value={amount}

          onChange={(e)=>
            setAmount(e.target.value)
          }
        />

        <button
          onClick={placeBet}
        >
          Place Bet
        </button>

      </div>

    </main>
  )
}
