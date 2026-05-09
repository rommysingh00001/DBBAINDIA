"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LoginPage(){

const router = useRouter();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

async function login(){

const { data,error } = await supabase
.from("users")
.select("*")
.eq("email",email)
.eq("password",password)
.single();

if(error || !data){

alert("Invalid Email or Password");
return;

}

localStorage.setItem(
"user",
JSON.stringify(data)
);

router.push("/dashboard");

}

return(

<div style={{
minHeight:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#020617"
}}>

<div style={{
width:"350px",
background:"#111827",
padding:"30px",
borderRadius:"20px",
display:"flex",
flexDirection:"column",
gap:"15px"
}}>

<h1 style={{
color:"white",
textAlign:"center"
}}>
Login
</h1>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{
padding:"14px",
borderRadius:"10px",
border:"none"
}}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{
padding:"14px",
borderRadius:"10px",
border:"none"
}}
/>

<button
onClick={login}
style={{
padding:"14px",
borderRadius:"10px",
background:"#06b6d4",
color:"white",
fontWeight:"bold",
border:"none",
cursor:"pointer"
}}
>
Login
</button>

</div>

</div>

)

}
