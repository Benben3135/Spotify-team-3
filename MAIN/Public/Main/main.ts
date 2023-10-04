isArtist();
async function isArtist(){
    console.log("i started!")
    const response = await fetch("http://localhost:3000/API/users/addArtistFunc");
    const {artistName} = await response.json();
    console.log(artistName);
    if(!artistName) console.log("no admin")
    else{
    buildArtistUtilities(artistName)
    }
}

function buildArtistUtilities(name:string){
    artistGreeting(name);
    artistUpload(name)
}

//artist functions:
function artistGreeting(name){

}

function artistUpload(name){
    const uploadBtn = document.querySelector("#uploadBtn") as HTMLElement;
    uploadBtn.style.display = "block";
    uploadBtn.addEventListener("click", () => {
        location.href = `../fileUploadingSystem/artistUpload.html?name=${name}`

    })
}














//--------------
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

