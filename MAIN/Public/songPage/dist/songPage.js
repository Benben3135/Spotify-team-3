var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        "<div class=\"song\">\n            <img class=\"song__img\" src=\"" + img + "\" alt=\"\">\n            <div class=\"song__name\">" + name + "</div>\n            <div class=\"song__artist\">" + artist + "</div>\n        </div>";
    var songPage__song = document.querySelector(".songPage__song");
}
function playSong() {
    return __awaiter(this, void 0, void 0, function () {
        var name, artist, filename, audioPlayer_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    debugger;
                    name = getNameFromQuery();
                    artist = getArtistFromQuery();
                    filename = getfilenameFromQuery();
                    audioPlayer_1 = document.getElementById('audio-player');
                    audioPlayer_1.pause(); // Pause the audio if it's playing
                    // Set the new source
                    audioPlayer_1.src = "/play-song?filename=" + filename;
                    // Wait for the new source to be loaded
                    return [4 /*yield*/, new Promise(function (resolve) {
                            audioPlayer_1.addEventListener('canplay', resolve);
                        })];
                case 1:
                    // Wait for the new source to be loaded
                    _a.sent();
                    // Start playing the new audio
                    return [4 /*yield*/, audioPlayer_1.play()];
                case 2:
                    // Start playing the new audio
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error playing song:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
