function getNameFromQuery() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('name');
}
function getArtistFromQuery() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('artist');
}
function getfilenameFromQuery() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('filename');
}
fetch("/get-songs")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    var name = getNameFromQuery();
    var artist = getArtistFromQuery();
    console.log(data);
    data.forEach(function (song) {
        if (song.metadata.name == name && song.metadata.artist == artist) {
            renderSongPage(song.metadata);
        }
    });
})["catch"](function (error) {
    console.error("Error fetching songs:", error);
});
function renderSongPage(song) {
    var artist = song.artist;
    var name = song.name;
    var img = song.img;
    var songPage = document.querySelector(".songPage");
    songPage.innerHTML +=
        "<div class=\"song\">\n            <img class=\"song__bigimg\" src=\"" + img + "\" alt=\"\">\n            <img class=\"song__img\" src=\"" + img + "\" alt=\"\">\n            <div class=\"song__name\">" + name + "</div>\n            <div class=\"song__artist\" onclick=\"artistPage('" + artist + "')\">" + artist + "</div>\n        </div>";
    var songPage__song = document.querySelector(".songPage__song");
}
playSong();
function playSong() {
    try {
        var name = getNameFromQuery();
        var artist = getArtistFromQuery();
        var filename = getfilenameFromQuery();
        var audioPlayer = document.getElementById('audio-player');
        audioPlayer.pause(); // Pause the audio if it's playing
        // Set the new source
        var constructedURL = "/play-song?filename=" + filename;
        console.log("Constructed URL:", constructedURL);
        audioPlayer.src = constructedURL;
        audioPlayer.addEventListener('error', function (e) {
            console.error('Audio player error:', e);
        });
        // Start playing the new audio
        audioPlayer.play();
    }
    catch (error) {
        console.error("Error playing song:", error);
    }
}
function artistPage(artist) {
    window.location.href = "../Artist_Page/artistPage.html?artist=" + artist;
}
