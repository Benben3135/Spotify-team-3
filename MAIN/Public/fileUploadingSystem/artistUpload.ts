
interface Song {
    filename: string;
    file: Buffer;
    title: string;
    genre: string;
    _id?: string;
}


// async function getSongs(){
//     try {
//         const response = await fetch('/API/songs/get-song')
//         const result = await response.json();
//         const { songs } = result;
//         if(!Array.isArray(songs)) throw new Error("songs are not array")
//         console.log(songs)
//         console.log(result)
//         return songs;

//     } catch (error) {
//         console.error(error);
//         return []
//     }
// }

async function handleUploadSong(ev:any) {
    try {
        ev.preventDefault();
        // console.log(`wefwef`)
        const formData = new FormData();
        formData.append ('filename' , ev.target.filename.value);
        formData.append ('file' , ev.target.file.files[0]);
        formData.append ('title' , ev.target.title.value);
        formData.append ('genre' , ev.target.genre.value);
        // if(!filename || !file || !title || !genre) throw new Error("Please fill all fileds")

        // const song:Song = {filename, file, title, genre};
        const response = await fetch("/API/songs/upload-file", {
            method: 'POST',
            body: formData
        })

        if(response.ok){
            const result = await response.json();
            console.log(result);
        }
    } catch (error) {
        console.error(error.message)
    }

}
// async function handleUploadSong(ev:any) {
//     try {
//         ev.preventDefault();
//         // console.log(`wefwef`)
//         const filename = ev.target.filename.value
//         const file = ev.target.file.value
//         const title = ev.target.title.value
//         const genre = ev.target.genre.value
//         if(!filename || !file || !title || !genre) throw new Error("Please fill all fileds")

//         const song:Song = {filename, file, title, genre};
//         const response = await fetch("/API/songs/upload-file", {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(song)
//         })

//         if(response.ok){
//             const result = await response.json();
//             console.log(result);
//         }
//     } catch (error) {
//         console.error(error.message)
//     }

// }

async function getSongs(){
    try {
        const response = await fetch('/API/songs/get-song')
        const result = await response.json();
        const { songs } = result;
        if(!Array.isArray(songs)) throw new Error("songs are not array")
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
        <h2>filename: ${song.filename}</h2>
        <p>file: ${song.file}</p>
        <p>title: ${song.title}</p>
        <p>genre: ${song.genre}</p>
        </div>
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

    const rootSong = document.querySelector("#rootSong");
    renderSongs(songs, rootSong as HTMLDivElement)
}
/*
Patch
http://localhost:3000/API/songs/upload-file
*/

// async function handleUploadSong(ev: any) {
//     try {
//       ev.preventDefault();
//       const form = ev.target;
//       const formData = new FormData(form);
  
//       const response = await fetch("API/songs/upload-file", {
//         method: 'PATCH',
//         headers: {'Content-Type': 'mulpipart/form-data'},
//         body: formData, // Use FormData for file uploads
//       });
  
//       const result = await response.json();
//       console.log(result);
  
//     } catch (error) {
//       console.error(error)
//     }
//   }