async function handleSignIn(ev:any){
    try {
        debugger;
        ev.preventDefault();
        const email = ev.target.email.value;
        const password = ev.target.password.value;
        console.log(email,password);
        const response = await fetch("/API/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log(data);
        window.location.href = `./main/main.html?email=${email}`;
        
    } catch (error) {
        console.error(error);
    }
}