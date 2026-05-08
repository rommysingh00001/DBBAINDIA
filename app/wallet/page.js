'use client'

import { useEffect,useState }
from 'react'

import '../../app/globals.css'

import Navbar
from '../../components/Navbar'

export default function Wallet(){

  const [user,setUser] =
    useState(null)

  useEffect(()=>{

    const localUser =
      localStorage.getItem(
        'dbbaUser'
      )

    if(localUser){

      setUser(
        JSON.parse(localUser)
      )
    }

  },[])

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

      <div className="walletBtns">

        <button>
          Deposit
        </button>

        <button>
          Withdraw
        </button>

      </div>

      <Navbar/>

    </main>
  )
}
