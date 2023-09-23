async function handleSignIn(ev:any){
    try {
        ev.preventDefault();
        const email = ev.target.email.value;
        const password = ev.target.password.value;
        const response = await fetch("API/users/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({email,password}),
        });
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.error(error)
    }
}