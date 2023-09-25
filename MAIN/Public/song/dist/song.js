var audioPlayer = document.getElementById('audio-player');
function playSong() {
    audioPlayer.src = "/play/" + songFile;
    audioPlayer.load();
    audioPlayer.play();
}
