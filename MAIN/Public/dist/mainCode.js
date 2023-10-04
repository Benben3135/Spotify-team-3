// class for songs (need to be change to sracture that will match)
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
// array of songs with name of artist, name of songs, and urls to the mp3 file and wikipedia page, need to be change to match the database
var songsArr = [
    new songs(songs.newIdGenerator(), "Dancin", "Aaron Smith", "dist/songs/Aaron Smith - Dancin (KRONO Remix) (3).mp3", "https://i.ytimg.com/vi/0XFudmaObLI/maxresdefault.jpg", "https://en.wikipedia.org/wiki/Aaron_Smith_(DJ)", false),
    new songs(songs.newIdGenerator(), "Waiting for love", "Avicci", "dist/songs/Avicii - Waiting For Love (1).mp3", "https://upload.wikimedia.org/wikipedia/he/8/81/Avicii%27s_Waiting_For_Love%2C_Cover_Artwork.png", "https://en.wikipedia.org/wiki/Avicii", false),
    new songs(songs.newIdGenerator(), "Reckoning Song", "Asaf Avidan", "dist/songs/Asaf Avidan & The Mojos - One Day - Reckoning Song (Wankelmut Remix)t.mp3", "https://yt3.googleusercontent.com/ytc/AGIKgqNc058OG6oxMZgjeT77qEE6VbGeIioFlKfVm_INAA=s900-c-k-c0x00ffffff-no-rj", "https://en.wikipedia.org/wiki/Asaf_Avidan", false),
    new songs(songs.newIdGenerator(), "Creep", "Radiohead", "dist/songs/Creep.mp3", "https://i.ytimg.com/vi/XFkzRNyygfk/maxresdefault.jpg", "https://en.wikipedia.org/wiki/Radiohead", false),
    new songs(songs.newIdGenerator(), "Ain't no sunshine", "Bill Withers", "dist/songs/Bill Withers - Ain't No Sunshine (Official Audio).mp3", "https://images.genius.com/55c4517a908f24d569ceb37c401f09a0.620x620x1.jpg", "https://en.wikipedia.org/wiki/Bill_Withers", false),
    new songs(songs.newIdGenerator(), "i'm still standing", "Elton John", "dist/songs/Elton John - I'm Still Standing.mp3", "https://upload.wikimedia.org/wikipedia/en/6/69/Elton_John_StillStanding.jpg", "https://en.wikipedia.org/wiki/Elton_John", false),
    new songs(songs.newIdGenerator(), "Just the two of us", "Grover Washington", "dist/songs/Grover Washington Jr. feat. Bill Withers - Just The Two of Us [HQ].mp3", "https://www.blackpast.org/wp-content/uploads/Grover-Washington-Jr.jpg", "https://en.wikipedia.org/wiki/Grover_Washington_Jr.", false),
    new songs(songs.newIdGenerator(), "Its a man's world", "James Brown", "dist/songs/James Brown - It's A Man's Man's Man's World.mp3", "https://cdn.britannica.com/34/197534-050-83C616C4/James-Brown-1991.jpg", "https://en.wikipedia.org/wiki/James_Brown", false),
    new songs(songs.newIdGenerator(), "Shut up my mom's calling", "Hotel Ugly", "dist/songs/Shut up My Moms Calling.mp3", "https://cdns-images.dzcdn.net/images/artist/9de827881f210a6bdd597e1410f11c59/500x500.jpg", "https://www.instagram.com/hotelugly/?hl=en", false),
    new songs(songs.newIdGenerator(), "Smells like teen spirit", "Nirvana", "dist/songs/Smells Like Teen Spirit.mp3", "https://i.scdn.co/image/ab67616d0000b273e175a19e530c898d167d39bf", "https://en.wikipedia.org/wiki/Nirvana_(band)", false),
    new songs(songs.newIdGenerator(), "This Love", "Maroon 5", "dist/songs/This Love.mp3", "https://media.npr.org/assets/music/news/2010/09/maroon-e9cb8c5b25b4d1f3e68aa26e6a0ce51cf2ae59d8-s1100-c50.jpg", "https://en.wikipedia.org/wiki/Maroon_5", false),
    new songs(songs.newIdGenerator(), "My Way", "Calvin Harris", "dist/songs/calvin harris - my way.mp3", "https://upload.wikimedia.org/wikipedia/en/5/51/My_Way_Calvin_Harris.jpg", "https://en.wikipedia.org/wiki/Calvin_Harris", false),
    new songs(songs.newIdGenerator(), "בן 30", "עומר אדם", "dist/songs/עומר אדם - בן 30 (Prod. By Gil Vain).mp3", "https://i1.sndcdn.com/artworks-wnPr7R4tjwnzBSIj-MJk02g-t500x500.jpg", "https://he.wikipedia.org/wiki/%D7%A2%D7%95%D7%9E%D7%A8_%D7%90%D7%93%D7%9D", false),
    new songs(songs.newIdGenerator(), "ככה עדיף לי", "יסמין מועלם", "dist/songs/יסמין מועלם - ככה עדיף לי (Prod. Amir ve Ben).mp3", "https://ynet-pic1.yit.co.il/picserver5/wcm_upload/2023/06/04/HkMN30RYLn/404737.jpg", "https://he.wikipedia.org/wiki/%D7%99%D7%A1%D7%9E%D7%99%D7%9F_%D7%9E%D7%95%D7%A2%D7%9C%D7%9D", false),
    new songs(songs.newIdGenerator(), "505", "Arctic Monkeys", "dist/songs/505.mp3", "https://upload.wikimedia.org/wikipedia/commons/e/e7/%22AM%22_%28Arctic_Monkeys%29.jpg", "https://he.wikipedia.org/wiki/%D7%90%D7%A8%D7%A7%D7%98%D7%99%D7%A7_%D7%9E%D7%90%D7%A0%D7%A7%D7%99%D7%96", false),
    new songs(songs.newIdGenerator(), "Way down we go", "Kaleo", "dist/songs/KALEO - Way Down We Go (Official Music Video).mp3", "https://upload.wikimedia.org/wikipedia/en/a/a1/KaleoWayDownWeGo.jpg", "https://en.wikipedia.org/wiki/Kaleo_(band)", false),
    new songs(songs.newIdGenerator(), "Billie Jean", "Michael Jackson", "dist/songs/Michael Jackson - Billie Jean (Official Video).mp3", "https://imgs.smoothradio.com/images/224840?width=2480&crop=1_1&signature=coh17sFPwlsyi0gj9FdZWvlLMFQ=", "https://en.wikipedia.org/wiki/Michael_Jackson", false),
    new songs(songs.newIdGenerator(), "Withiout Me", "Eminem", "dist/songs/Eminem - Without Me (Official Music Video).mp3", "https://c.files.bbci.co.uk/4E04/production/_127627991_eminemgettyimages.jpg", "https://en.wikipedia.org/wiki/Eminem", false),
    new songs(songs.newIdGenerator(), "Lucid Dreams", "Juice WRLD ", "dist/songs/Juice WRLD - Lucid Dreams (Directed by Cole Bennett).mp3", "https://nypost.com/wp-content/uploads/sites/2/2019/05/juice-wrld-1a.jpg?quality=75&strip=all", "https://en.wikipedia.org/wiki/Juice_Wrld", false),
];
var paragraphs = [];
songsArr.forEach(function (song) {
    paragraphs.push(song.artist + "-" + song.name);
});
var suggestedRoot = document.querySelector(".MainPageWrapper__suggested");
if (suggestedRoot) {
    var songsMappedAndJoin = songsArr
        .map(function (song) { return "<div class=\"song\" onclick=\"handleSongClick(" + song.id + ")\"><div class=\"song__title\">" + song.artist + "-" + song.name + "</div><img class=\"song__img\" src=\"" + song.img + "\" alt=\"\"></div>"; })
        .join('');
    var storedLastListened = localStorage.getItem('lastListenedSongs');
    lastListenedArr = storedLastListened ? JSON.parse(storedLastListened) : [];
    createLastListenedHTML(lastListenedArr);
    suggestedRoot.innerHTML += songsMappedAndJoin;
}
function handleSongClick(songID) {
    var song = songsArr.find(function (song) { return song.id == songID; });
    if (song) {
        localStorage.setItem('selectedSong', JSON.stringify(song));
    }
    window.location.href = "songRedirect.html";
}
var songsCounter = 0;
var storedSong = localStorage.getItem('selectedSong');
var selectedSong = storedSong ? JSON.parse(storedSong) : null;
var lastListenedArr = [];
// creates the song redirecting page HTML
SongPageGenerator(selectedSong);
function SongPageGenerator(song) {
    try {
        heartRed(song.love);
        var SongsRoot = document.querySelector(".SongPageRoot");
        var songHTML = "\n        <div class=\"songWrapper\">\n          <div class=\"songWrapper__name\">" + song.name + "</div>\n          <div onclick=\"wiki()\" class=\"songWrapper__artist\">" + song.artist + "</div>\n          <img class=\"songWrapper__img\" src=\"" + song.img + "\" alt=\"\">\n          <i id=\"playicon\" class=\"fa-solid fa-play fa-2xl\"></i>   \n          <i id=\"pauseicon\" class=\"fa-solid fa-pause fa-2xl\"></i> \n          <div id=\"time\"></div>\n        </div><a class=\"download\" href=\"" + song.src + "\" download>Download Song</a>\n        ";
        SongsRoot.innerHTML += songHTML;
        lastListenedGenerator(song);
    }
    catch (error) {
        console.error(error);
    }
}
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
function lastListenedGenerator(song) {
    try {
        var storedSongs = localStorage.getItem('lastListenedSongs');
        console.log(storedSongs);
        var songsArray = [];
        if (storedSongs) {
            songsArray = JSON.parse(storedSongs);
        }
        if (!songsArray.includes(song)) {
            songsArray.push(song);
        }
        if (songsArray.length > 6) {
            songsArray.shift();
        }
        localStorage.setItem('lastListenedSongs', JSON.stringify(songsArray));
        lastListenedArr = songsArray;
        createLastListenedHTML(songsArray);
    }
    catch (error) {
        console.error(error);
    }
}
var lastListenedSection = document.querySelector(".MainPageWrapper__lastListened__ROOT");
// this function creates the "last listened" section based on the the songsArray it got.
function createLastListenedHTML(arr) {
    try {
        var lastListenedSection_1 = document.querySelector(".MainPageWrapper__lastListened__ROOT");
        if (lastListenedSection_1) {
            lastListenedSection_1.innerHTML = ""; // Clear the existing content
            var lastSongs = arr
                .map(function (song) {
                return "<div class=\"song\" onclick=\"handleSongClick('" + song.id + "')\"><div class=\"song__title\">" + song.artist + "-" + song.name + "</div><img class=\"song__img\" src=\"" + song.img + "\" alt=\"\"></div>";
            })
                .join('');
            lastListenedSection_1.innerHTML = lastSongs; // Set the new content
        }
    }
    catch (error) {
        console.error(error);
    }
}
//================================
//this function creates the timeline based on the current time and progress of the audio.
function updateTimeAndProgress() {
    try {
        var progressElement = document.querySelector("#progress");
        var timeElement = document.querySelector("#time");
        //you didint checked that the element is not null
        var progress = (audioElement.currentTime / audioElement.duration) * 100;
        progressElement.style.width = progress + "%";
        var minutes = Math.floor(audioElement.currentTime / 60);
        var seconds = Math.floor(audioElement.currentTime % 60);
        timeElement.textContent = minutes + ":" + seconds.toString().padStart(2, "0");
    }
    catch (error) {
        console.error(error);
    }
}
//this function getting the Wikipedia link from the local storage of selectedSong and creating a dynamic href to the Wikipedia page of the author of the song.
function wiki() {
    try {
        var song = localStorage.getItem("selectedSong");
        var songAsObject = JSON.parse(song);
        var url = songAsObject.wiki;
        window.location.href = "" + url;
    }
    catch (error) {
        console.error(error);
    }
}
// regexp-----------------------
// this function getting the search data from the mainpage and creating the RegExp abillity so the matching songs will showup on the document.
function handleSearch(ev) {
    try {
        var searchTerms_1 = ev.target.value;
        var pattern_1 = new RegExp(searchTerms_1, 'i');
        var foundParagraphs = paragraphs.map(function (paragraph, i) {
            var isMatch = pattern_1.test(paragraph);
            if (isMatch && searchTerms_1 != "") {
                return paragraph;
            }
        }).filter(function (paragraph) { return paragraph !== undefined; });
        renderParagraphs(foundParagraphs, document.querySelector('#MainPageWrapper__paragraphs'));
    }
    catch (error) {
        console.error(error);
    }
}
function renderParagraphs(paragraphs, htmlElement) {
    try {
        if (!htmlElement)
            throw new Error('htmlElement is required');
        var html = paragraphs.map(function (paragraph) { return renderParagraph(paragraph); }).join(' ');
        htmlElement.innerHTML = html;
    }
    catch (error) {
        console.error(error);
    }
}
function renderParagraph(paragraph) {
    try {
        if (!paragraph)
            throw new Error('paragraph is required');
        var songID = idControll(paragraph);
        return "<button onclick=\"handleSongClick(" + songID + ")\" class=\"found\">" + paragraph + "</button>";
    }
    catch (error) {
        console.error(error);
    }
}
//this function creates a unique ID for each song.
function idControll(paragraph) {
    try {
        var matchedSong = songsArr.find(function (song) { return song.artist + "-" + song.name === paragraph; });
        if (matchedSong) {
            return matchedSong.id;
        }
        return null;
    }
    catch (error) {
        console.error(error);
    }
}
var suggestedNew = document.querySelector(".MainPageWrapper__suggested__root");
var scrollBTN = document.querySelector(".MainPageWrapper__suggested__scrollR");
var scrollCounter = 0;
if (scrollBTN && suggestedRoot) {
    scrollBTN.addEventListener("click", function () {
        scrollCounterL = 0;
        scrollCounter++;
        var size = scrollCounter * 10;
        suggestedRoot.style.transform = "translatex(-" + size + "vw)";
    });
}
var scrollBTNL = document.querySelector(".MainPageWrapper__suggested__scrollL");
var scrollCounterL = 0;
if (scrollBTNL && suggestedRoot) {
    scrollBTNL.addEventListener("click", function () {
        scrollCounter = 0;
        scrollCounterL++;
        var size = scrollCounterL * 10;
        suggestedRoot.style.transform = "translatex(+" + size + "vw)";
    });
}
//function that handle the click on the add in the main page and redirecting the site to the song page
function handleadd() {
    var addSong = songsArr[11];
    handleSongClick(addSong.id);
}
//function that transfer the site to the main page while clicking the icon
function mymusictohome() {
    window.location.href = "main.html";
}
//playing a random song from the songs array
function shuffle(arr) {
    var random = arr[Math.floor(Math.random() * arr.length)];
    handleSongClick(random.id);
}
//changing the background to dark
function darkTheme() {
    document.body.style.backgroundImage = "url(https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?cs=srgb&dl=pexels-francesco-ungaro-998641.jpg&fm=jpg)";
    lightThemeOption();
}
var Lightback = document.querySelector(".MainPageWrapper__Lightback");
var Lighttheme = document.querySelector(".MainPageWrapper__Lighttheme");
function lightThemeOption() {
    Lightback.style.display = "block";
    Lighttheme.style.display = "block";
}
function refreshPage() {
    location.reload();
}
var lovedSongs = JSON.parse(localStorage.getItem('lovedSongs') || '[]');
var loveCounter = 0;
function handleLove() {
    if (loveCounter % 2 === 0) {
        heartIcon.style.color = "red";
        loveCounter++;
        addLoved();
    }
    else {
        heartIcon.style.color = "grey";
        loveCounter++;
    }
}
function addLoved() {
    var selectedSong = localStorage.getItem("selectedSong");
    if (selectedSong) {
        var lovedSong = JSON.parse(selectedSong);
        lovedSong.love = "true";
        lovedSongs.push(lovedSong);
        localStorage.setItem('lovedSongs', JSON.stringify(lovedSongs));
    }
}
console.log(lovedSongs);
function heartRed(love) {
    if (love === true) {
        heartIcon.style.color = "red";
    }
    else {
        heartIcon.style.color = "grey";
    }
}
lovedSongsSectionGenerator();
function lovedSongsSectionGenerator() {
    try {
        var songsMappedAndJoin = lovedSongs
            .map(function (song) {
            return "<div class=\"song\" onclick=\"handleSongClick(" + song.id + ")\"><div class=\"song__title\">" + song.artist + " - " + song.name + "</div><img class=\"song__img\" src=\"" + song.img + "\" alt=\"\"></div>";
        })
            .join('');
        lovedSongsSectionRoot.innerHTML = songsMappedAndJoin;
    }
    catch (error) {
        console.error(error);
    }
}
