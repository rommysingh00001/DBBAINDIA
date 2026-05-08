async function login() {

  const { data, error } =
    await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password)

  if (error) {

    alert('Database Error')

    console.log(error)

    return
  }

  if (!data || data.length === 0) {

    alert('Invalid Login')

    return
  }

  localStorage.setItem(
    'dbbaUser',
    JSON.stringify(data[0])
  )

  router.push('/dashboard')
}
