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

window.location.href = "/dashboard";

}
