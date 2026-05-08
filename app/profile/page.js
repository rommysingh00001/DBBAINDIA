'use client'

import { useEffect,useState }
from 'react'

import { useRouter }
from 'next/navigation'

import '../../app/globals.css'

import Navbar
from '../../components/Navbar'

export default function Profile(){

  const router = useRouter()

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

  function logout(){

  localStorage.removeItem(
    'dbbaUser'
  )

  document.cookie =
  'dbba-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

  router.push('/')
}

  return(

    <main className="pageContainer">

      <h1 className="pageTitle">
        My Profile
      </h1>

      <div className="profileCard">

        <h2>
          {user?.name}
        </h2>

        <p>
          {user?.email}
        </p>

        <p>
          {user?.phone}
        </p>

        <button
          onClick={logout}
        >
          Logout
        </button>

      </div>

      <Navbar/>

    </main>
  )
}
