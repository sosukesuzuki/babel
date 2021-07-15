async function foo() {
  await Promise.all(users.map(async x => fetchProfile(x.id)));
}
