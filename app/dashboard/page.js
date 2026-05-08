'use client'

import { useEffect, useState }
from 'react'

import '../globals.css'

import { supabase }
from '../../lib/supabase'

export default function Dashboard(){

  const [user,setUser] =
    useState(null)

  const [selected,setSelected] =
    useState('')

  const [amount,setAmount] =
    useState('')

  const [loading,setLoading] =
    useState(false)

  const [myBets,setMyBets] =
    useState([])

  useEffect(()=>{

    const localUser =
      localStorage.getItem(
        'dbbaUser'
      )

    if(localUser){

      const parsed =
        JSON.parse(localUser)

      setUser(parsed)

      fetchMyBets(parsed.id)

      refreshWallet(parsed.id)
    }

  },[])

  async function refreshWallet(id){

    const { data } =
      await supabase
      .from('users')
      .select('*')
      .eq('id',id)
      .single()

    if(data){

      setUser(data)

      localStorage.setItem(
        'dbbaUser',
        JSON.stringify(data)
      )
    }
  }

  async function fetchMyBets(id){

    const { data } =
      await supabase
      .from('bets')
      .select('*')
      .eq('user_id',id)
      .order('id',
        { ascending:false })

    if(data){

      setMyBets(data)
    }
  }

  const numbers =
    Array.from(
      { length:100 },
      (_,i)=>
        i.toString()
        .padStart(2,'0')
    )

  async function placeBet(){

    if(!selected){

      alert('Select Number')

      return
    }

    if(!amount){

      alert('Enter Amount')

      return
    }

    if(Number(amount) <= 0){

      alert('Invalid Amount')

      return
    }

    if(
      Number(amount)
      >
      Number(user.wallet)
    ){

      alert(
        'Insufficient Wallet Balance'
      )

      return
    }

    setLoading(true)

    const newWallet =
      Number(user.wallet)
      - Number(amount)

    await supabase
    .from('users')
    .update({
      wallet:newWallet
    })
    .eq('id',user.id)

    await supabase
    .from('bets')
    .insert([
      {
        user_id:user.id,
        number:selected,
        amount:Number(amount),
        status:'pending'
      }
    ])

    alert(
      `Bet placed on ${selected}`
    )

    setAmount('')

    refreshWallet(user.id)

    fetchMyBets(user.id)

    setLoading(false)
  }

  async function cancelBet(bet){

    if(
      bet.status !== 'pending'
    ){

      alert(
        'Cannot cancel'
      )

      return
    }

    const updatedWallet =
      Number(user.wallet)
      + Number(bet.amount)

    await supabase
    .from('users')
    .update({
      wallet:updatedWallet
    })
    .eq('id',user.id)

    await supabase
    .from('bets')
    .delete()
    .eq('id',bet.id)

    refreshWallet(user.id)

    fetchMyBets(user.id)

    alert('Bet Cancelled')
  }

  return(

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
            {
              loading
              ? 'Processing...'
              : 'Place Bet'
            }
          </button>

        </div>

      </div>

      <div className="myBets">

        <h2>
          My Bets
        </h2>

        {
          myBets.map((bet)=>(

            <div
              className="betCard"
              key={bet.id}
            >

              <div>

                <h3>
                  Number :
                  {bet.number}
                </h3>

                <p>
                  Amount :
                  ₹ {bet.amount}
                </p>

                <p>
                  Status :
                  {bet.status}
                </p>

              </div>

              <button
                onClick={()=>
                  cancelBet(bet)
                }
              >
                Cancel
              </button>

            </div>

          ))
        }

      </div>

    </main>
  )
}
