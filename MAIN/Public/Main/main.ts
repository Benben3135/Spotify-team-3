async function getUserData(){
    const response = await fetch(`/API/users/get-User`);
        const user = await response.json();
        return user;
}
//function that changes the deocument title according to users name
function manageTitle() {
    const user = getUserData();
    // const name = user.name;
    const title = document.querySelector('#title')
    title.innerHTML = `SoundMaster`
}

