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
        "<div class=\"song\">\n            <img class=\"song__bigimg\" src=\"" + img + "\" alt=\"\">\n            <img class=\"song__img\" src=\"" + img + "\" alt=\"\">\n            <div class=\"song__name\">" + name + "</div>\n            <div class=\"song__artist\" onclick=\"artistPage('" + artist + "')\">" + artist + "</div>\n            <i onclick=\"liked('" + artist + "','" + name + "')\" class=\"fas fa-heart fa-lg heart heart__icon\"></i>\n        </div>";
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
function liked(artist, name) {
    return __awaiter(this, void 0, void 0, function () {
        var check, dataSend, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, checkIfLiked()];
                case 1:
                    check = _a.sent();
                    if (!check) return [3 /*break*/, 3];
                    return [4 /*yield*/, deleteLike()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 3:
                    console.log("unliked!");
                    debugger;
                    dataSend = {
                        artist: artist,
                        name: name
                    };
                    return [4 /*yield*/, fetch("http://localhost:3000/API/user_songs/likedSongs", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(dataSend)
                        })];
                case 4:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 5:
                    data = _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function checkIfLiked() {
    return __awaiter(this, void 0, void 0, function () {
        var filename, response, isLiked;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filename = getfilenameFromQuery();
                    return [4 /*yield*/, fetch("http://localhost:3000/API/user_songs/likedCheck?filename=" + filename)];
                case 1:
                    response = _a.sent();
                    console.log(response);
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    isLiked = _a.sent();
                    return [2 /*return*/, isLiked];
                case 3:
                    console.error("Failed to check if liked");
                    return [2 /*return*/, false];
            }
        });
    });
}
function deleteLike() {
    return __awaiter(this, void 0, void 0, function () {
        var filename, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filename = getfilenameFromQuery();
                    return [4 /*yield*/, fetch("http://localhost:3000/API/user_songs/DeletelikedSongs", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ filename: filename })
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    return [2 /*return*/];
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", function () {
    checkIfLikedTurnRed();
});
function checkIfLikedTurnRed() {
    return __awaiter(this, void 0, void 0, function () {
        var filename, response, isLiked, heart, heart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filename = getfilenameFromQuery();
                    debugger;
                    return [4 /*yield*/, fetch("http://localhost:3000/API/user_songs/likedCheck?filename=" + filename)];
                case 1:
                    response = _a.sent();
                    console.log("response:", response);
                    return [4 /*yield*/, response.json()];
                case 2:
                    isLiked = _a.sent();
                    if (isLiked) {
                        heart = document.querySelector(".heart__icon");
                        heart.style.color = "red";
                    }
                    else {
                        heart = document.querySelector(".heart__icon");
                        console.error("Failed to check if liked");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
