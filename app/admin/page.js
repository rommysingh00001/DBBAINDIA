import '../globals.css'

export default function Admin() {

  return (

    <main className="page">

      <h1>Admin Panel</h1>

      <input
        placeholder="Winning Number"
      />

      <button>
        Declare Result
      </button>

    </main>
  )
}
.adminPage{
padding:40px;
background:#050505;
min-height:100vh;
color:white;
}

.adminTitle{
font-size:50px;
color:gold;
margin-bottom:30px;
text-align:center;
font-weight:900;
}

.statsGrid{
display:grid;
grid-template-columns:repeat(3,1fr);
gap:20px;
margin-bottom:40px;
}

.statsCard{
background:#111;
padding:30px;
border-radius:25px;
border:1px solid #222;
text-align:center;
}

.statsCard h3{
color:#aaa;
margin-bottom:10px;
}

.statsCard h1{
font-size:40px;
color:#00ff66;
}

.resultBox{
background:#111;
padding:30px;
border-radius:25px;
margin-bottom:40px;
display:flex;
gap:20px;
align-items:center;
justify-content:center;
flex-wrap:wrap;
}

.resultBox input{
padding:16px;
width:300px;
border:none;
border-radius:12px;
background:#1a1a1a;
color:white;
font-size:18px;
}

.resultBox button{
padding:16px 30px;
background:gold;
border:none;
border-radius:12px;
font-weight:bold;
cursor:pointer;
font-size:18px;
}

.adminSection{
margin-top:40px;
background:#111;
padding:30px;
border-radius:25px;
overflow:auto;
}

.adminSection h2{
margin-bottom:25px;
font-size:32px;
color:gold;
}

table{
width:100%;
border-collapse:collapse;
}

table th{
background:#1f1f1f;
padding:18px;
text-align:left;
font-size:18px;
}

table td{
padding:18px;
border-top:1px solid #222;
font-size:17px;
}

.numberReport{
display:grid;
grid-template-columns:repeat(6,1fr);
gap:20px;
}

.numberCard{
background:#1a1a1a;
padding:25px;
border-radius:20px;
text-align:center;
border:1px solid #2b2b2b;
}

.numberCard h1{
font-size:38px;
color:gold;
margin-bottom:10px;
}

.numberCard p{
font-size:22px;
color:#00ff66;
}

@media(max-width:900px){

.statsGrid{
grid-template-columns:1fr;
}

.numberReport{
grid-template-columns:repeat(2,1fr);
}

}
