var songs = /** @class */ (function () {
    function songs(_id, name, artist, src, img, wiki, love) {
        this._id = _id;
        this.name = name;
        this.artist = artist;
        this.src = src;
        this.img = img;
        this.wiki = wiki;
        this.love = love;
    }
    return songs;
}());
var playicon = document.querySelector("#playicon");
var pauseicon = document.querySelector("#pauseicon");
var image = document.querySelector(".songWrapper__img");
// make the pause/play icon to not show simultaniously
if (playicon) {
    playicon.style.display = "block";
}
if (pauseicon) {
    pauseicon.style.display = "none";
}
var audioElement = null;
var playbackPosition = 0;
var intervalId = null;
// event listener that recieve a click on the song image and make the sound stop/play and checks the time it stopped in, it changes the icons as well 
image === null || image === void 0 ? void 0 : image.addEventListener("click", function () {
    if (!audioElement) {
        audioElement = new Audio(selectedSong.src);
        audioElement.addEventListener("ended", function () {
            audioElement === null || audioElement === void 0 ? void 0 : audioElement.pause();
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
        var currentTime = new Date().getTime();
        if (playicon)
            playicon.style.display = "none";
        if (pauseicon) {
            pauseicon.style.display = "block";
            if (new Date().getTime() - currentTime >= 4) {
                pauseicon.style.display = "none";
            }
        }
        intervalId = setInterval(updateTimeAndProgress, 1000);
    }
    else {
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
        if (audioElement) {
            var progressElement = document.querySelector("#progress");
            var timeElement = document.querySelector("#time");
            //you didint checked that the element is not null
            var progress = (audioElement.currentTime / audioElement.duration) * 100;
            progressElement.style.width = progress + "%";
            var minutes = Math.floor(audioElement.currentTime / 60);
            var seconds = Math.floor(audioElement.currentTime % 60);
            timeElement.textContent = minutes + ":" + seconds.toString().padStart(2, "0");
        }
    }
    catch (error) {
        console.error(error);
    }
}
