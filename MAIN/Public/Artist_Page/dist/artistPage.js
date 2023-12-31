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
function getNameArtistFromQuery() {
    debugger;
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('artist');
}
getArtistData();
function getArtistData() {
    return __awaiter(this, void 0, void 0, function () {
        var artistName, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    artistName = getNameArtistFromQuery();
                    return [4 /*yield*/, fetch("http://localhost:3000/API/users/get-artist-data?artist=" + artistName)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    renderArtistData(data.artistData);
                    return [2 /*return*/];
            }
        });
    });
}
function renderArtistData(artist) {
    var artistImg = artist.artistImg;
    var artistInfo = artist.artistInfo;
    var artistName = artist.artistName;
    var artistImgRoot = document.querySelector(".artistWrapper__artistImg");
    var artistInfoRoot = document.querySelector(".artistWrapper__info");
    var artistNameRoot = document.querySelector(".artistWrapper__name");
    artistImgRoot.innerHTML = "<img class=\"artistWrapper__artistImg__img\" src=\"" + artistImg + "\" alt=\"\">";
    artistInfoRoot.innerHTML = artistInfo;
    artistNameRoot.innerHTML = artistName;
}
function getArtistSongs() {
    return __awaiter(this, void 0, void 0, function () {
        var artist, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    artist = getNameArtistFromQuery();
                    return [4 /*yield*/, fetch("/get-artist-songs?artist=" + artist)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
renderArtistSongs();
function renderArtistSongs() {
    return __awaiter(this, void 0, void 0, function () {
        var artistSongs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    debugger;
                    return [4 /*yield*/, getArtistSongs()];
                case 1:
                    artistSongs = _a.sent();
                    artistSongs.forEach(function (song) {
                        renderSong(song.metadata, song);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function renderSong(song, songFull) {
    console.log(songFull);
    var name = song.name;
    var artist = song.artist;
    var filename = songFull.filename;
    var songsDiv = document.querySelector(".songs");
    var html = "<div class=\"songs__song\" onclick=\"songPage('" + artist + "','" + name + "','" + filename + "')\">\n        <img class=\"songs__song__img\" src=\"" + song.img + "\" alt=\"\">\n        <div class=\"songs__song__name\">" + song.name + "</div>\n        <div class=\"songs__song__artist\">" + song.artist + "</div>\n    </div>";
    songsDiv.innerHTML += html;
}
function songPage(artist, name, filename) {
    debugger;
    location.href = "../songPage/songPage.html?artist=" + artist + "&name=" + name + "&filename=" + filename;
}
