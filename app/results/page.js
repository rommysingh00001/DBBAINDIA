'use client'

import { useEffect,useState }
from 'react'

import '../../app/globals.css'

import { supabase }
from '../../lib/supabase'

import Navbar
from '../../components/Navbar'

export default function Results(){

  const [results,setResults] =
    useState([])

  useEffect(()=>{

    fetchResults()

  },[])

  async function fetchResults(){

    const { data } =
      await supabase
      .from('results')
      .select('*')
      .order('id',
        { ascending:false })

    if(data){

      setResults(data)
    }
  }

  return(

    <main className="pageContainer">

      <h1 className="pageTitle">
        Result History
      </h1>

      {
        results.map((item)=>(

          <div
            key={item.id}
            className="resultCard"
          >

            <h2>
              {item.winning_number}
            </h2>

            <p>
              {
                new Date(
                  item.created_at
                ).toLocaleString()
              }
            </p>

          </div>

        ))
      }

      <Navbar/>

    </main>
  )
}
