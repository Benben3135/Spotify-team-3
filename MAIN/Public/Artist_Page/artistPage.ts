

interface Song {
    name: string;
    artist: String;
    email?: string;
    _id?: string;
}




function getNameArtistFromQuery() {
    debugger;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('artist');
}

getArtistData()
async function getArtistData() {
    const artistName = getNameArtistFromQuery();
    const response = await fetch(`http://localhost:3000/API/users/get-artist-data?artist=${artistName}`);
    const data = await response.json();
    renderArtistData(data.artistData);
}
function renderArtistData(artist) {
    const artistImg = artist.artistImg;
    const artistInfo = artist.artistInfo;
    const artistName = artist.artistName;
    const artistImgRoot = document.querySelector(".artistWrapper__artistImg")
    const artistInfoRoot = document.querySelector(".artistWrapper__info")
    const artistNameRoot = document.querySelector(".artistWrapper__name")
    artistImgRoot.innerHTML = `<img class="artistWrapper__artistImg__img" src="${artistImg}" alt="">`
    artistInfoRoot.innerHTML = artistInfo;
    artistNameRoot.innerHTML = artistName;
}
async function getArtistSongs() {
    const artist = getNameArtistFromQuery();
    const response = await fetch(`/get-artist-songs?artist=${artist}`);
    const data = await response.json();
    return data;
}
renderArtistSongs()
async function renderArtistSongs() {
    debugger;
    const artistSongs: Song[] = await getArtistSongs();
    artistSongs.forEach(song => {
        renderSong(song.metadata, song)
    })

}

function renderSong(song, songFull) {
    console.log(songFull)
    const name = song.name;
    const artist = song.artist;
    const filename = songFull.filename;

    const songsDiv = document.querySelector(".songs")
    const html =
    `<div class="songs__song" onclick="songPage('${artist}','${name}','${filename}')">
        <img class="songs__song__img" src="${song.img}" alt="">
        <div class="songs__song__name">${song.name}</div>
        <div class="songs__song__artist">${song.artist}</div>
    </div>`
    songsDiv.innerHTML += html;

}

function songPage(artist,name,filename){
    debugger;
    location.href = `../songPage/songPage.html?artist=${artist}&name=${name}&filename=${filename}`
}
