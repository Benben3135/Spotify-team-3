async function handleRegister(ev: any) {

    ev.preventDefault();
    const name = ev.target.name.value;
    const email = ev.target.email.value;
    const password = ev.target.password.value;
    const artistName = ev.target.artistName.value;
    //register an artist
    if (artistName) {
      const user = { name, email, password, artistName };
      if (!user.email || !user.password) throw new Error("missing some details");
      const response = await fetch("http://localhost:3000/API/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        // Handle the error, show an alert, log it, etc.
        const errorData = await response.json();
        console.error("Registration error:", errorData.error);
        return;
      }
      
      const data = await response.json();
      if (data.error) {
        alert(data.error);
        return;
      }
 
      window.location.href = `http://localhost:3000/index.html`;



    }
    //register for not an artist user
    else {
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
 
      window.location.href = `http://localhost:3000/index.html`;
    }


  }








