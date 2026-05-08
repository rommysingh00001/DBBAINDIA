"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {

const [users,setUsers] = useState([]);
const [bets,setBets] = useState([]);
const [results,setResults] = useState([]);
const [requests,setRequests] = useState([]);
const [winningNumber,setWinningNumber] = useState("");
const [liveUsers,setLiveUsers] = useState(0);

useEffect(()=>{

fetchAllData();

const interval = setInterval(()=>{
fetchAllData();
},5000);

return ()=> clearInterval(interval);

},[]);

async function fetchAllData(){

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

setLiveUsers(
Math.floor(Math.random()*900)+100
);

}

async function declareResult(){

if(winningNumber === "") return;

await supabase
.from("results")
.insert([
{
number: winningNumber
}
]);

alert("Result Declared");

setWinningNumber("");

fetchAllData();

}

async function approveRequest(id){

await supabase
.from("requests")
.update({
status:"approved"
})
.eq("id",id);

fetchAllData();

}

async function rejectRequest(id){

await supabase
.from("requests")
.update({
status:"rejected"
})
.eq("id",id);

fetchAllData();

}

return (

<div className="adminMain">

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
<h3>TOTAL USERS</h3>
<h1>{users.length}</h1>
</div>

<div className="statCard">
<h3>TOTAL BETS</h3>
<h1>{bets.length}</h1>
</div>

<div className="statCard">
<h3>RESULTS</h3>
<h1>{results.length}</h1>
</div>

<div className="statCard">
<h3>PENDING REQUESTS</h3>
<h1>
{
requests.filter(
x=>x.status==="pending"
).length
}
</h1>
</div>

</div>

<div className="adminGrid">

<div className="leftAdmin">

<div className="adminCard">

<h2>Declare Result</h2>

<input
type="number"
placeholder="00 - 99"
value={winningNumber}
onChange={(e)=>
setWinningNumber(e.target.value)
}
/>

<button onClick={declareResult}>
Declare Winning Number
</button>

</div>

<div className="adminCard">

<h2>Recent Results</h2>

<div className="resultsWrap">

{
results.slice(0,12).map((item,index)=>(

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

<div className="adminCard">

<h2>Deposit / Withdraw Requests</h2>

{
requests.map((item,index)=>(

<div
className="transactionRow"
key={index}
>

<div>

<h3>
{item.name}
</h3>

<p>
₹ {item.amount}
</p>

<p>
{item.type}
</p>

</div>

<div
style={{
display:"flex",
gap:"10px"
}}
>

<button
onClick={()=>
approveRequest(item.id)
}
>
Approve
</button>

<button
style={{
background:"#ff1744",
color:"white"
}}
onClick={()=>
rejectRequest(item.id)
}
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

<h2>Users Wallet Data</h2>

{
users.map((user,index)=>(

<div
className="userRow"
key={index}
>

<div>

<h3>
{user.name}
</h3>

<p>
{user.email}
</p>

</div>

<div className="winStatus">

₹ {user.wallet}

</div>

</div>

))
}

</div>

<div className="adminCard">

<h2>All User Bets</h2>

{
bets.map((bet,index)=>(

<div
className="betRowAdmin"
key={index}
>

<div>

<h3>
{bet.name}
</h3>

<p>
Number : {bet.number}
</p>

</div>

<div>

<p>
Bet Amount
</p>

<h3>
₹ {bet.amount}
</h3>

</div>

<div
className={
bet.status === "win"
?
"winStatus"
:
bet.status === "loss"
?
"lossStatus"
:
"pendingStatus"
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

</div>

);

}
