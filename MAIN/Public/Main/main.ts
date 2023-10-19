getUserData();

class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public admin: boolean,
        public createdAt: Date,
        public artistName?: string,
    ) { }
}
//--------------
async function getUserData() {
    const response = await fetch(`/API/users/get-User`);
    const user: User = await response.json();
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
async function isArtist() {
    const response = await fetch("http://localhost:3000/API/users/addArtistFunc");
    const { artistName } = await response.json();
    if (!artistName)("no admin")
    else {
        buildArtistUtilities(artistName)
    }
}

function buildArtistUtilities(name: string) {
    addUploadBtn()
    artistGreeting(name);
    artistUpload(name)
    artistPageBtn(name)
    artistTXT()
}

//artist functions:
function addUploadBtn() {
    const upperBar = document.querySelector(".upperBar") as HTMLElement;
    upperBar.innerHTML += `<div id="uploadBtn"><i class="fas fa-upload fa-lg upload upperBar__icon" style="color: #ffffff;"></i></div>    <div id="artistPageBtn"><i class="fas fa-music fa-lg music upperBar__icon" style="color: #ffffff;"></i></div>`

}


function artistGreeting(name) {

}

function artistUpload(name) {
    const uploadBtn = document.querySelector("#uploadBtn") as HTMLElement;
    uploadBtn.style.display = "block";
    uploadBtn.addEventListener("click", () => {
        location.href = `../fileUploadingSystem/artistUpload.html?name=${name}`

    })
}
function artistPageBtn(name) {
    const artistPageBtn = document.querySelector("#artistPageBtn") as HTMLElement;
    artistPageBtn.style.display = "block";
    artistPageBtn.addEventListener("click", () => {
        // artistPage(name);
    })
}

function artistTXT() {

    const creatorTXT = document.querySelector("#creatorTXT") as HTMLElement;
    creatorTXT.style.display = "block";
}

async function docs() {
    const user: User = await getUserData();
    const name = user.name;
    const createdAt = user.createdAt;
    const createdAtDate = new Date(createdAt);
    const year = createdAtDate.getFullYear();
    const month = createdAtDate.getMonth() + 1;
    const day = createdAtDate.getDay();
    const createdAtString = `${day}/${month}/${year}`;
    const admin = user.admin;
    const docs = document.querySelector(".docs") as HTMLElement;
    docs.style.display = "flex";
    document.addEventListener("click", () => {
        docs.style.display = "none";
    })

    const userData = document.querySelector(".docs__user") as HTMLElement;
    if (admin) userData.innerHTML = `Username: ${name} <br> Created at: ${createdAtString} <br> OFFICIAL CREATOR`
    else {
        userData.innerHTML = `Username: ${name} <br> Created at: ${createdAt} `

    }
}

//getting the songs from the server:

function renderSong(song, filename) {
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



// getting the liked songs from the server

fetch("http://localhost:3000/API/user_songs/get-Liked-songs")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((song) => {
            const fileName = song.fileName;
            getSongByFilename(fileName);
        })
    })
    .catch((error) => {
        console.error("Error fetching songs:", error);
    });

async function getSongByFilename(filename) {
    try {
        const response = await fetch(`/get-song-by-filename?filename=${filename}`);

        // Check if response is not successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        renderLikedSongs(data.metadata, data.filename);


    } catch (error) {
        console.error("Error fetching songs:", error);
        return null; // Or throw the error again depending on your error handling strategy
    }
}

function renderLikedSongs(song, filename) {
    const artist = song.artist;
    const name = song.name;
    const img = song.img;
    const reccomendedSongsBox = document.querySelector("#liked") as HTMLElement;
    reccomendedSongsBox.innerHTML +=
        `<div onclick="songPage('${artist}','${name}','${filename}')" class="songsBox__song">
        <img class="songsBox__song__img" src="${img}" alt="">
        <div class="songsBox__song__name">${name}</div>
        <div class="songsBox__song__artist">${artist}</div>
    </div>`
}

async function songPage(artist, name, filename) {
    debugger;
    await addGenreAlgorithm(filename);
    await addStamina(filename);
    window.location.href = `../songPage/songPage.html?artist=${artist}&name=${name}&filename=${filename}`;
}
async function addGenreAlgorithm(filename) {
    debugger;
    const response = await fetch(`http://localhost:3000/API/songsAlgorithms/addGenereLiked`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename }),
    });
    // Handle non-200 HTTP response status
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.ok) {
        // You may want to do something if data.ok is false
        console.error("Server responded with an error:", data.error);
    }
}

//generate the favourite genres:
getGeneres();
async function getGeneres() {
    const response = await fetch("http://localhost:3000/API/songsAlgorithms/getGeneres");

    const dataFromServer = await response.json();
    delete dataFromServer.email;
    delete dataFromServer._id;
    delete dataFromServer.__v;

    const sortedGenres = Object.entries(dataFromServer).sort((a, b) => b[1] - a[1]);
    const topGenre = sortedGenres[0][0];
    const secondtopGenre = sortedGenres[1][0];
    const thirdtopGenre = sortedGenres[2][0];
    rendertopGenre(topGenre)
    renderSecondGenre(secondtopGenre)
    renderThirddGenre(thirdtopGenre)

}

async function rendertopGenre(topGenre) {
    const response = await fetch(`/get-topGenre?topGenre=${topGenre}`)
    const topGenreSongs: Song[] = await response.json()
    const numberOfSongsToSelect = Math.min(3, topGenreSongs.length);

    const selectedSongs: Song[] = [];
    const indicesSelected: Set<number> = new Set();

    while (indicesSelected.size < numberOfSongsToSelect) {
        const randomIndex = Math.floor(Math.random() * topGenreSongs.length);
        if (!indicesSelected.has(randomIndex)) {
            indicesSelected.add(randomIndex);
            selectedSongs.push(topGenreSongs[randomIndex]);
        }
    }
    renderSelectedSongs(selectedSongs)

}

async function renderSecondGenre(secondtopGenre) {
    const response = await fetch(`/get-topGenre?topGenre=${secondtopGenre}`)
    const topGenreSongs: Song[] = await response.json()
    const numberOfSongsToSelect = Math.min(2, topGenreSongs.length);

    const selectedSongs: Song[] = [];
    const indicesSelected: Set<number> = new Set();

    while (indicesSelected.size < numberOfSongsToSelect) {
        const randomIndex = Math.floor(Math.random() * topGenreSongs.length);
        if (!indicesSelected.has(randomIndex)) {
            indicesSelected.add(randomIndex);
            selectedSongs.push(topGenreSongs[randomIndex]);
        }
    }
    renderSelectedSongs(selectedSongs)

}

async function renderThirddGenre(thirdtopGenre) {
    const response = await fetch(`/get-topGenre?topGenre=${thirdtopGenre}`)
    const topGenreSongs: Song[] = await response.json()
    const numberOfSongsToSelect = Math.min(1, topGenreSongs.length);

    const selectedSongs: Song[] = [];
    const indicesSelected: Set<number> = new Set();

    while (indicesSelected.size < numberOfSongsToSelect) {
        const randomIndex = Math.floor(Math.random() * topGenreSongs.length);
        if (!indicesSelected.has(randomIndex)) {
            indicesSelected.add(randomIndex);
            selectedSongs.push(topGenreSongs[randomIndex]);
        }
    }
    renderSelectedSongs(selectedSongs)

}

async function renderSelectedSongs(selectedSongs: Song[]) {
    selectedSongs.forEach(song => {
        renderGenreSongs(song.metadata, song.filename)
    })
}

function renderGenreSongs(song, filename) {
    const artist = song.artist;
    const name = song.name;
    const img = song.img;
    const reccomendedSongsBox = document.querySelector("#genre") as HTMLElement;
    reccomendedSongsBox.innerHTML +=
        `<div onclick="songPage('${artist}','${name}','${filename}')" class="songsBox__song">
        <img class="songsBox__song__img" src="${img}" alt="">
        <div class="songsBox__song__name">${name}</div>
        <div class="songsBox__song__artist">${artist}</div>
    </div>`
}

//stamina:

async function addStamina(filename) {
    debugger;
    const response = await fetch(`http://localhost:3000/API/songsAlgorithms/addStamina`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename }),
    });
    // Handle non-200 HTTP response status
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.ok) {
        // You may want to do something if data.ok is false
        console.error("Server responded with an error:", data.error);
    }
}


getStaminas();
async function getStaminas() {
    const response = await fetch("http://localhost:3000/API/songsAlgorithms/getStaminas");

    const dataFromServer = await response.json();
    let staminasArr = []
    dataFromServer.forEach(song => {
        debugger;
        delete song.email;
        delete song.__v;
        delete song._id;
        staminasArr.push(song)
    })
    console.log(staminasArr)
   const sortedArr =  staminasArr.sort((a, b) => b.stamina - a.stamina);
   const length = sortedArr.length;
   for(let i=0 ; i<length; i++){
    getArtistSongs(sortedArr[i])
   }
}

async function getArtistSongs(song){
const artist = song.artistName;
const response = await fetch(`http://localhost:3000/get-artist-songs?artist=${artist}`)
const data = await response.json()
const length = data.length
function getRandomInt(x: number): number {
    return Math.floor(Math.random() * (x + 1));
}
debugger;
const randomNumber = getRandomInt(length);
const songToRender = data[randomNumber]
console.log(songToRender)

renderSong(songToRender.metadata, songToRender.filename)
}