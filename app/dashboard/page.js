'use client'

import { useEffect,useState }
from 'react'

import '../globals.css'

import { supabase }
from '../../lib/supabase'

import Navbar
from '../../components/Navbar'

export default function Dashboard(){

const [user,setUser] =
useState(null)

const [selected,setSelected] =
useState('')

const [amount,setAmount] =
useState('')

const [myBets,setMyBets] =
useState([])

const [results,setResults] =
useState([])

const [loading,setLoading] =
useState(false)

const numbers =
Array.from(
{ length:100 },
(_,i)=>
i.toString()
.padStart(2,'0')
)

useEffect(()=>{

const localUser =
localStorage.getItem(
'dbbaUser'
)

if(localUser){

const parsed =
JSON.parse(localUser)

setUser(parsed)

refreshWallet(parsed.id)

fetchMyBets(parsed.id)

fetchResults()
}

const walletChannel =
supabase.channel(
'wallet-realtime'
)

walletChannel.on(
'postgres_changes',
{
event:'UPDATE',
schema:'public',
table:'users'
},
(payload)=>{

if(
payload.new.id === user?.id
){

setUser(payload.new)

localStorage.setItem(
'dbbaUser',
JSON.stringify(payload.new)
)
}
}
)

.subscribe()

let seconds = 59

setInterval(()=>{

const timer =
document.getElementById(
'timer'
)

if(timer){

if(seconds < 10){

timer.innerText =
`00:0${seconds}`

}else{

timer.innerText =
`00:${seconds}`
}

seconds--

if(seconds < 0){

seconds = 59
}
}

},1000)

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

async function fetchResults(){

const { data } =
await supabase
.from('results')
.select('*')
.order('id',
{ ascending:false })
.limit(20)

if(data){

setResults(data)
}
}

async function placeBet(){

if(!selected){

alert(
'Select Number'
)

return
}

if(!amount){

alert(
'Enter Amount'
)

return
}

if(
Number(amount)
>
Number(user.wallet)
){

alert(
'Low Wallet Balance'
)

return
}

setLoading(true)

const updatedWallet =
Number(user.wallet)
- Number(amount)

await supabase
.from('users')
.update({
wallet:updatedWallet
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

setLoading(false)

alert(
`Bet placed on ${selected}`
)

setAmount('')

refreshWallet(user.id)

fetchMyBets(user.id)
}

return(

<main className="premiumDashboard">

<div className="topHeader">

<div>

<h1 className="mainLogo">
DBBA INDIA
</h1>

<p className="tagline">
India's Premium Virtual Platform
</p>

</div>

<div className="walletCard">

<span>
Wallet Balance
</span>

<h1>
₹ {user?.wallet || 0}
</h1>

</div>

</div>

<div className="liveTicker">

<div className="liveDot"></div>

LIVE PLAYERS :
{
Math.floor(
Math.random() * 500
)
+ 500
}

</div>

<div className="dashboardGrid">

<div className="leftPanel">

<div className="timerCard">

<h2>
NEXT RESULT
</h2>

<h1 id="timer">
00:59
</h1>

</div>

<div className="bettingCard">

<h2>
Select Number
</h2>

<div className="selectedBox">

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

<div className="amountBox">

<input
type="number"
placeholder="Enter Amount"

value={amount}

onChange={(e)=>
setAmount(
e.target.value
)
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

</div>

<div className="rightPanel">

<div className="historyCard">

<h2>
Recent Results
</h2>

<div className="resultList">

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

<div className="betsCard">

<h2>
My Bets
</h2>

{
myBets.map((bet)=>(

<div
className="betRow"
key={bet.id}
>

<div>

<h3>
{bet.number}
</h3>

<p>
₹ {bet.amount}
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

<Navbar/>

</main>

)

}
