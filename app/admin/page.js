"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {

const [users,setUsers] = useState([]);
const [bets,setBets] = useState([]);
const [results,setResults] = useState([]);
const [requests,setRequests] = useState([]);
const [winningNumber,setWinningNumber] = useState("");

useEffect(()=>{

loadData();

const interval = setInterval(()=>{
loadData();
},5000);

return ()=> clearInterval(interval);

},[]);

async function loadData(){

const { data:usersData } =
await supabase
.from("users")
.select("*");

const { data:betsData } =
await supabase
.from("bets")
.select("*")
.order("created_at",{ascending:false});

const { data:resultsData } =
await supabase
.from("results")
.select("*")
.order("created_at",{ascending:false});

const { data:requestsData } =
await supabase
.from("requests")
.select("*")
.order("created_at",{ascending:false});

setUsers(usersData || []);
setBets(betsData || []);
setResults(resultsData || []);
setRequests(requestsData || []);

}

const totalBetAmount = useMemo(()=>{

return bets.reduce(
(acc,item)=>
acc + Number(item.amount || 0),
0
);

},[bets]);

const numberReport = useMemo(()=>{

let report = {};

for(let i=0;i<=99;i++){

const num =
String(i).padStart(2,"0");

report[num] = 0;

}

bets.forEach((bet)=>{

const num =
String(bet.number)
.padStart(2,"0");

report[num] +=
Number(bet.amount || 0);

});

return Object.entries(report)
.sort((a,b)=>a[1]-b[1])
.slice(0,10);

},[bets]);

async function declareResult(){

if(winningNumber==="") return;

const finalNumber =
String(winningNumber)
.padStart(2,"0");

await supabase
.from("results")
.insert([
{
number:finalNumber
}
]);

alert("Result Declared");

setWinningNumber("");

loadData();

}

async function autoDeclareLowestBetResult(){

const lowestNumber =
numberReport[0]?.[0];

if(!lowestNumber) return;

await supabase
.from("results")
.insert([
{
number:lowestNumber
}
]);

alert(
`Auto Result : ${lowestNumber}`
);

loadData();

}

async function updateWallet(
userId,
currentWallet,
amount
){

const newWallet =
Number(currentWallet)
+ Number(amount);

await supabase
.from("users")
.update({
wallet:newWallet
})
.eq("id",userId);

loadData();

}

async function approveRequest(request){

await supabase
.from("requests")
.update({
status:"approved"
})
.eq("id",request.id);

loadData();

}

async function rejectRequest(request){

await supabase
.from("requests")
.update({
status:"rejected"
})
.eq("id",request.id);

loadData();

}

return(

<div className="adminContainer">

<div className="adminHeader">

<div>

<h1>
DBBA INDIA ADMIN
</h1>

<p>
Premium Betting Control Panel
</p>

</div>

<div className="liveBadge">

<span className="dot"></span>

LIVE ADMIN PANEL

</div>

</div>

<div className="statsGrid">

<div className="statsCard">

<h3>Total Users</h3>

<h2>
{users.length}
</h2>

</div>

<div className="statsCard">

<h3>Total Bets</h3>

<h2>
{bets.length}
</h2>

</div>

<div className="statsCard">

<h3>Total Bet Amount</h3>

<h2>
₹ {totalBetAmount}
</h2>

</div>

<div className="statsCard">

<h3>Pending Requests</h3>

<h2>

{
requests.filter(
(x)=>
x.status==="pending"
).length
}

</h2>

</div>

</div>

<div className="adminGrid">

<div>

<div className="adminBox">

<h2>
Declare Result
</h2>

<input
type="number"
placeholder="00 - 99"
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

Declare Manual Result

</button>

<button
className="secondaryBtn"
onClick={
autoDeclareLowestBetResult
}
>

Auto Lowest Bet Result

</button>

</div>

<div className="adminBox">

<h2>
Lowest Liability Numbers
</h2>

{
numberReport.map((item,index)=>(

<div
className="reportRow"
key={index}
>

<span>
Number {item[0]}
</span>

<strong>
₹ {item[1]}
</strong>

</div>

))
}

</div>

<div className="adminBox">

<h2>
Recent Results
</h2>

<div className="resultsWrap">

{
results.slice(0,15)
.map((item,index)=>(

<div
className="resultBall"
key={index}
>

{item.number}

</div>

))
}

</div>

</div>

</div>

<div>

<div className="adminBox">

<h2>
Deposit & Withdraw Requests
</h2>

{
requests.map((req,index)=>(

<div
className="tableRow"
key={index}
>

<div>

<h4>
{req.name}
</h4>

<p>

{req.type}
• ₹ {req.amount}

</p>

</div>

<div className="actionBtns">

<button
onClick={()=>
approveRequest(req)
}
>

Approve

</button>

<button
className="dangerBtn"
onClick={()=>
rejectRequest(req)
}
>

Reject

</button>

</div>

</div>

))
}

</div>

<div className="adminBox">

<h2>
Users Wallet Manager
</h2>

{
users.map((user,index)=>(

<div
className="tableRow"
key={index}
>

<div>

<h4>
{user.name}
</h4>

<p>
{user.email}
</p>

</div>

<div className="walletActions">

<span className="walletTag">

₹ {user.wallet || 0}

</span>

<button
onClick={()=>
updateWallet(
user.id,
user.wallet || 0,
100
)
}
>

+100

</button>

<button
className="dangerBtn"
onClick={()=>
updateWallet(
user.id,
user.wallet || 0,
-100
)
}
>

-100

</button>

</div>

</div>

))
}

</div>

<div className="adminBox">

<h2>
All User Bets
</h2>

{
bets.map((bet,index)=>(

<div
className="tableRow"
key={index}
>

<div>

<h4>
{bet.name}
</h4>

<p>

Number {bet.number}
• ₹ {bet.amount}

</p>

</div>

<div className="statusTag">

{bet.status || "pending"}

</div>

</div>

))
}

</div>

</div>

</div>

</div>

);

}
