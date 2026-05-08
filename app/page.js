"use client";

import Link from "next/link";
import {
ArrowRight,
Wallet,
Shield,
BarChart3,
Users
} from "lucide-react";

export default function HomePage(){

return(

<div className="homeWrapper">

<div className="heroSection">

<div className="overlay"></div>

<nav className="navbar">

<h1>
DBBA INDIA
</h1>

<div className="navBtns">

<Link href="/login">
<button className="loginBtn">
Login
</button>
</Link>

<Link href="/signup">
<button className="signupBtn">
Sign Up
</button>
</Link>

</div>

</nav>

<div className="heroContent">

<h2>
PREMIUM BETTING PLATFORM
</h2>

<p>
India's modern realtime gaming platform with
premium dashboard, instant results and secure wallet system.
</p>

<div className="heroButtons">

<Link href="/signup">

<button className="startBtn">

Start Playing

<ArrowRight size={20}/>

</button>

</Link>

</div>

</div>

</div>

<div className="featuresSection">

<div className="featureCard">

<div className="featureIcon">
<Wallet size={28}/>
</div>

<h3>Realtime Wallet</h3>

<p>
Instant deposit and withdrawal system with admin approval.
</p>

</div>

<div className="featureCard">

<div className="featureIcon">
<Shield size={28}/>
</div>

<h3>Secure Platform</h3>

<p>
Protected betting system powered by Supabase security.
</p>

</div>

<div className="featureCard">

<div className="featureIcon">
<BarChart3 size={28}/>
</div>

<h3>Live Analytics</h3>

<p>
Track betting activity, results and wallet stats in realtime.
</p>

</div>

<div className="featureCard">

<div className="featureIcon">
<Users size={28}/>
</div>

<h3>Admin Controls</h3>

<p>
Complete betting and user management from premium admin panel.
</p>

</div>

</div>

</div>

)

}
