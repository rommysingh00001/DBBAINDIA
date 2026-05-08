"use client";

import { useEffect, useState } from "react";
import {
Wallet,
Clock3,
Trophy,
CircleDollarSign,
LogOut,
Home,
BarChart,
User
} from "lucide-react";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage(){

const router = useRouter();

const [user,setUser] = useState(null);
const [wallet,setWallet] = useState(0);
const [profile,setProfile] = useState(null);
const [number,setNumber] = useState("");
const [amount,setAmount] = useState("");
const [betLocked,setBetLocked] = useState(false);
const [time,setTime] = useState("");
const [results,setResults] = useState([]);
const [bets,setBets] = useState([]);
const [depositAmount,setDepositAmount] = useState("");
const [withdrawAmount,setWithdrawAmount] = useState("");
useEffect(()=>{

getUser();

loadResults();

loadBets();
const timer = setInterval(()=>{

const now = new Date();

setTime(
now.toLocaleTimeString()
);

},1000);
const now = new Date();

const currentMinute =
now.getMinutes();

if(currentMinute >= 55){

setBetLocked(true);

}else{

setBetLocked(false);

}
const betsChannel =
supabase
.channel("bets-live")
.on(
"postgres_changes",
{
event:"*",
schema:"public",
table:"bets"
},
()=>{
loadBets();
}
)
.subscribe();

const resultsChannel =
supabase
.channel("results-live")
.on(
"postgres_changes",
{
event:"*",
schema:"public",
table:"results"
},
()=>{
loadResults();
}
)
.subscribe();

return ()=>{

supabase.removeChannel(
betsChannel
);

supabase.removeChannel(
resultsChannel
);

clearInterval(timer);

};

},[]);

async function getUser(){

const {
data:{user}
} = await supabase.auth.getUser();

if(!user){

router.push("/login");
return;

}

setUser(user);

const { data } = await supabase
.from("users")
.select("*")
.eq("email",user.email)
.single();

if(data){

setWallet(data.wallet || 0);

setProfile(data);

}

}

async function loadResults(){

const { data } = await supabase
.from("results")
.select("*")
.order("created_at",{ascending:false})
.limit(10);

setResults(data || []);

}

async function loadBets(){

const {
data:{user}
} = await supabase.auth.getUser();

if(!user) return;

const { data } = await supabase
.from("bets")
.select("*")
.eq("user_id",user.id)
.order("created_at",{ascending:false});

setBets(data || []);

}

async function placeBet(){
if(betLocked){

alert("Betting Closed");

return;

}
if(!number || !amount){

alert("Fill all fields");
return;

}

if(Number(amount) > wallet){

alert("Insufficient Wallet");
return;

}

const {
data:{user}
} = await supabase.auth.getUser();

await supabase
.from("bets")
.insert([
{
user_id:user.id,
name:user.email,
number,
amount
}
]);

const newWallet =
wallet - Number(amount);

await supabase
.from("users")
.update({
wallet:newWallet
})
.eq("email",user.email);

setWallet(newWallet);

alert("Bet Placed");

setNumber("");
setAmount("");

loadBets();

}
async function sendDepositRequest(){

if(!depositAmount){

alert("Enter amount");
return;

}

const {
data:{user}
} = await supabase.auth.getUser();

await supabase
.from("requests")
.insert([
{
name:user.email,
type:"deposit",
amount:depositAmount,
status:"pending"
}
]);

alert("Deposit Request Sent");

setDepositAmount("");

}

async function sendWithdrawRequest(){

if(!withdrawAmount){

alert("Enter amount");
return;

}

if(Number(withdrawAmount) > wallet){

alert("Insufficient Wallet");
return;

}

const {
data:{user}
} = await supabase.auth.getUser();

await supabase
.from("requests")
.insert([
{
name:user.email,
type:"withdraw",
amount:withdrawAmount,
status:"pending"
}
]);

alert("Withdraw Request Sent");

setWithdrawAmount("");

}
async function logout(){

await supabase.auth.signOut();

router.push("/login");

}

return(

<div className="dashWrapper">

<div className="sidebar">

<h1>DBBA INDIA</h1>

<div className="menu">

<div className="menuItem active">
Dashboard
</div>

<div className="menuItem">
My Bets
</div>

<div className="menuItem">
Wallet
</div>

<div className="menuItem">
Results
</div>

</div>

<button
className="logoutBtn"
onClick={logout}
>

<LogOut size={18}/>

Logout

</button>

</div>

<div className="mainDash">

<div className="topHeader">

<div>

<h2>
Welcome Back 👋
</h2>

<p>
Premium Gaming Dashboard
</p>
<div className="liveClock">

🕒 {time}

</div>
</div>

<div className="walletBox">

<Wallet size={24}/>

₹ {wallet}

</div>

</div>
<div className="profileCard">

<h2>User Profile</h2>

<div className="profileInfo">

<div>

<p>Name</p>

<h3>
{profile?.name || "--"}
</h3>

</div>

<div>

<p>Email</p>

<h3>
{profile?.email || "--"}
</h3>

</div>

<div>

<p>Phone</p>

<h3>
{profile?.phone || "--"}
</h3>

</div>

<div>

<p>Wallet</p>

<h3>
₹ {wallet}
</h3>

</div>

</div>

</div>
<div className="cardsGrid">
<div className="walletActions">

<div className="walletCard">

<h2>Deposit Request</h2>

<input
type="number"
placeholder="Enter Deposit Amount"
value={depositAmount}
onChange={(e)=>
setDepositAmount(e.target.value)
}
/>

<button onClick={sendDepositRequest}>
Send Deposit Request
</button>

</div>

<div className="walletCard">

<h2>Withdraw Request</h2>

<input
type="number"
placeholder="Enter Withdraw Amount"
value={withdrawAmount}
onChange={(e)=>
setWithdrawAmount(e.target.value)
}
/>

<button
className="withdrawBtn"
onClick={sendWithdrawRequest}
>

Send Withdraw Request

</button>

</div>

</div>
<div className="dashCard">

<div className="iconBox">
<Wallet size={26}/>
</div>

<div>
<p>Wallet Balance</p>
<h1>₹ {wallet}</h1>
</div>

</div>

<div className="dashCard">

<div className="iconBox">
<Clock3 size={26}/>
</div>

<div>
<p>Next Result</p>
<h1>8 Hours</h1>
</div>

</div>

<div className="dashCard">

<div className="iconBox">
<Trophy size={26}/>
</div>

<div>
<p>Last Result</p>

<h1>
{results[0]?.number || "--"}
</h1>

</div>

</div>

<div className="dashCard">

<div className="iconBox">
<CircleDollarSign size={26}/>
</div>

<div>
<p>Total Bets</p>
<h1>{bets.length}</h1>
</div>

</div>

</div>
<div className="walletActions">

<div className="walletCard">

<h2>Deposit Request</h2>

<input
type="number"
placeholder="Enter Deposit Amount"
value={depositAmount}
onChange={(e)=>
setDepositAmount(e.target.value)
}
/>

<button onClick={sendDepositRequest}>
Send Deposit Request
</button>

</div>

<div className="walletCard">

<h2>Withdraw Request</h2>

<input
type="number"
placeholder="Enter Withdraw Amount"
value={withdrawAmount}
onChange={(e)=>
setWithdrawAmount(e.target.value)
}
/>

<button
className="withdrawBtn"
onClick={sendWithdrawRequest}
>

Send Withdraw Request

</button>

</div>

</div>
<div className="contentGrid">

<div className="betCard">

<h2>Place Bet</h2>

<input
type="number"
placeholder="Enter Number 00-99"
value={number}
onChange={(e)=>
setNumber(e.target.value)
}
/>

<input
type="number"
placeholder="Enter Amount"
value={amount}
onChange={(e)=>
setAmount(e.target.value)
}
/>

<button
onClick={placeBet}
disabled={betLocked}
>

{betLocked
? "Betting Closed"
: "Place Bet"}

</button>

</div>

<div className="resultCard">

<h2>Latest Results</h2>

<div className="resultWrap">

{
results.map((item,index)=>(

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

<div className="historyCard">

<h2>My Bets</h2>

<table>

<thead>

<tr>

<th>Number</th>
<th>Amount</th>
<th>Status</th>

</tr>

</thead>

<tbody>

{
bets.map((bet,index)=>(

<tr key={index}>

<td>{bet.number}</td>

<td>
₹ {bet.amount}
</td>

<td>
{bet.status}
</td>

</tr>

))
}

</tbody>

</table>

</div>

</div>
<div className="mobileNav">

<div className="mobileItem active">

<Home size={22}/>

<p>Home</p>

</div>

<div className="mobileItem">

<BarChart size={22}/>

<p>Results</p>

</div>

<div className="mobileItem">

<Wallet size={22}/>

<p>Wallet</p>

</div>

<div className="mobileItem">

<User size={22}/>

<p>Profile</p>

</div>

</div>
<style jsx>{`
.mobileNav{
position:fixed;
bottom:0;
left:0;
right:0;
height:80px;
background:rgba(5,8,22,0.95);
backdrop-filter:blur(20px);
border-top:
1px solid rgba(255,255,255,0.08);
display:none;
align-items:center;
justify-content:space-around;
z-index:999;
}

.mobileItem{
display:flex;
flex-direction:column;
align-items:center;
gap:6px;
color:#94a3b8;
font-size:13px;
}

.mobileItem.active{
color:#06b6d4;
}

@media(max-width:900px){

.mobileNav{
display:flex;
}

.mainDash{
padding-bottom:110px;
}

}.profileCard{
background:rgba(255,255,255,0.05);
border:1px solid rgba(255,255,255,0.08);
border-radius:24px;
padding:25px;
margin-bottom:25px;
}

.profileCard h2{
margin-bottom:20px;
}

.profileInfo{
display:grid;
grid-template-columns:
repeat(auto-fit,minmax(200px,1fr));
gap:20px;
}

.profileInfo p{
color:#94a3b8;
margin-bottom:8px;
}

.profileInfo h3{
font-size:20px;
}.liveClock{
margin-top:12px;
display:inline-block;
padding:12px 18px;
border-radius:16px;
background:
linear-gradient(
to right,
#2563eb,
#06b6d4
);
font-weight:700;
font-size:16px;
}
.walletActions{
display:grid;
grid-template-columns:1fr 1fr;
gap:20px;
margin-bottom:30px;
}

.walletCard{
background:rgba(255,255,255,0.05);
border:1px solid rgba(255,255,255,0.08);
border-radius:24px;
padding:25px;
}

.walletCard h2{
margin-bottom:20px;
}

.walletCard input{
width:100%;
padding:18px;
border:none;
outline:none;
border-radius:16px;
background:rgba(255,255,255,0.05);
color:white;
font-size:16px;
margin-bottom:15px;
}

.walletCard button{
width:100%;
padding:18px;
border:none;
border-radius:18px;
background:
linear-gradient(
to right,
#2563eb,
#06b6d4
);
color:white;
font-size:16px;
font-weight:800;
cursor:pointer;
}

.withdrawBtn{
background:#ef4444 !important;
}

.dashWrapper{
display:flex;
min-height:100vh;
background:
linear-gradient(
135deg,
#050816,
#0f172a
);
color:white;
}

.sidebar{
width:260px;
background:rgba(255,255,255,0.05);
border-right:1px solid rgba(255,255,255,0.08);
padding:30px;
display:flex;
flex-direction:column;
justify-content:space-between;
}

.sidebar h1{
font-size:30px;
font-weight:900;
background:
linear-gradient(
to right,
#00ffe0,
#00a2ff
);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

.menu{
margin-top:40px;
display:flex;
flex-direction:column;
gap:15px;
}

.menuItem{
padding:16px;
border-radius:16px;
background:rgba(255,255,255,0.04);
cursor:pointer;
}

.active{
background:
linear-gradient(
to right,
#2563eb,
#06b6d4
);
}

.logoutBtn{
display:flex;
align-items:center;
justify-content:center;
gap:10px;
padding:16px;
border:none;
border-radius:16px;
background:#ef4444;
color:white;
font-size:16px;
font-weight:700;
cursor:pointer;
}

.mainDash{
flex:1;
padding:30px;
}

.topHeader{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:30px;
}

.topHeader h2{
font-size:36px;
font-weight:800;
}

.topHeader p{
color:#94a3b8;
margin-top:6px;
}

.walletBox{
display:flex;
align-items:center;
gap:10px;
padding:15px 25px;
border-radius:18px;
background:
linear-gradient(
to right,
#2563eb,
#06b6d4
);
font-size:20px;
font-weight:800;
}

.cardsGrid{
display:grid;
grid-template-columns:
repeat(auto-fit,minmax(220px,1fr));
gap:20px;
margin-bottom:30px;
}

.dashCard{
background:rgba(255,255,255,0.05);
border:1px solid rgba(255,255,255,0.08);
border-radius:24px;
padding:25px;
display:flex;
align-items:center;
gap:20px;
}

.iconBox{
width:65px;
height:65px;
border-radius:20px;
background:
linear-gradient(
to right,
#2563eb,
#06b6d4
);
display:flex;
align-items:center;
justify-content:center;
}

.dashCard p{
color:#94a3b8;
margin-bottom:8px;
}

.dashCard h1{
font-size:28px;
}

.contentGrid{
display:grid;
grid-template-columns:1fr 1fr;
gap:20px;
margin-bottom:30px;
}

.betCard,
.resultCard,
.historyCard{
background:rgba(255,255,255,0.05);
border:1px solid rgba(255,255,255,0.08);
border-radius:24px;
padding:25px;
}

.betCard h2,
.resultCard h2,
.historyCard h2{
margin-bottom:20px;
}

.betCard input{
width:100%;
padding:18px;
margin-bottom:15px;
border:none;
outline:none;
border-radius:16px;
background:rgba(255,255,255,0.05);
color:white;
font-size:16px;
}

.betCard button{
width:100%;
padding:18px;
border:none;
border-radius:18px;
background:
linear-gradient(
to right,
#2563eb,
#06b6d4
);
color:white;
font-size:18px;
font-weight:800;
cursor:pointer;
}

.resultWrap{
display:flex;
flex-wrap:wrap;
gap:15px;
}

.resultBall{
width:70px;
height:70px;
border-radius:50%;
background:
linear-gradient(
to right,
#2563eb,
#06b6d4
);
display:flex;
align-items:center;
justify-content:center;
font-size:24px;
font-weight:900;
}

.historyCard table{
width:100%;
border-collapse:collapse;
}

.historyCard th,
.historyCard td{
padding:16px;
text-align:left;
border-bottom:
1px solid rgba(255,255,255,0.08);
}

@media(max-width:900px){

.sidebar{
display:none;
}

.contentGrid{
grid-template-columns:1fr;
}

.topHeader{
flex-direction:column;
align-items:flex-start;
gap:20px;
}

}

`}</style>

</div>

</div>

);
}
