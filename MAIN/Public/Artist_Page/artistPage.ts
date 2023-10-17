

interface Song {
    name: string;
    artist:String;
    email?: string;
    _id?: string;
}




function getNameArtistFromQuery() {
    debugger;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('artist');
  }
  renderArtistName()
function renderArtistName(){
    const artist = getNameArtistFromQuery();
    const nameRoot = document.querySelector(".name")
    nameRoot.innerHTML += `${artist}`
}

async function getArtistSongs() {
    const artist = getNameArtistFromQuery();
    const response = await fetch(`/get-artist-songs?artist=${artist}`);
    const data = await response.json();
    return data;
}
renderArtistSongs()
async function renderArtistSongs(){
    debugger;
    const artistSongs:Song[] =  await getArtistSongs();
    artistSongs.forEach(song => {
        renderSong(song.metadata)
    })
   
}

function renderSong(song){
    const songsDiv = document.querySelector(".songs")
    const html =
    `<div song>
    <div class="song__name">${song.name}</div>
    <div class="song__artist">${song.artist}</div>
    <img class="song__img" src="${song.img}" alt="">
    </div>`
    songsDiv.innerHTML += html;

}
