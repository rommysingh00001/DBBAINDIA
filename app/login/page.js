"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage(){

const router = useRouter();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

async function login(){

const { error } =
await supabase.auth.signInWithPassword({

email,
password

});

if(error){

alert(error.message);
return;

}

router.push("/dashboard");

}

return(

<div className="authPage">

<div className="authBox">

<h1>Login</h1>

<input
placeholder="Email"
value={email}
onChange={(e)=>
setEmail(e.target.value)
}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>
setPassword(e.target.value)
}
/>

<button onClick={login}>
Login
</button>

</div>

<style jsx>{`

.authPage{
min-height:100vh;
display:flex;
align-items:center;
justify-content:center;
background:#020617;
}

.authBox{
width:400px;
background:#111827;
padding:40px;
border-radius:20px;
display:flex;
flex-direction:column;
gap:20px;
}

.authBox h1{
color:white;
text-align:center;
}

input{
padding:14px;
border:none;
border-radius:12px;
background:#1e293b;
color:white;
}

button{
padding:14px;
border:none;
border-radius:12px;
background:#06b6d4;
color:white;
font-weight:700;
cursor:pointer;
}

`}</style>

</div>

)

}
