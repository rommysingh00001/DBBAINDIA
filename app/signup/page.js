"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function SignupPage(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

async function signup(){

const { data,error } =
await supabase.auth.signUp({

email,
password

});

console.log(data);
console.log(error);

if(error){

alert(error.message);
return;

}

alert("Signup Successful");

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
placeholder="Email"
value={email}
onChange={(e)=>
setEmail(e.target.value)
}
style={{
padding:"14px",
borderRadius:"10px"
}}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>
setPassword(e.target.value)
}
style={{
padding:"14px",
borderRadius:"10px"
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
border:"none"
}}
>
Signup
</button>

</div>

</div>

)

}
