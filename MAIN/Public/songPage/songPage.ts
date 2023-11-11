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
            <img class="song__bigimg" src="${img}" alt="">
            <img class="song__img" src="${img}" alt="">
            <div class="song__name">${name}</div>
            <div class="song__artist" onclick="artistPage('${artist}')">${artist}</div>
            <i onclick="liked('${artist}','${name}')" class="fas fa-heart fa-lg heart heart__icon"></i>
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

function artistPage(artist) {
  window.location.href = `../Artist_Page/artistPage.html?artist=${artist}`
}


async function liked(artist, name) {
  debugger;
  const check = await checkIfLiked()
  console.log("liked func get this" , check)
  if (check.true) {
    await deleteLike()
    console.log("unliked!")
  }
  else {
    console.log("song didnt marked as liked")
    debugger;
    const dataSend = {
      artist: artist,
      name: name
    };
    const response = await fetch("http://localhost:3000/API/user_songs/likedSongs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSend),
    });
    const data = await response.json();
  }
}






async function checkIfLiked() {
  const filename = getfilenameFromQuery();
  const response = await fetch(`http://localhost:3000/API/user_songs/likedCheck?filename=${filename}`);
  debugger;
    const isLiked = await response.json();
    return isLiked;
}




async function deleteLike() {
  const filename = getfilenameFromQuery();

  const response = await fetch("http://localhost:3000/API/user_songs/DeletelikedSongs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filename }),
  });
  const data = await response.json();
  console.log(data)
}

document.addEventListener("DOMContentLoaded", () => {
  checkIfLikedTurnRed()
})

async function checkIfLikedTurnRed() {
  const filename = getfilenameFromQuery();
  debugger;

  const response = await fetch(`http://localhost:3000/API/user_songs/likedCheck?filename=${filename}`);
  console.log("response:", response);
  
    const isLiked = await response.json();
    if (isLiked) {
      const heart = document.querySelector(".heart__icon") as HTMLDivElement;
      heart.style.color = "red";
    }
   
}


async function songPage(artist, name, filename) {
  window.location.href = `../songPage/songPage.html?artist=${artist}&name=${name}&filename=${filename}`;
}


async function shuffle() {
  try {
      const response = await fetch(`http://localhost:3000/get-songs`)
      const data = await response.json()
      const randomArr = randomSortNumbers(data.length);
      const randomIndex = randomArr[0];
      const randomSong = data[randomIndex];
      console.log(randomSong)
      songPage(randomSong.metadata.artist ,randomSong.metadata.name, randomSong.filename)
  } catch (error) {
      console.error(error);
  }
}

function randomSortNumbers(limit: number): number[] {
  let numbers = Array.from({length: limit + 1}, (_, index) => index);

  for (let i = numbers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return numbers;
}