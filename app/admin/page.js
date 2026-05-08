'use client'

import { useEffect, useState }
from 'react'

import '../globals.css'

import { supabase }
from '../../lib/supabase'

export default function AdminPage(){

  const [winningNumber,
    setWinningNumber] =
    useState('')

  const [bets,setBets] =
    useState([])

  const [users,setUsers] =
    useState([])

  const [results,setResults] =
    useState([])

  const [loading,setLoading] =
    useState(false)

  useEffect(()=>{

    fetchData()

  },[])

  async function fetchData(){

    const {
      data:betData
    } = await supabase
    .from('bets')
    .select('*')
    .order('id',
      { ascending:false })

    if(betData){

      setBets(betData)
    }

    const {
      data:userData
    } = await supabase
    .from('users')
    .select('*')

    if(userData){

      setUsers(userData)
    }

    const {
      data:resultData
    } = await supabase
    .from('results')
    .select('*')
    .order('id',
      { ascending:false })

    if(resultData){

      setResults(resultData)
    }
  }

  async function declareResult(){

    if(!winningNumber){

      alert(
        'Enter Winning Number'
      )

      return
    }

    setLoading(true)

    await supabase
    .from('results')
    .insert([
      {
        winning_number:
        winningNumber
      }
    ])

    const pendingBets =
      bets.filter(
        (bet)=>
        bet.status === 'pending'
      )

    for(const bet of pendingBets){

      if(
        bet.number === winningNumber
      ){

        const user =
          users.find(
            (u)=>
            u.id === bet.user_id
          )

        if(user){

          const reward =
            Number(bet.amount) * 90

          const updatedWallet =
            Number(user.wallet)
            + reward

          await supabase
          .from('users')
          .update({
            wallet:updatedWallet
          })
          .eq('id',user.id)

          await supabase
          .from('bets')
          .update({
            status:'won'
          })
          .eq('id',bet.id)

        }

      }else{

        await supabase
        .from('bets')
        .update({
          status:'lost'
        })
        .eq('id',bet.id)

      }

    }

    alert(
      `Winning Number ${winningNumber} Declared`
    )

    setWinningNumber('')

    fetchData()

    setLoading(false)
  }

  const totalBetAmount =
    bets.reduce(
      (sum,bet)=>
      sum + Number(bet.amount),
      0
    )

  return(

    <main className="adminPage">

      <h1 className="adminTitle">
        DBBA ADMIN PANEL
      </h1>

      <div className="adminGrid">

        <div className="adminCard">

          <h3>
            Total Users
          </h3>

          <h1>
            {users.length}
          </h1>

        </div>

        <div className="adminCard">

          <h3>
            Total Bets
          </h3>

          <h1>
            {bets.length}
          </h1>

        </div>

        <div className="adminCard">

          <h3>
            Total Collection
          </h3>

          <h1>
            ₹ {totalBetAmount}
          </h1>

        </div>

      </div>

      <div className="resultPanel">

        <input
          type="text"
          placeholder="Winning Number"

          value={winningNumber}

          onChange={(e)=>
            setWinningNumber(
              e.target.value
            )
          }
        />

        <button
          onClick={declareResult}
        >
          {
            loading
            ? 'Processing...'
            : 'Declare Result'
          }
        </button>

      </div>

      <div className="tableBox">

        <h2>
          User Bets
        </h2>

        {
          bets.map((bet)=>(

            <div
              key={bet.id}
              className="tableRow"
            >

              <div>
                #{bet.number}
              </div>

              <div>
                ₹ {bet.amount}
              </div>

              <div>
                {bet.status}
              </div>

            </div>

          ))
        }

      </div>

      <div className="tableBox">

        <h2>
          Result History
        </h2>

        {
          results.map((result)=>(

            <div
              key={result.id}
              className="tableRow"
            >

              <div>
                Winning No.
              </div>

              <div>
                {result.winning_number}
              </div>

              <div>
                {
                  new Date(
                    result.created_at
                  ).toLocaleString()
                }
              </div>

            </div>

          ))
        }

      </div>

    </main>
  )
}
const [transactions,
setTransactions] =
useState([])

async function fetchTransactions(){

const { data } =
await supabase
.from('transactions')
.select('*')
.order('id',
{ ascending:false })

if(data){

setTransactions(data)
}
}
