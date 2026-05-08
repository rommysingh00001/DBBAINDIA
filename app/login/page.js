"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {

const router = useRouter();

const [phone, setPhone] = useState("");

async function login() {

const { data, error } = await supabase
.from("users")
.select("*")
.eq("phone", phone)
.single();

if (error || !data) {

alert("User not found");
return;

}

localStorage.setItem(
"user",
JSON.stringify(data)
);

router.push("/dashboard");

}

return (

<div style={{
minHeight: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
background: "#020617"
}}>

<div style={{
width: "350px",
background: "#111827",
padding: "30px",
borderRadius: "20px",
display: "flex",
flexDirection: "column",
gap: "15px"
}}>

<h1 style={{
color: "white",
textAlign: "center"
}}>
Login
</h1>

<input
placeholder="Phone Number"
value={phone}
onChange={(e) => setPhone(e.target.value)}
style={{
padding: "14px",
borderRadius: "10px",
border: "none"
}}
/>

<button
onClick={login}
style={{
padding: "14px",
borderRadius: "10px",
background: "#06b6d4",
color: "white",
fontWeight: "bold",
border: "none",
cursor: "pointer"
}}
>
Login
</button>

</div>

</div>

);

}
