





async function handleRegister(ev: any) {
  try {
    debugger;
    ev.preventDefault();
    const name = ev.target.name.value;
    const email = ev.target.email.value;
    const password = ev.target.password.value;
    const user = { name, email, password };
    const response = await fetch("API/users/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const confirmationCode = await response.json();
    console.log(confirmationCode);

  
    // openConfirmationTab()



    // registerConfirmed(user);
  } catch (error) {
    console.error(error);
  }

}


async function registerConfirmed(user) {
  if (!user.email || !user.password) throw new Error("missing some details");
  const response = await fetch("API/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();


  console.log(data);
  // go to Log in page   
  window.location.href = `LogIn.html`;
}








