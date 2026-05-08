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

  const [time, setTime] =
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

    updateClock()

    setInterval(updateClock,1000)

  },[])

  function updateClock(){

    const now =
      new Date()

    setTime(
      now.toLocaleTimeString()
    )
  }

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
      `Bet placed on ${selected}`
    )
  }

  return (

    <main className="mainDashboard">

      <div className="topbar">

        <div>

          <h1 className="logo">
            DBBA INDIA
          </h1>

          <p className="welcome">
            Welcome,
            {user?.name}
          </p>

        </div>

        <div className="walletBox">

          <span>
            Wallet
          </span>

          <h2>
            ₹ {user?.wallet || 0}
          </h2>

        </div>

      </div>

      <div className="heroBanner">

        <div>

          <h1>
            WIN 90X
          </h1>

          <p>
            India’s Premium
            Virtual Betting Platform
          </p>

        </div>

        <div className="liveTime">

          {time}

        </div>

      </div>

      <div className="dashboardCards">

        <div className="dashCard">

          <h3>
            Today's Result
          </h3>

          <h1>
            58
          </h1>

        </div>

        <div className="dashCard">

          <h3>
            Your Bets
          </h3>

          <h1>
            12
          </h1>

        </div>

        <div className="dashCard">

          <h3>
            Winning Chance
          </h3>

          <h1>
            90X
          </h1>

        </div>

      </div>

      <div className="betSection">

        <h2>
          Select Number
        </h2>

        <div className="selectedNumber">

          {selected || '--'}

        </div>

        <div className="numberGrid">

          {
            numbers.map((num)=>(

              <button
                key={num}

                className={
                  selected === num
                  ? 'activeNumber'
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

        <div className="betControls">

          <input
            type="number"
            placeholder="Enter Bet Amount"

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

      </div>

      <div className="bottomMenu">

        <button>
          Home
        </button>

        <button>
          Wallet
        </button>

        <button>
          Results
        </button>

        <button>
          My Bets
        </button>

      </div>

    </main>
  )
}
