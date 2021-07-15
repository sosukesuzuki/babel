async function foo() {
  await.all users.map(async x => fetchProfile(x.id))
}
