
class songs {
  constructor(public _id: string, public name: string, public artist: string, public src: string, public img: string, public wiki: string,  public love:boolean) { }
}


const playicon: HTMLDivElement | null = document.querySelector("#playicon")
const pauseicon: HTMLDivElement | null = document.querySelector("#pauseicon")
const image = document.querySelector(".songWrapper__img")

// make the pause/play icon to not show simultaniously
if (playicon) {
  playicon.style.display = "block"
}
if (pauseicon) {
  pauseicon.style.display = "none"
}

let audioElement: HTMLAudioElement | null = null;
let playbackPosition = 0;
let intervalId: number | null = null;

// event listener that recieve a click on the song image and make the sound stop/play and checks the time it stopped in, it changes the icons as well 
image?.addEventListener("click", () => {
  if (!audioElement) {
    audioElement = new Audio(selectedSong.src);
    audioElement.addEventListener("ended", () => {
      audioElement?.pause();
      if (audioElement)
        audioElement.currentTime = 0;
      playbackPosition = 0;
      if (playicon)
        playicon.style.display = "block";
      if (pauseicon)
        pauseicon.style.display = "none";
      if (intervalId)
        clearInterval(intervalId);
    });
  }

  if (audioElement.paused) {
    audioElement.currentTime = playbackPosition;
    audioElement.play();
    let currentTime = new Date().getTime();

    if (playicon)
      playicon.style.display = "none";
    if (pauseicon) {
      pauseicon.style.display = "block";
      if (new Date().getTime() - currentTime >= 4) {
        pauseicon.style.display = "none";
      }

    }
    intervalId = setInterval(updateTimeAndProgress, 1000);
  } else {
    playbackPosition = audioElement.currentTime;
    audioElement.pause();
    if (playicon)
      playicon.style.display = "block";
    if (pauseicon)
      pauseicon.style.display = "none";
    if (intervalId)
      clearInterval(intervalId);
  }
});
//================================
//LAST LISTENED

// this function get the lastListenedSongs which is an Array with the last 6 songs, from the local storage and parses it back into an object it creates a new Array and shifts it if
// the aray is longer then 6 songs. then it calls the createLastListenedHTML function with the new songsArray.

//================================
//this function creates the timeline based on the current time and progress of the audio.
function updateTimeAndProgress() {
  try {
    if(audioElement){
    const progressElement = document.querySelector("#progress") as HTMLDivElement;
    const timeElement = document.querySelector("#time") as HTMLDivElement;
//you didint checked that the element is not null
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    progressElement.style.width = `${progress}%`;
    const minutes = Math.floor(audioElement.currentTime / 60);
    const seconds = Math.floor(audioElement.currentTime % 60);
    timeElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;}
  } catch (error) {
    console.error(error);
  }

}

