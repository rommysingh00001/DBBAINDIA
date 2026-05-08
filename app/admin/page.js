'use client'

import { useEffect,useState } from 'react'
import '../globals.css'
import { supabase } from '../../lib/supabase'

export default function AdminPage(){

const [users,setUsers] = useState([])
const [bets,setBets] = useState([])
const [results,setResults] = useState([])
const [transactions,setTransactions] = useState([])
const [winningNumber,setWinningNumber] = useState('')
const [liveUsers,setLiveUsers] = useState(0)

useEffect(()=>{

fetchAllData()

setInterval(()=>{

setLiveUsers(
Math.floor(Math.random()*500)+500
)

},3000)

},[])

async function fetchAllData(){

const { data:userData } =
await supabase
.from('users')
.select('*')

if(userData){
setUsers(userData)
}

const { data:betData } =
await supabase
.from('bets')
.select('*')
.order('id',{ ascending:false })

if(betData){
setBets(betData)
}

const { data:resultData } =
await supabase
.from('results')
.select('*')
.order('id',{ ascending:false })
.limit(20)

if(resultData){
setResults(resultData)
}

const { data:transactionData } =
await supabase
.from('transactions')
.select('*')
.order('id',{ ascending:false })

if(transactionData){
setTransactions(transactionData)
}

}

async function declareResult(){

const validNumbers =
Array.from(
{ length:100 },
(_,i)=>
i.toString().padStart(2,'0')
)

if(
!validNumbers.includes(
winningNumber
)
){
alert('Only 00-99 Allowed')
return
}

await supabase
.from('results')
.insert([
{
winning_number:winningNumber
}
])

alert(
`Result ${winningNumber} Declared`
)

setWinningNumber('')

fetchAllData()

}

async function approveRequest(item){

const { data:user } =
await supabase
.from('users')
.select('*')
.eq('id',item.user_id)
.single()

if(!user) return

let updatedWallet =
Number(user.wallet)

if(item.type === 'deposit'){

updatedWallet +=
Number(item.amount)

}else{

updatedWallet -=
Number(item.amount)

}

await supabase
.from('users')
.update({
wallet:updatedWallet
})
.eq('id',user.id)

await supabase
.from('transactions')
.update({
status:'approved'
})
.eq('id',item.id)

alert('Approved')

fetchAllData()

}

return(

<main className="adminMain">

<h1 className="adminTitle">
DBBA INDIA ADMIN
</h1>

<div className="liveTicker">

<div className="liveDot"></div>

LIVE USERS :
{liveUsers}

</div>

<div className="adminStats">

<div className="statCard">

<h3>
TOTAL USERS
</h3>

<h1>
{users.length}
</h1>

</div>

<div className="statCard">

<h3>
TOTAL BETS
</h3>

<h1>
{bets.length}
</h1>

</div>

<div className="statCard">

<h3>
RESULTS
</h3>

<h1>
{results.length}
</h1>

</div>

<div className="statCard">

<h3>
REQUESTS
</h3>

<h1>
{transactions.length}
</h1>

</div>

</div>

<div className="adminGrid">

<div className="leftAdmin">

<div className="adminCard">

<h2>
Declare Result
</h2>

<input
placeholder="00-99"
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

Declare Result

</button>

</div>

<div className="adminCard">

<h2>
Recent Results
</h2>

<div className="resultsWrap">

{
results.map((r)=>(

<div
className="resultBall"
key={r.id}
>

{r.winning_number}

</div>

))
}

</div>

</div>

<div className="adminCard">

<h2>
Deposit / Withdraw
</h2>

{
transactions.map((t)=>(

<div
className="transactionRow"
key={t.id}
>

<div>

<h3>
{t.type}
</h3>

<p>
₹ {t.amount}
</p>

<p>
{t.status}
</p>

</div>

<button
onClick={()=>
approveRequest(t)
}
>

Approve

</button>

</div>

))
}

</div>

</div>

<div className="rightAdmin">

<div className="adminCard">

<h2>
All Users Wallet
</h2>

{
users.map((u)=>(

<div
className="userRow"
key={u.id}
>

<div>

<h3>
{u.name}
</h3>

<p>
{u.email}
</p>

</div>

<h2>
₹ {u.wallet}
</h2>

</div>

))
}

</div>

<div className="adminCard">

<h2>
All Bets Record
</h2>

{
bets.map((bet)=>(

<div
className="betRowAdmin"
key={bet.id}
>

<div>

<h3>
Number :
{bet.number}
</h3>

<p>
₹ {bet.amount}
</p>

<p>
User :
{bet.user_id}
</p>

</div>

<div
className={
bet.status === 'won'
? 'winStatus'
:
bet.status === 'lost'
? 'lossStatus'
:
'pendingStatus'
}
>

{bet.status}

</div>

</div>

))
}

</div>

</div>

</div>

</main>

)

}
