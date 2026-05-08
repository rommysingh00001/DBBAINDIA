"use client";

import { useEffect, useMemo, useState } from "react";
import {
Users,
Wallet,
BarChart3,
CircleDollarSign,
TrendingUp,
ShieldCheck,
RefreshCw
} from "lucide-react";
import {
ResponsiveContainer,
LineChart,
Line,
XAxis,
YAxis,
Tooltip
} from "recharts";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminPage(){
const router = useRouter();
  
const [users,setUsers] = useState([]);
const [bets,setBets] = useState([]);
const [results,setResults] = useState([]);
const [requests,setRequests] = useState([]);
const [winningNumber,setWinningNumber] = useState("");
const [activeTab,setActiveTab] = useState("dashboard");
const chartData = [

{ day:"Mon", bets:4000 },

{ day:"Tue", bets:3000 },

{ day:"Wed", bets:5000 },

{ day:"Thu", bets:2780 },

{ day:"Fri", bets:1890 },

{ day:"Sat", bets:6390 },

{ day:"Sun", bets:3490 }

];
useEffect(()=>{
checkAdmin();
  async function checkAdmin(){

const {
data:{user}
} = await supabase.auth.getUser();

if(!user){

router.push("/login");
return;

}

const adminEmail =
"rommysingh00001@gmail.com";

if(user.email !== adminEmail){

router.push("/dashboard");
return;

}

}
loadData();

const interval = setInterval(()=>{

loadData();

},5000);

const auto = setInterval(()=>{

autoResult();

},28800000);

return ()=>{

clearInterval(interval);

clearInterval(auto);

};

},[]);

async function loadData(){

const { data:userData } =
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

setUsers(userData || []);
setBets(betsData || []);
setResults(resultsData || []);
setRequests(requestsData || []);

}

const totalAmount = useMemo(()=>{

return bets.reduce(
(acc,item)=>
acc + Number(item.amount || 0),
0
);

},[bets]);

const lowestBetNumber = useMemo(()=>{

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

const sorted =
Object.entries(report)
.sort((a,b)=>a[1]-b[1]);

return sorted[0]?.[0] || "00";

},[bets]);

async function declareResult(){

const finalNumber =
String(winningNumber)
.padStart(2,"0");

if(Number(finalNumber) > 99){

alert("Only 00-99 Allowed");
return;

}

await supabase
.from("results")
.insert([
{
number:finalNumber
}
]);
const winners =
bets.filter(
(bet)=>
String(bet.number)
.padStart(2,"0")
=== finalNumber
);

for(const win of winners){

const { data:userData } =
await supabase
.from("users")
.select("*")
.eq("email",win.name)
.single();

if(userData){

const reward =
Number(win.amount) * 10;

await supabase
.from("users")
.update({
wallet:
Number(userData.wallet || 0)
+ reward
})
.eq("email",win.name);

}

}
alert("Result Declared");

setWinningNumber("");

loadData();

}

async function autoResult(){

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

const sorted =
Object.entries(report)
.sort((a,b)=>a[1]-b[1]);

const lowestNumber =
sorted[0][0];

await supabase
.from("results")
.insert([
{
number:lowestNumber
}
]);

const winners =
bets.filter(
(bet)=>
String(bet.number)
.padStart(2,"0")
=== lowestNumber
);

for(const win of winners){

const { data:userData } =
await supabase
.from("users")
.select("*")
.eq("email",win.name)
.single();

if(userData){

const reward =
Number(win.amount) * 10;

await supabase
.from("users")
.update({
wallet:
Number(userData.wallet || 0)
+ reward
})
.eq("email",win.name);

}

}

alert(
`Auto Result Declared : ${lowestNumber}`
);

loadData();

}

async function updateWallet(
id,
wallet,
amount
){

const newWallet =
Number(wallet) + Number(amount);

await supabase
.from("users")
.update({
wallet:newWallet
})
.eq("id",id);

loadData();

}

async function approveRequest(req){

await supabase
.from("requests")
.update({
status:"approved"
})
.eq("id",req.id);

const { data:userData } =
await supabase
.from("users")
.select("*")
.eq("email",req.name)
.single();

if(userData){

let newWallet =
Number(userData.wallet || 0);

if(req.type === "deposit"){

newWallet +=
Number(req.amount);

}

if(req.type === "withdraw"){

newWallet -=
Number(req.amount);

}

await supabase
.from("users")
.update({
wallet:newWallet
})
.eq("email",req.name);

}

alert("Request Approved");

loadData();

}
async function rejectRequest(req){

await supabase
.from("requests")
.update({
status:"rejected"
})
.eq("id",req.id);

loadData();

}

return(

<div className="adminWrap">

<div className="sidebar">

<h1>DBBA INDIA</h1>

<div className="menu">

<div
className={
activeTab==="dashboard"
? "menuItem active"
: "menuItem"
}
onClick={()=>
setActiveTab("dashboard")
}
>
Dashboard
</div>

<div
className={
activeTab==="users"
? "menuItem active"
: "menuItem"
}
onClick={()=>
setActiveTab("users")
}
>
Users
</div>

<div
className={
activeTab==="wallet"
? "menuItem active"
: "menuItem"
}
onClick={()=>
setActiveTab("wallet")
}
>
Wallet
</div>

<div
className={
activeTab==="results"
? "menuItem active"
: "menuItem"
}
onClick={()=>
setActiveTab("results")
}
>
Results
</div>

<div
className={
activeTab==="analytics"
? "menuItem active"
: "menuItem"
}
onClick={()=>
setActiveTab("analytics")
}
>
Analytics
</div>

</div>
</div>

<div className="mainPanel">

<div className="topBar">

<div>

<h2>
Premium Admin Panel
</h2>

<p>
Realtime betting analytics dashboard
</p>

</div>

<div className="liveTag">

<RefreshCw size={18}/>

LIVE

</div>

</div>

<div className="statsGrid">

<div className="statsCard">

<div className="iconBox">
<Users size={24}/>
</div>

<div>
<p>Total Users</p>
<h1>{users.length}</h1>
</div>

</div>

<div className="statsCard">

<div className="iconBox">
<BarChart3 size={24}/>
</div>

<div>
<p>Total Bets</p>
<h1>{bets.length}</h1>
</div>

</div>

<div className="statsCard">

<div className="iconBox">
<CircleDollarSign size={24}/>
</div>

<div>
<p>Total Amount</p>
<h1>₹ {totalAmount}</h1>
</div>

</div>

<div className="statsCard">

<div className="iconBox">
<TrendingUp size={24}/>
</div>

<div>
<p>Lowest Liability</p>
<h1>{lowestBetNumber}</h1>
</div>

</div>

</div>

<div className="gridTwo">
<div className="card">

<h2>Live Betting Analytics</h2>

<div style={{width:"100%",height:"350px"}}>

<ResponsiveContainer>

<LineChart data={chartData}>

<XAxis dataKey="day"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="bets"
stroke="#06b6d4"
strokeWidth={4}
/>

</LineChart>

</ResponsiveContainer>

</div>

</div>
<div className="card">

<h2>Declare Result</h2>

<input
type="number"
placeholder="00-99"
value={winningNumber}
onChange={(e)=>
setWinningNumber(e.target.value)
}
/>

<button onClick={declareResult}>
Declare Result
</button>

<button
className="greenBtn"
onClick={autoResult}
>
Auto Lowest Bet Result
</button>

</div>

<div className="card">

<h2>Latest Results</h2>

<div className="resultWrap">

{
results.slice(0,10)
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

<div className="card">

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

<h4>{req.name}</h4>

<p>
{req.type} • ₹ {req.amount}
</p>

</div>

<div className="actions">

<button
onClick={()=>
approveRequest(req)
}
>

Approve

</button>

<button
className="redBtn"
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

<div className="card">

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

<h4>{user.name}</h4>

<p>{user.email}</p>

</div>

<div className="actions">

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
className="redBtn"
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

<div className="card">

<h2>
All Bets
</h2>

<table>

<thead>

<tr>

<th>User</th>
<th>Number</th>
<th>Amount</th>
<th>Status</th>

</tr>

</thead>

<tbody>

{
bets.map((bet,index)=>(

<tr key={index}>

<td>{bet.name}</td>

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

<style jsx>{`

.adminWrap{
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
border-right:
1px solid rgba(255,255,255,0.08);
padding:30px;
}

.sidebar h1{
font-size:30px;
font-weight:900;
margin-bottom:40px;
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

.mainPanel{
flex:1;
padding:30px;
}

.topBar{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:30px;
}

.topBar h2{
font-size:38px;
font-weight:800;
}

.topBar p{
margin-top:6px;
color:#94a3b8;
}

.liveTag{
display:flex;
align-items:center;
gap:10px;
padding:14px 22px;
border-radius:18px;
background:
linear-gradient(
to right,
#2563eb,
#06b6d4
);
font-weight:700;
}

.statsGrid{
display:grid;
grid-template-columns:
repeat(auto-fit,minmax(220px,1fr));
gap:20px;
margin-bottom:30px;
}

.statsCard{
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

.statsCard p{
color:#94a3b8;
margin-bottom:8px;
}

.statsCard h1{
font-size:28px;
}

.gridTwo{
display:grid;
grid-template-columns:1fr 1fr;
gap:20px;
margin-bottom:20px;
}

.card{
background:rgba(255,255,255,0.05);
border:1px solid rgba(255,255,255,0.08);
border-radius:24px;
padding:25px;
margin-bottom:20px;
}

.card h2{
margin-bottom:20px;
}

.card input{
width:100%;
padding:18px;
border:none;
outline:none;
border-radius:16px;
background:rgba(255,255,255,0.05);
color:white;
margin-bottom:15px;
}

.card button{
padding:14px 20px;
border:none;
border-radius:14px;
background:
linear-gradient(
to right,
#2563eb,
#06b6d4
);
color:white;
font-weight:700;
cursor:pointer;
margin-right:10px;
}

.greenBtn{
background:#10b981 !important;
}

.redBtn{
background:#ef4444 !important;
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

.tableRow{
display:flex;
justify-content:space-between;
align-items:center;
padding:18px;
border-radius:18px;
background:rgba(255,255,255,0.04);
margin-bottom:15px;
}

.actions{
display:flex;
align-items:center;
gap:10px;
}

.walletTag{
padding:12px 18px;
border-radius:14px;
background:#10b981;
font-weight:700;
}

table{
width:100%;
border-collapse:collapse;
}

th,
td{
padding:16px;
text-align:left;
border-bottom:
1px solid rgba(255,255,255,0.08);
}

@media(max-width:900px){

.sidebar{
display:none;
}

.gridTwo{
grid-template-columns:1fr;
}

.topBar{
flex-direction:column;
align-items:flex-start;
gap:20px;
}

}

`}</style>

</div>

</div>

</div>

)

}
