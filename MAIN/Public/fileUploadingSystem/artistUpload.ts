

interface Song {
    name: string;
    artist:String;
    email?: string;
    _id?: string;
}



async function handleAddSong(ev:any) {
    try {
        ev.preventDefault();
        const name = ev.target.name.value;
        const artist = ev.target.artist.value;
        if(!name || !artist) throw new Error("Please fill all fileds");

        const song:Song = { name,artist};
        const response = await fetch("/API/songs/add-song", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(song)
        })
        
        const result = await response.json();
        console.log(result)

    } catch (error) {
        console.error(error.message);
    }
}

async function getSongs(){
    try {
        const response = await fetch('/API/songs/get-song')
        const result = await response.json();
        const { songs } = result;
        if(!Array.isArray(songs)) throw new Error("Songs are not array")
        console.log(songs)
        console.log(result)
        return songs;

    } catch (error) {
        console.error(error);
        return []
    }
}

function renderSongHtml(song:Song ) {
    try {
        const html = `<div class="song-container">
        <h2>name: ${song.name}</h2>
        <p>artist: ${song.artist}</p>
        </div>
        <form id="${song._id}" onsubmit="handleUpdateName(event)">
           <input type="string" name="name" value="${song.name}" placeholder="name">
           <button type="submit">Update</button>
        </form>
        <button id="delete" onclick="handleDeleteSong('${song._id}')">Delete</button>
        `
        return html;
    } catch (error) {
        console.error(error);
        return ""
    }
}

function renderSongs(songs:Song[] , HTMLElement:HTMLDivElement) {
    try {
        if(!HTMLElement) throw new Error("HTMLElement not found")
        console.log(songs)
    if(!Array.isArray(songs)) throw new Error("songs are not array");
    const songsHTML = songs.map(song=> renderSongHtml(song)).join("")
    HTMLElement.innerHTML = songsHTML;
    } catch (error) {
        console.error(error)
    }
}

async function handleGetSong(){
    const songs = await getSongs();

    const rootsong = document.querySelector("#rootSong");
    renderSongs(songs, rootsong as HTMLDivElement)
}

async function handleDeleteSong(songId:string) {
    try {
        console.log(songId)
        const response = await fetch('/API/songs/delete-song',{
            method:'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({songId})
        });
        const result = await response.json();
        const { songs } = result;

        renderSongs(songs, document.querySelector("#rootSong"))

    } catch (error) {
        console.error(error)
    }
}

async function handleUpdateName(ev:any){
    try {
        ev.preventDefault();
        const name = ev.target.name.value;
        const id = ev.target.id;
        console.log( id, name );

        const response = await fetch('/API/songs/update-song-name', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id, name })
        })

        const result = await response.json();
        console.log(result);
        const { songs } = result;
        renderSongs(songs, document.querySelector('#rootSong') as HTMLDivElement);
    } catch (error) {
        console.error(error)
    }
}

// async function handleGetUser(){
//     try {
//         //Ask server to get the user
//         const response = await fetch('API/users/get-user');
//         const data = await response.json();
//         console.log(data)
//     } catch (error) {
//         console.error(error)
//     }
// }

// async function handleGetUsers(){
//     try {
//         //ask the server to get the user
//         const response = await fetch("API/users/get-users")
//         const data = await response.json();
//         console.log(data)
//     } catch (error) {
//         console.error(error)
//     }
// }