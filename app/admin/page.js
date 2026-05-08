'use client'

import { useEffect,useState } from 'react'
import '../globals.css'
import { supabase } from '../../lib/supabase'

export default function AdminPage(){

const [users,setUsers] = useState([])
const [bets,setBets] = useState([])
const [results,setResults] = useState([])
const [transactions,setTransactions] = useState([])

const [winningNumber,setWinningNumber] =
useState('')

const [totalCollection,setTotalCollection] =
useState(0)

const [totalPayout,setTotalPayout] =
useState(0)

const [liveUsers,setLiveUsers] =
useState(0)

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

const collection =
betData.reduce(
(total,item)=>
total + Number(item.amount),
0
)

setTotalCollection(collection)

}

const { data:resultData } =
await supabase
.from('results')
.select('*')
.order('id',{ ascending:false })

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

alert(
'Only 00 to 99 allowed'
)

return

}

await supabase
.from('results')
.insert([
{
winning_number:winningNumber
}
])

let payout = 0

for(const bet of bets){

if(bet.status === 'pending'){

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

payout += reward

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

setTotalPayout(payout)

alert(
`Result ${winningNumber} Declared`
)

setWinningNumber('')

fetchAllData()

}

async function approveRequest(item){

if(item.status !== 'pending'){

alert('Already Approved')

return

}

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

alert('Request Approved')

fetchAllData()

}

async function rejectRequest(item){

await supabase
.from('transactions')
.update({
status:'rejected'
})
.eq('id',item.id)

alert('Request Rejected')

fetchAllData()

}

async function resetUserWallet(userId){

const amount =
prompt(
'Enter New Wallet Amount'
)

if(!amount) return

await supabase
.from('users')
.update({
wallet:Number(amount)
})
.eq('id',userId)

alert('Wallet Updated')

fetchAllData()

}

return(

<main className="adminMain">

<h1 className="adminTitle">
DBBA INDIA ADMIN PANEL
</h1>

<div className="liveTicker">

<div className="liveDot"></div>

LIVE USERS :
{liveUsers}

</div>

<div className="adminStats">

<div className="statCard">

<h3>
Total Users
</h3>

<h1>
{users.length}
</h1>

</div>

<div className="statCard">

<h3>
Total Collection
</h3>

<h1>
₹ {totalCollection}
</h1>

</div>

<div className="statCard">

<h3>
Total Payout
</h3>

<h1>
₹ {totalPayout}
</h1>

</div>

<div className="statCard">

<h3>
Total Bets
</h3>

<h1>
{bets.length}
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
placeholder="00 to 99"
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
Deposit / Withdraw Requests
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

<div
style={{
display:'flex',
gap:'10px'
}}
>

<button
onClick={()=>
approveRequest(t)
}
>

Approve

</button>

<button
onClick={()=>
rejectRequest(t)
}
style={{
background:'red',
color:'white'
}}
>

Reject

</button>

</div>

</div>

))
}

</div>

</div>

<div className="rightAdmin">

<div className="adminCard">

<h2>
All Users Wallet Control
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

<div
style={{
display:'flex',
alignItems:'center',
gap:'10px'
}}
>

<h2>
₹ {u.wallet}
</h2>

<button
onClick={()=>
resetUserWallet(u.id)
}
>

Edit

</button>

</div>

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
className="betRow"
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
: bet.status === 'lost'
? 'lossStatus'
: 'pendingStatus'
}
>

{bet.status}

</div>

</div>

))
}

</div>

<div className="adminCard">

<h2>
Number Wise Report
</h2>

{
Array.from(
{ length:100 },
(_,i)=>
i.toString().padStart(2,'0')
).map((num)=>{

const total =
bets
.filter(
(b)=>
b.number === num
)
.reduce(
(sum,b)=>
sum + Number(b.amount),
0
)

return(

<div
className="betRow"
key={num}
>

<h3>
Number {num}
</h3>

<h2>
₹ {total}
</h2>

</div>

)

})
}

</div>

</div>

</div>

</main>

)

}
