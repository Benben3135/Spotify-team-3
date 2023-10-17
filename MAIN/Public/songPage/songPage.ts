function getNameFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('name');
}
function getArtistFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('artist');
}
function getfilenameFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('filename');
}

fetch("/get-songs")
  .then((response) => response.json())
  .then((data) => {
    const name = getNameFromQuery();
    const artist = getArtistFromQuery();
    console.log(data);
    data.forEach((song) => {
      if (song.metadata.name == name && song.metadata.artist == artist) {
        renderSongPage(song.metadata)
      }
    })

  })
  .catch((error) => {
    console.error("Error fetching songs:", error);
  });


function renderSongPage(song) {

  const artist = song.artist;
  const name = song.name;
  const img = song.img;
  const songPage = document.querySelector(".songPage") as HTMLElement;
  songPage.innerHTML +=
    `<div class="song">
            <img class="song__img" src="${img}" alt="">
            <div class="song__name">${name}</div>
            <div class="song__artist">${artist}</div>
        </div>`

  const songPage__song = document.querySelector(".songPage__song") as HTMLElement;
}
playSong()
function playSong() {
  try {
    const name = getNameFromQuery();
    const artist = getArtistFromQuery();
    const filename = getfilenameFromQuery();

    const audioPlayer = document.getElementById('audio-player') as HTMLAudioElement;
    audioPlayer.pause(); // Pause the audio if it's playing

    // Set the new source
    const constructedURL = `/play-song?filename=${filename}`;
    console.log("Constructed URL:", constructedURL);
    audioPlayer.src = constructedURL;
    audioPlayer.addEventListener('error', function (e) {
      console.error('Audio player error:', e);
    });


    // Start playing the new audio
    audioPlayer.play();




  } catch (error) {
    console.error("Error playing song:", error);
  }
}



