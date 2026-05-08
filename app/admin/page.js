# FILE: app/admin/page.js

```jsx
"use client";

import {
LayoutDashboard,
Users,
Wallet,
BarChart3,
CircleDollarSign,
Bell,
Activity
} from "lucide-react";

export default function AdminPage(){

const stats = [
{
name:"Total Users",
value:"2,845",
icon:<Users size={28}/>
},
{
name:"Total Bets",
value:"14,290",
icon:<BarChart3 size={28}/>
},
{
name:"Wallet Balance",
value:"₹ 8,42,000",
icon:<Wallet size={28}/>
},
{
name:"Profit Today",
value:"₹ 1,28,500",
icon:<CircleDollarSign size={28}/>
}
]

return(
<div className="adminWrapper">

<div className="sidebar">

<div className="logoArea">
<h1>DBBA INDIA</h1>
<p>Premium Admin</p>
</div>

<div className="menuList">

<div className="menuItem activeMenu">
<LayoutDashboard size={20}/>
<span>Dashboard</span>
</div>

<div className="menuItem">
<Users size={20}/>
<span>Users</span>
</div>

<div className="menuItem">
<Wallet size={20}/>
<span>Wallet</span>
</div>

<div className="menuItem">
<BarChart3 size={20}/>
<span>Bets</span>
</div>

<div className="menuItem">
<Activity size={20}/>
<span>Results</span>
</div>

<div className="menuItem">
<Bell size={20}/>
<span>Notifications</span>
</div>

</div>

</div>

<div className="mainPanel">

<div className="topBar">

<div>
<h2>Welcome Admin 👋</h2>
<p>Manage complete betting platform</p>
</div>

<div className="adminProfile">
<img src="https://i.pravatar.cc/100"/>
<div>
<h4>DBBA Admin</h4>
<p>Super Admin</p>
</div>
</div>

</div>

<div className="statsGrid">

{
stats.map((item,index)=>(

<div className="statsCard" key={index}>

<div className="statsIcon">
{item.icon}
</div>

<div>
<p>{item.name}</p>
<h1>{item.value}</h1>
</div>

</div>

))
}

</div>

<div className="contentGrid">

<div className="chartCard">

<h2>Bet Analytics</h2>

<div className="fakeChart">
<div className="bar h1"></div>
<div className="bar h2"></div>
<div className="bar h3"></div>
<div className="bar h4"></div>
<div className="bar h5"></div>
<div className="bar h6"></div>
<div className="bar h7"></div>
</div>

</div>

<div className="resultsCard">

<h2>Latest Results</h2>

<div className="resultsWrap">

<div className="resultBall">12</div>
<div className="resultBall">48</div>
<div className="resultBall">77</div>
<div className="resultBall">03</div>
<div className="resultBall">56</div>
<div className="resultBall">91</div>
<div className="resultBall">34</div>
<div className="resultBall">80</div>

</div>

</div>

</div>

<div className="tableCard">

<h2>Recent Bets</h2>

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

<tr>
<td>Rahul</td>
<td>12</td>
<td>₹ 500</td>
<td><span className="green">Won</span></td>
</tr>

<tr>
<td>Aman</td>
<td>56</td>
<td>₹ 1000</td>
<td><span className="red">Lost</span></td>
</tr>

<tr>
<td>Vikas</td>
<td>80</td>
<td>₹ 250</td>
<td><span className="yellow">Pending</span></td>
</tr>

</tbody>
</table>

</div>

</div>

</div>
)

}
```

---

# FILE: app/globals.css

```css
*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Arial,Helvetica,sans-serif;
}

body{
background:#050816;
color:white;
}

.adminWrapper{
display:flex;
min-height:100vh;
background:linear-gradient(135deg,#050816,#111827);
}

.sidebar{
width:260px;
background:rgba(255,255,255,0.05);
backdrop-filter:blur(20px);
padding:30px 20px;
border-right:1px solid rgba(255,255,255,0.08);
}

.logoArea h1{
font-size:28px;
font-weight:900;
background:linear-gradient(to right,#00ffe0,#00a2ff);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

.logoArea p{
color:#9ca3af;
margin-top:6px;
}

.menuList{
margin-top:40px;
display:flex;
flex-direction:column;
gap:15px;
}

.menuItem{
display:flex;
align-items:center;
gap:14px;
padding:15px;
border-radius:16px;
cursor:pointer;
transition:0.3s;
color:#cbd5e1;
}

.menuItem:hover,
.activeMenu{
background:linear-gradient(to right,#2563eb,#06b6d4);
color:white;
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
font-size:34px;
font-weight:800;
}

.topBar p{
color:#9ca3af;
margin-top:5px;
}

.adminProfile{
display:flex;
align-items:center;
gap:12px;
background:rgba(255,255,255,0.05);
padding:10px 16px;
border-radius:18px;
}

.adminProfile img{
width:50px;
height:50px;
border-radius:50%;
}

.statsGrid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
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
backdrop-filter:blur(20px);
}

.statsIcon{
width:65px;
height:65px;
border-radius:18px;
background:linear-gradient(to right,#2563eb,#06b6d4);
display:flex;
align-items:center;
justify-content:center;
}

.statsCard p{
color:#9ca3af;
margin-bottom:8px;
}

.statsCard h1{
font-size:32px;
}

.contentGrid{
display:grid;
grid-template-columns:2fr 1fr;
gap:20px;
margin-bottom:30px;
}

.chartCard,
.resultsCard,
.tableCard{
background:rgba(255,255,255,0.05);
border:1px solid rgba(255,255,255,0.08);
border-radius:24px;
padding:25px;
backdrop-filter:blur(20px);
}

.chartCard h2,
.resultsCard h2,
.tableCard h2{
margin-bottom:25px;
}

.fakeChart{
height:300px;
display:flex;
align-items:flex-end;
gap:14px;
}

.bar{
flex:1;
border-radius:12px 12px 0 0;
background:linear-gradient(to top,#06b6d4,#2563eb);
}

.h1{height:40%;}
.h2{height:70%;}
.h3{height:55%;}
.h4{height:90%;}
.h5{height:60%;}
.h6{height:80%;}
.h7{height:45%;}

.resultsWrap{
display:flex;
flex-wrap:wrap;
gap:15px;
}

.resultBall{
width:70px;
height:70px;
border-radius:50%;
background:linear-gradient(to right,#06b6d4,#2563eb);
display:flex;
align-items:center;
justify-content:center;
font-size:24px;
font-weight:900;
}

.tableCard table{
width:100%;
border-collapse:collapse;
}

.tableCard th,
.tableCard td{
padding:18px;
text-align:left;
border-bottom:1px solid rgba(255,255,255,0.08);
}

.green{
color:#00ff88;
}

.red{
color:#ff4d6d;
}

.yellow{
color:#ffcc00;
}

@media(max-width:900px){
.sidebar{
display:none;
}

.contentGrid{
grid-template-columns:1fr;
}

.topBar{
flex-direction:column;
align-items:flex-start;
gap:20px;
```
