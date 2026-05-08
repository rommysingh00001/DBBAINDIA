"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Phone, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignupPage(){

const router = useRouter();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [phone,setPhone] = useState("");
const [password,setPassword] = useState("");
const [loading,setLoading] = useState(false);

async function handleSignup(e){

e.preventDefault();

setLoading(true);

const { data,error } = await supabase.auth.signUp({
email,
password
});

if(error){
alert(error.message);
setLoading(false);
return;
}

await supabase.from("users").insert([
{
name,
email,
phone,
wallet:0
}
]);

alert("Signup Successful");

router.push("/login");

setLoading(false);

}

return(

<div className="authWrapper">

<div className="authOverlay"></div>

<div className="authCard">

<h1>DBBA INDIA</h1>

<p>Create Premium Gaming Account</p>

<form onSubmit={handleSignup}>

<div className="inputBox">

<User size={20}/>

<input
type="text"
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

</div>

<div className="inputBox">

<Mail size={20}/>

<input
type="email"
placeholder="Email Address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

</div>

<div className="inputBox">

<Phone size={20}/>

<input
type="text"
placeholder="Phone Number"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
required
/>

</div>

<div className="inputBox">

<Lock size={20}/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

</div>

<button
type="submit"
className="authBtn"
disabled={loading}
>

{loading ? "Creating..." : "Create Account"}

<ArrowRight size={20}/>

</button>

</form>

<div className="authBottom">

Already have account?

<Link href="/login">
<span> Login</span>
</Link>

</div>

</div>

<style jsx>{`

.authWrapper{
min-height:100vh;
display:flex;
align-items:center;
justify-content:center;
background:
linear-gradient(
135deg,
#050816,
#0f172a
);
position:relative;
overflow:hidden;
padding:20px;
}

.authOverlay{
position:absolute;
inset:0;
background:
radial-gradient(
circle at top right,
rgba(37,99,235,0.3),
transparent 40%
),
radial-gradient(
circle at bottom left,
rgba(6,182,212,0.25),
transparent 40%
);
}

.authCard{
position:relative;
z-index:2;
width:100%;
max-width:450px;
background:rgba(255,255,255,0.05);
border:1px solid rgba(255,255,255,0.08);
backdrop-filter:blur(20px);
border-radius:30px;
padding:45px;
}

.authCard h1{
font-size:40px;
font-weight:900;
text-align:center;
margin-bottom:10px;
background:
linear-gradient(
to right,
#00ffe0,
#00a2ff
);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

.authCard p{
text-align:center;
color:#94a3b8;
margin-bottom:35px;
}

.inputBox{
display:flex;
align-items:center;
gap:12px;
background:rgba(255,255,255,0.05);
border:1px solid rgba(255,255,255,0.08);
padding:16px;
border-radius:16px;
margin-bottom:20px;
color:#94a3b8;
}

.inputBox input{
background:none;
border:none;
outline:none;
color:white;
width:100%;
font-size:16px;
}

.authBtn{
width:100%;
display:flex;
align-items:center;
justify-content:center;
gap:10px;
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
margin-top:10px;
}

.authBottom{
margin-top:25px;
text-align:center;
color:#94a3b8;
}

.authBottom span{
color:#06b6d4;
font-weight:700;
cursor:pointer;
}

`}</style>

</div>

</div>

)

}
