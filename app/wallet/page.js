'use client'

import { useEffect,useState }
from 'react'

import '../../app/globals.css'

import Navbar
from '../../components/Navbar'

import { supabase }
from '../../lib/supabase'

export default function Wallet(){

  const [user,setUser] =
    useState(null)

  const [amount,setAmount] =
    useState('')

  const [type,setType] =
    useState('deposit')

  const [history,setHistory] =
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

      fetchHistory(parsed.id)
    }

  },[])

  async function fetchHistory(id){

    const { data } =
      await supabase
      .from('transactions')
      .select('*')
      .eq('user_id',id)
      .order('id',
        { ascending:false })

    if(data){

      setHistory(data)
    }
  }

  async function submitRequest(){

    if(!amount){

      alert('Enter Amount')

      return
    }

    await supabase
    .from('transactions')
    .insert([
      {
        user_id:user.id,
        amount:Number(amount),
        type:type,
        status:'pending'
      }
    ])

    alert(
      `${type} request submitted`
    )

    setAmount('')

    fetchHistory(user.id)
  }

  return(

    <main className="pageContainer">

      <h1 className="pageTitle">
        Wallet
      </h1>

      <div className="walletBigCard">

        <h2>
          ₹ {user?.wallet || 0}
        </h2>

        <p>
          Available Balance
        </p>

      </div>

      <div className="moneyPanel">

        <select
          value={type}

          onChange={(e)=>
            setType(e.target.value)
          }
        >

          <option value="deposit">
            Deposit
          </option>

          <option value="withdraw">
            Withdraw
          </option>

        </select>

        <input
          type="number"
          placeholder="Enter Amount"

          value={amount}

          onChange={(e)=>
            setAmount(e.target.value)
          }
        />

        <button
          onClick={submitRequest}
        >
          Submit Request
        </button>

      </div>

      <div className="historyBox">

        <h2>
          Transaction History
        </h2>

        {
          history.map((item)=>(

            <div
              key={item.id}
              className="historyCard"
            >

              <div>

                <h3>
                  {item.type}
                </h3>

                <p>
                  ₹ {item.amount}
                </p>

              </div>

              <div>

                <span>
                  {item.status}
                </span>

              </div>

            </div>

          ))
        }

      </div>

      <Navbar/>

    </main>
  )
}
