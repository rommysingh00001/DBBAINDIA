"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function SignupPage(){

const router = useRouter();

const [fullName,setFullName] = useState("");
const [email,setEmail] = useState("");
const [phone,setPhone] = useState("");
const [password,setPassword] = useState("");

async function signup(){

if(
!fullName ||
!email ||
!phone ||
!password
){
alert("Fill all fields");
return;
}

const { error } = await supabase
.from("users")
.insert([{
full_name:fullName,
email,
phone,
password,
wallet:0
}]);

if(error){
alert(error.message);
return;
}

alert("Signup Successful");

router.push("/login");

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
Signup
</h1>

<input
placeholder="Full Name"
value={fullName}
onChange={(e)=>setFullName(e.target.value)}
style={{
padding:"14px",
borderRadius:"10px",
border:"none"
}}
/>

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
placeholder="Phone Number"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
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
onClick={signup}
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
Signup
</button>

</div>

</div>

)

}
