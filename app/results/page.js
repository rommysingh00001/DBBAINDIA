"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ResultsPage(){

const [results,setResults] = useState([]);

useEffect(()=>{

loadResults();

},[]);

async function loadResults(){

const { data } =
await supabase
.from("results")
.select("*")
.order("created_at",{ascending:false});

setResults(data || []);

}

return(

<div className="resultsPage">

<h1>
Results History
</h1>

<div className="resultsGrid">

{
results.map((item,index)=>(

<div
className="resultCard"
key={index}
>

<div className="resultBall">

{item.number}

</div>

<p>

{
new Date(
item.created_at
).toLocaleString()
}

</p>

</div>

))
}

</div>

<style jsx>{`

.resultsPage{
min-height:100vh;
padding:40px;
background:
linear-gradient(
135deg,
#050816,
#0f172a
);
color:white;
}

.resultsPage h1{
font-size:42px;
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

.resultsGrid{
display:grid;
grid-template-columns:
repeat(auto-fit,minmax(220px,1fr));
gap:25px;
}

.resultCard{
background:rgba(255,255,255,0.05);
border:1px solid rgba(255,255,255,0.08);
border-radius:24px;
padding:30px;
text-align:center;
}

.resultBall{
width:90px;
height:90px;
border-radius:50%;
margin:auto;
margin-bottom:20px;
background:
linear-gradient(
to right,
#2563eb,
#06b6d4
);
display:flex;
align-items:center;
justify-content:center;
font-size:32px;
font-weight:900;
}

.resultCard p{
color:#94a3b8;
}

`}</style>

</div>

)

}
