"use client";

import Link from "next/link";

export default function HomePage(){

return(

<div className="homePage">

<div className="overlay"/>

<div className="content">

<h1>
DBBA INDIA
</h1>

<p>
Premium Color Prediction Platform
</p>

<div className="buttons">

<Link href="/login">

<button>
Login
</button>

</Link>

<Link href="/signup">

<button className="signupBtn">
Signup
</button>

</Link>

</div>

</div>

<style jsx>{`

.homePage{
min-height:100vh;
display:flex;
align-items:center;
justify-content:center;
background:
linear-gradient(
135deg,
#020617,
#0f172a,
#111827
);
position:relative;
overflow:hidden;
}

.overlay{
position:absolute;
width:600px;
height:600px;
background:#06b6d4;
filter:blur(180px);
opacity:0.15;
border-radius:50%;
}

.content{
position:relative;
z-index:2;
text-align:center;
color:white;
}

.content h1{
font-size:72px;
font-weight:900;
margin-bottom:15px;
background:
linear-gradient(
to right,
#00ffe0,
#00a2ff
);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

.content p{
font-size:22px;
color:#94a3b8;
margin-bottom:40px;
}

.buttons{
display:flex;
gap:20px;
justify-content:center;
flex-wrap:wrap;
}

button{
padding:16px 40px;
border:none;
border-radius:16px;
font-size:18px;
font-weight:700;
cursor:pointer;
background:
linear-gradient(
to right,
#2563eb,
#06b6d4
);
color:white;
transition:0.3s;
}

button:hover{
transform:translateY(-3px);
}

.signupBtn{
background:
linear-gradient(
to right,
#7c3aed,
#c026d3
);
}

@media(max-width:768px){

.content h1{
font-size:46px;
}

.content p{
font-size:18px;
}

}

`}</style>

</div>

)

}
