getUserData();

class User{
    constructor(
      public name: string,
      public email: string,
      public password: string,
      public admin: boolean,
      public createdAt:Date,
      public artistName?: string,
      ){}
  }
//--------------
async function getUserData(){
    const response = await fetch(`/API/users/get-User`);
        const user:User = await response.json();
        return user;
}
//function that changes the deocument title according to users name
function manageTitle() {
    const user = getUserData();
    // const name = user.name;
    const title = document.querySelector('#title')
    title.innerHTML = `SoundMaster`
}



isArtist();
async function isArtist(){
    console.log("i started!")
    const response = await fetch("/API/users/addArtistFunc");
    const {artistName} = await response.json();
    console.log(artistName);
    if(!artistName) throw new Error("no admin")
    else{
    buildArtistUtilities(artistName)
    }
}

function buildArtistUtilities(name:string){
    addUploadBtn()
    artistGreeting(name);
    artistUpload(name)
    artistPageBtn(name)
    artistTXT()
}

//artist functions:
function addUploadBtn(){
    const upperBar = document.querySelector(".upperBar") as HTMLElement;
    upperBar.innerHTML += `<div id="uploadBtn"><i class="fas fa-upload fa-lg upload upperBar__icon" style="color: #ffffff;"></i></div>    <div id="artistPageBtn"><i class="fas fa-music fa-lg music upperBar__icon" style="color: #ffffff;"></i></div>`
   
}


function artistGreeting(name){

}

function artistUpload(name){
    const uploadBtn = document.querySelector("#uploadBtn") as HTMLElement;
    uploadBtn.style.display = "block";
    uploadBtn.addEventListener("click", () => {
        location.href = `../fileUploadingSystem/artistUpload.html?name=${name}`

    })
}
function artistPageBtn(name){
    const artistPageBtn = document.querySelector("#artistPageBtn") as HTMLElement;
    artistPageBtn.style.display = "block";
    artistPageBtn.addEventListener("click", () => {
        // artistPage(name);
    })
}

function artistTXT(){
    
const creatorTXT = document.querySelector("#creatorTXT") as HTMLElement;
creatorTXT.style.display = "block";
}

async function docs(){
    const user:User = await getUserData();
    const name = user.name;
    const createdAt = user.createdAt;
    const createdAtDate = new Date(createdAt);
    const year = createdAtDate.getFullYear();
    const month = createdAtDate.getMonth()+1;
    const day = createdAtDate.getDay();
    const createdAtString = `${day}/${month}/${year}`;
    const admin = user.admin;
    const docs = document.querySelector(".docs") as HTMLElement;
    docs.style.display = "flex";
    document.addEventListener("click", () => {
        docs.style.display = "none";
    })

    const userData = document.querySelector(".docs__user") as HTMLElement;
    if(admin) userData.innerHTML = `Username: '${name}' <br> Created at: '${createdAtString}' <br> OFFICIAL CREATOR`
    else{
        userData.innerHTML = `Username: '${name}' <br> Created at: '${createdAt}' `

    }
}

//getting the songs from the server:
fetch("/get-songs")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.forEach((song) => {
        renderSong(song.metadata, song.filename)

  })
  })
  .catch((error) => {
    console.error("Error fetching songs:", error);
  });





function renderSong(song,filename){
    debugger;

    const artist = song.artist;
    const name = song.name;
    const img = song.img;
    const reccomendedSongsBox = document.querySelector("#reccomended") as HTMLElement;
    reccomendedSongsBox.innerHTML += 
    `<div onclick="songPage('${artist}','${name}','${filename}')" class="songsBox__song">
        <img class="songsBox__song__img" src="${img}" alt="">
        <div class="songsBox__song__name">${name}</div>
        <div class="songsBox__song__artist">${artist}</div>
    </div>`


}

function songPage(artist,name,filename){
    debugger;
    location.href = `../songPage/songPage.html?artist=${artist}&name=${name}&filename=${filename}`
}







