'use client'

import '../globals.css'

export default function Admin(){

  return(

    <main className="adminPage">

      <h1>
        ADMIN PANEL
      </h1>

      <div className="adminGrid">

        <div className="card">
          Total Users
        </div>

        <div className="card">
          Total Bets
        </div>

        <div className="card">
          Winning Number
        </div>

      </div>

      <input
        placeholder="Declare Winning Number"
      />

      <button>
        Declare Result
      </button>

    </main>
  )
}
