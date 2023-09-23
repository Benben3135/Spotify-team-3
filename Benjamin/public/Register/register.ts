async function handleSignUp(ev:any) {
    try {
        console.log("handleSignUp");
        ev.preventDefault();
        const name = ev.target.name.value;
        const email = ev.target.email.value;
        const password = ev.target.password.value;
        console.log({ name, email, password })
        const response = await fetch("/API/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        console.log(data);
        if (data.ok) {
            alert("user created");
            window.location.href = "/index.html";
        }
        else {
            alert("something went wrong");
        }
    }
    catch (error) {
        console.error(error);
    }};