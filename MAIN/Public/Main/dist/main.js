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
getUserData();
var User = /** @class */ (function () {
    function User(name, email, password, admin, createdAt, artistName) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.admin = admin;
        this.createdAt = createdAt;
        this.artistName = artistName;
    }
    return User;
}());
//--------------
function getUserData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/API/users/get-User")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    user = _a.sent();
                    return [2 /*return*/, user];
            }
        });
    });
}
//function that changes the deocument title according to users name
function manageTitle() {
    var user = getUserData();
    // const name = user.name;
    var title = document.querySelector('#title');
    title.innerHTML = "SoundMaster";
}
isArtist();
function isArtist() {
    return __awaiter(this, void 0, void 0, function () {
        var response, artistName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3000/API/users/addArtistFunc")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    artistName = (_a.sent()).artistName;
                    if (!artistName)
                        ("no admin");
                    else {
                        buildArtistUtilities(artistName);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function buildArtistUtilities(name) {
    addUploadBtn();
    artistGreeting(name);
    artistUpload(name);
    artistPageBtn(name);
    artistTXT();
}
//artist functions:
function addUploadBtn() {
    var upperBar = document.querySelector(".upperBar");
    upperBar.innerHTML += "<div id=\"uploadBtn\"><i class=\"fas fa-upload fa-lg upload upperBar__icon\" style=\"color: #ffffff;\"></i></div>    <div id=\"artistPageBtn\"><i class=\"fas fa-music fa-lg music upperBar__icon\" style=\"color: #ffffff;\"></i></div>";
}
function artistGreeting(name) {
}
function artistUpload(name) {
    var uploadBtn = document.querySelector("#uploadBtn");
    uploadBtn.style.display = "block";
    uploadBtn.addEventListener("click", function () {
        location.href = "../fileUploadingSystem/artistUpload.html?name=" + name;
    });
}
function artistPageBtn(name) {
    var artistPageBtn = document.querySelector("#artistPageBtn");
    artistPageBtn.style.display = "block";
    artistPageBtn.addEventListener("click", function () {
        // artistPage(name);
    });
}
function artistTXT() {
    var creatorTXT = document.querySelector("#creatorTXT");
    creatorTXT.style.display = "block";
}
function docs() {
    return __awaiter(this, void 0, void 0, function () {
        var user, name, createdAt, createdAtDate, year, month, day, createdAtString, admin, docs, userData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserData()];
                case 1:
                    user = _a.sent();
                    name = user.name;
                    createdAt = user.createdAt;
                    createdAtDate = new Date(createdAt);
                    year = createdAtDate.getFullYear();
                    month = createdAtDate.getMonth() + 1;
                    day = createdAtDate.getDay();
                    createdAtString = day + "/" + month + "/" + year;
                    admin = user.admin;
                    docs = document.querySelector(".docs");
                    docs.style.display = "flex";
                    document.addEventListener("click", function () {
                        docs.style.display = "none";
                    });
                    userData = document.querySelector(".docs__user");
                    if (admin)
                        userData.innerHTML = "Username: " + name + " <br> Created at: " + createdAtString + " <br> OFFICIAL CREATOR";
                    else {
                        userData.innerHTML = "Username: " + name + " <br> Created at: " + createdAt + " ";
                    }
                    return [2 /*return*/];
            }
        });
    });
}
//getting the songs from the server:
function renderSong(song, filename) {
    var artist = song.artist;
    var name = song.name;
    var img = song.img;
    var reccomendedSongsBox = document.querySelector("#reccomended");
    reccomendedSongsBox.innerHTML +=
        "<div onclick=\"songPage('" + artist + "','" + name + "','" + filename + "')\" class=\"songsBox__song\">\n        <img class=\"songsBox__song__img\" src=\"" + img + "\" alt=\"\">\n        <div class=\"songsBox__song__name\">" + name + "</div>\n        <div class=\"songsBox__song__artist\">" + artist + "</div>\n    </div>";
}
// getting the liked songs from the server
fetch("http://localhost:3000/API/user_songs/get-Liked-songs")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    data.forEach(function (song) {
        var fileName = song.fileName;
        getSongByFilename(fileName);
    });
})["catch"](function (error) {
    console.error("Error fetching songs:", error);
});
function getSongByFilename(filename) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/get-song-by-filename?filename=" + filename)];
                case 1:
                    response = _a.sent();
                    // Check if response is not successful
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    renderLikedSongs(data.metadata, data.filename);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching songs:", error_1);
                    return [2 /*return*/, null]; // Or throw the error again depending on your error handling strategy
                case 4: return [2 /*return*/];
            }
        });
    });
}
function renderLikedSongs(song, filename) {
    var artist = song.artist;
    var name = song.name;
    var img = song.img;
    var reccomendedSongsBox = document.querySelector("#liked");
    reccomendedSongsBox.innerHTML +=
        "<div onclick=\"songPage('" + artist + "','" + name + "','" + filename + "')\" class=\"songsBox__song\">\n        <img class=\"songsBox__song__img\" src=\"" + img + "\" alt=\"\">\n        <div class=\"songsBox__song__name\">" + name + "</div>\n        <div class=\"songsBox__song__artist\">" + artist + "</div>\n    </div>";
}
function songPage(artist, name, filename) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addGenreAlgorithm(filename)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, addStamina(filename)];
                case 2:
                    _a.sent();
                    window.location.href = "../songPage/songPage.html?artist=" + artist + "&name=" + name + "&filename=" + filename;
                    return [2 /*return*/];
            }
        });
    });
}
function addGenreAlgorithm(filename) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3000/API/songsAlgorithms/addGenereLiked", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ filename: filename })
                    })];
                case 1:
                    response = _a.sent();
                    // Handle non-200 HTTP response status
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (!data.ok) {
                        // You may want to do something if data.ok is false
                        console.error("Server responded with an error:", data.error);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
//generate the favourite genres:
getGeneres();
function getGeneres() {
    return __awaiter(this, void 0, void 0, function () {
        var response, dataFromServer, sortedGenres, topGenre, secondtopGenre, thirdtopGenre;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3000/API/songsAlgorithms/getGeneres")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    dataFromServer = _a.sent();
                    delete dataFromServer.email;
                    delete dataFromServer._id;
                    delete dataFromServer.__v;
                    sortedGenres = Object.entries(dataFromServer).sort(function (a, b) { return b[1] - a[1]; });
                    topGenre = sortedGenres[0][0];
                    secondtopGenre = sortedGenres[1][0];
                    thirdtopGenre = sortedGenres[2][0];
                    rendertopGenre(topGenre);
                    renderSecondGenre(secondtopGenre);
                    renderThirddGenre(thirdtopGenre);
                    return [2 /*return*/];
            }
        });
    });
}
function rendertopGenre(topGenre) {
    return __awaiter(this, void 0, void 0, function () {
        var response, topGenreSongs, numberOfSongsToSelect, selectedSongs, indicesSelected, randomIndex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/get-topGenre?topGenre=" + topGenre)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    topGenreSongs = _a.sent();
                    numberOfSongsToSelect = Math.min(3, topGenreSongs.length);
                    selectedSongs = [];
                    indicesSelected = new Set();
                    while (indicesSelected.size < numberOfSongsToSelect) {
                        randomIndex = Math.floor(Math.random() * topGenreSongs.length);
                        if (!indicesSelected.has(randomIndex)) {
                            indicesSelected.add(randomIndex);
                            selectedSongs.push(topGenreSongs[randomIndex]);
                        }
                    }
                    renderSelectedSongs(selectedSongs);
                    return [2 /*return*/];
            }
        });
    });
}
function renderSecondGenre(secondtopGenre) {
    return __awaiter(this, void 0, void 0, function () {
        var response, topGenreSongs, numberOfSongsToSelect, selectedSongs, indicesSelected, randomIndex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/get-topGenre?topGenre=" + secondtopGenre)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    topGenreSongs = _a.sent();
                    numberOfSongsToSelect = Math.min(2, topGenreSongs.length);
                    selectedSongs = [];
                    indicesSelected = new Set();
                    while (indicesSelected.size < numberOfSongsToSelect) {
                        randomIndex = Math.floor(Math.random() * topGenreSongs.length);
                        if (!indicesSelected.has(randomIndex)) {
                            indicesSelected.add(randomIndex);
                            selectedSongs.push(topGenreSongs[randomIndex]);
                        }
                    }
                    renderSelectedSongs(selectedSongs);
                    return [2 /*return*/];
            }
        });
    });
}
function renderThirddGenre(thirdtopGenre) {
    return __awaiter(this, void 0, void 0, function () {
        var response, topGenreSongs, numberOfSongsToSelect, selectedSongs, indicesSelected, randomIndex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/get-topGenre?topGenre=" + thirdtopGenre)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    topGenreSongs = _a.sent();
                    numberOfSongsToSelect = Math.min(1, topGenreSongs.length);
                    selectedSongs = [];
                    indicesSelected = new Set();
                    while (indicesSelected.size < numberOfSongsToSelect) {
                        randomIndex = Math.floor(Math.random() * topGenreSongs.length);
                        if (!indicesSelected.has(randomIndex)) {
                            indicesSelected.add(randomIndex);
                            selectedSongs.push(topGenreSongs[randomIndex]);
                        }
                    }
                    renderSelectedSongs(selectedSongs);
                    return [2 /*return*/];
            }
        });
    });
}
function renderSelectedSongs(selectedSongs) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            selectedSongs.forEach(function (song) {
                renderGenreSongs(song.metadata, song.filename);
            });
            return [2 /*return*/];
        });
    });
}
function renderGenreSongs(song, filename) {
    var artist = song.artist;
    var name = song.name;
    var img = song.img;
    var reccomendedSongsBox = document.querySelector("#genre");
    reccomendedSongsBox.innerHTML +=
        "<div onclick=\"songPage('" + artist + "','" + name + "','" + filename + "')\" class=\"songsBox__song\">\n        <img class=\"songsBox__song__img\" src=\"" + img + "\" alt=\"\">\n        <div class=\"songsBox__song__name\">" + name + "</div>\n        <div class=\"songsBox__song__artist\">" + artist + "</div>\n    </div>";
}
//stamina:
function addStamina(filename) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3000/API/songsAlgorithms/addStamina", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ filename: filename })
                    })];
                case 1:
                    response = _a.sent();
                    // Handle non-200 HTTP response status
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (!data.ok) {
                        // You may want to do something if data.ok is false
                        console.error("Server responded with an error:", data.error);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
getStaminas();
function getStaminas() {
    return __awaiter(this, void 0, void 0, function () {
        var response, dataFromServer, staminasArr, sortedArr, length, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3000/API/songsAlgorithms/getStaminas")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    dataFromServer = _a.sent();
                    staminasArr = [];
                    dataFromServer.forEach(function (song) {
                        delete song.email;
                        delete song.__v;
                        delete song._id;
                        staminasArr.push(song);
                    });
                    console.log(staminasArr);
                    sortedArr = staminasArr.sort(function (a, b) { return b.stamina - a.stamina; });
                    length = sortedArr.length;
                    for (i = 0; i < length; i++) {
                        getArtistSongs(sortedArr[i]);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getArtistSongs(song) {
    return __awaiter(this, void 0, void 0, function () {
        function getRandomInt(x) {
            return Math.floor(Math.random() * (x + 1));
        }
        var artist, response, data, length, randomNumber, songToRender;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    artist = song.artistName;
                    return [4 /*yield*/, fetch("http://localhost:3000/get-artist-songs?artist=" + artist)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    length = data.length;
                    randomNumber = getRandomInt(length);
                    songToRender = data[randomNumber];
                    console.log(songToRender);
                    renderSong(songToRender.metadata, songToRender.filename);
                    return [2 /*return*/];
            }
        });
    });
}
//shuffle:
function shuffle() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, randomArr, randomIndex, randomSong, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:3000/get-songs")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    randomArr = randomSortNumbers(data.length);
                    randomIndex = randomArr[0];
                    randomSong = data[randomIndex];
                    console.log(randomSong);
                    songPage(randomSong.metadata.artist, randomSong.metadata.name, randomSong.filename);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function randomSortNumbers(limit) {
    var _a;
    var numbers = Array.from({ length: limit + 1 }, function (_, index) { return index; });
    for (var i = numbers.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [numbers[j], numbers[i]], numbers[i] = _a[0], numbers[j] = _a[1];
    }
    return numbers;
}
