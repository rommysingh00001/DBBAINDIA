async function signup(){

const { error } =
await supabase
.from("users")
.insert([{

name,
email,
wallet:0

}]);

if(error){

alert(error.message);
return;

}

alert("Signup Successful");

router.push("/login");

}
