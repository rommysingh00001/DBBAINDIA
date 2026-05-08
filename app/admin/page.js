'use client'

import { useEffect,useState }
from 'react'

import '../globals.css'

import { supabase }
from '../../lib/supabase'

export default function AdminPage(){

  const [users,setUsers] =
    useState([])

  const [bets,setBets] =
    useState([])

  const [search,setSearch] =
    useState('')

  const [walletAmount,
  setWalletAmount] =
    useState('')

  const [selectedUser,
  setSelectedUser] =
    useState(null)

  const [results,setResults] =
    useState([])

  const [winningNumber,
  setWinningNumber] =
    useState('')

  useEffect(()=>{

    fetchAllData()

  },[])

  async function fetchAllData(){

    const { data:userData } =
      await supabase
      .from('users')
      .select('*')
      .order('id',
        { ascending:false })

    if(userData){

      setUsers(userData)
    }

    const { data:betData } =
      await supabase
      .from('bets')
      .select('*')
      .order('id',
        { ascending:false })

    if(betData){

      setBets(betData)
    }

    const { data:resultData } =
      await supabase
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

    await supabase
    .from('results')
    .insert([
      {
        winning_number:
        winningNumber
      }
    ])

    for(const bet of bets){

      if(
        bet.status === 'pending'
      ){

        if(
          bet.number ===
          winningNumber
        ){

          const user =
            users.find(
              (u)=>
              u.id === bet.user_id
            )

          if(user){

            const reward =
              Number(bet.amount)
              * 90

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

    }

    alert(
      `Result ${winningNumber} Declared`
    )

    setWinningNumber('')

    fetchAllData()
  }

  async function updateWallet(){

    if(!selectedUser){

      alert('Select User')

      return
    }

    const updatedWallet =
      Number(selectedUser.wallet)
      + Number(walletAmount)

    await supabase
    .from('users')
    .update({
      wallet:updatedWallet
    })
    .eq('id',selectedUser.id)

    alert('Wallet Updated')

    setWalletAmount('')

    fetchAllData()
  }

  async function banUser(user){

    await supabase
    .from('users')
    .update({
      banned:true
    })
    .eq('id',user.id)

    alert('User Banned')

    fetchAllData()
  }

  async function unbanUser(user){

    await supabase
    .from('users')
    .update({
      banned:false
    })
    .eq('id',user.id)

    alert('User Unbanned')

    fetchAllData()
  }

  const filteredUsers =
    users.filter((u)=>

      u.name
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )

    )

  const totalCollection =
    bets.reduce(
      (sum,bet)=>
      sum + Number(bet.amount),
      0
    )

  const totalUsers =
    users.length

  const totalBets =
    bets.length

  const totalWon =
    bets.filter(
      (b)=>
      b.status === 'won'
    ).length

  return(

    <main className="adminPage">

      <h1 className="adminMainTitle">
        DBBA INDIA ADMIN
      </h1>

      <div className="analyticsGrid">

        <div className="analyticsCard">

          <h3>
            Total Users
          </h3>

          <h1>
            {totalUsers}
          </h1>

        </div>

        <div className="analyticsCard">

          <h3>
            Total Bets
          </h3>

          <h1>
            {totalBets}
          </h1>

        </div>

        <div className="analyticsCard">

          <h3>
            Total Collection
          </h3>

          <h1>
            ₹ {totalCollection}
          </h1>

        </div>

        <div className="analyticsCard">

          <h3>
            Winners
          </h3>

          <h1>
            {totalWon}
          </h1>

        </div>

      </div>

      <div className="adminBox">

        <h2>
          Declare Result
        </h2>

        <div className="actionRow">

          <input
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
            Declare
          </button>

        </div>

      </div>

      <div className="adminBox">

        <h2>
          Search User
        </h2>

        <input
          placeholder="Search by name"

          value={search}

          onChange={(e)=>
            setSearch(e.target.value)
          }
        />

      </div>

      <div className="adminBox">

        <h2>
          Wallet Control
        </h2>

        <select
          onChange={(e)=>{

            const found =
              users.find(
                (u)=>
                u.id ==
                e.target.value
              )

            setSelectedUser(found)
          }}
        >

          <option>
            Select User
          </option>

          {
            users.map((u)=>(

              <option
                value={u.id}
                key={u.id}
              >
                {u.name}
              </option>

            ))
          }

        </select>

        <div className="actionRow">

          <input
            type="number"
            placeholder="Wallet Amount"

            value={walletAmount}

            onChange={(e)=>
              setWalletAmount(
                e.target.value
              )
            }
          />

          <button
            onClick={updateWallet}
          >
            Update Wallet
          </button>

        </div>

      </div>

      <div className="adminBox">

        <h2>
          Users
        </h2>

        {
          filteredUsers.map((u)=>(

            <div
              className="userCard"
              key={u.id}
            >

              <div>

                <h3>
                  {u.name}
                </h3>

                <p>
                  {u.email}
                </p>

                <p>
                  Wallet :
                  ₹ {u.wallet}
                </p>

              </div>

              <div className="userBtns">

                {
                  u.banned
                  ?

                  <button
                    onClick={()=>
                      unbanUser(u)
                    }
                  >
                    Unban
                  </button>

                  :

                  <button
                    onClick={()=>
                      banUser(u)
                    }
                  >
                    Ban
                  </button>

                }

              </div>

            </div>

          ))
        }

      </div>

      <div className="adminBox">

        <h2>
          Result History
        </h2>

        {
          results.map((r)=>(

            <div
              className="resultRow"
              key={r.id}
            >

              <h3>
                {r.winning_number}
              </h3>

              <p>
                {
                  new Date(
                    r.created_at
                  ).toLocaleString()
                }
              </p>

            </div>

          ))
        }

      </div>

    </main>
  )
}
