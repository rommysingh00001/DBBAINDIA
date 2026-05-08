async function login() {

  const { data, error } =
    await supabase
      .from('users')
      .select('*')

  console.log(data)

  if (error) {

    console.log(error)

    alert('Database Error')

    return
  }

  const foundUser =
    data.find(
      (item) =>
        item.email?.trim() === email.trim()
        &&
        item.password?.trim() === password.trim()
    )

  if (!foundUser) {

    alert('Invalid Login')

    return
  }

  localStorage.setItem(
    'dbbaUser',
    JSON.stringify(foundUser)
  )

  router.push('/dashboard')
}
