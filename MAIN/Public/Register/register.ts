async function handleRegister(ev: any) {
  try {

    ev.preventDefault();
    const name = ev.target.name.value;
    const email = ev.target.email.value;
    const password = ev.target.password.value;
    const user = { name, email, password };
    if (!user.email || !user.password) throw new Error("missing some details");
  const response = await fetch("http://localhost:3000/API/users/register ", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();


  console.log(data);
  // go to Log in page   
  window.location.href = `http://localhost:3000/index.html`;

  } catch (error) {
    console.error(error);
  }

}








