"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function SignupPage(){

const router = useRouter();

const [name,setName] = useState("");
const [phone,setPhone] = useState("");

async function signup(){

const { error } =
await supabase
.from("users")
.insert([{

name,
phone,
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
placeholder="Name"
value={name}
onChange={(e)=>
setName(e.target.value)
}
style={{
padding:"14px",
borderRadius:"10px"
}}
/>

<input
placeholder="Phone Number"
value={phone}
onChange={(e)=>
setPhone(e.target.value)
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
