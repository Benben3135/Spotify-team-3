const audioPlayer = document.getElementById('audio-player') as HTMLAudioElement;
function playSong() {
  audioPlayer.src = `/play/${songFile}`;
  audioPlayer.load();
  audioPlayer.play();
}