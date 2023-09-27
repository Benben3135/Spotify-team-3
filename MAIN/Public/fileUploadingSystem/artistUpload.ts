interface Song {
    filename: string;
    file: string;
    _id?: string;
}



async function handleUploadSong(ev:any) {
    try {
        ev.preventDefault();
        // console.log(`wefwef`)
        const filename = ev.target.filename.value
        const file = ev.target.file.value
        if(!filename || !file) throw new Error("Please fill all fileds")

        const song:Song = {filename, file};
        const response = await fetch("API/songs/upload-file", {
            method: 'PATCH',
            headers: {'Content-Type': 'mulpipart/form-data'},
            body: JSON.stringify(song)
        })

        const result = await response.json();
        console.log(result);
        
    } catch (error) {
        console.error(error)
    }

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