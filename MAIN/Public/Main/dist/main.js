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
                case 0:
                    console.log("i started!");
                    return [4 /*yield*/, fetch("http://localhost:3000/API/users/addArtistFunc")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    artistName = (_a.sent()).artistName;
                    console.log(artistName);
                    if (!artistName)
                        console.log("no admin");
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
fetch("/get-songs")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    console.log(data);
    data.forEach(function (song) {
        renderSong(song.metadata, song.filename);
    });
})["catch"](function (error) {
    console.error("Error fetching songs:", error);
});
function renderSong(song, filename) {
    debugger;
    var artist = song.artist;
    var name = song.name;
    var img = song.img;
    var reccomendedSongsBox = document.querySelector("#reccomended");
    reccomendedSongsBox.innerHTML +=
        "<div onclick=\"songPage('" + artist + "','" + name + "','" + filename + "')\" class=\"songsBox__song\">\n        <img class=\"songsBox__song__img\" src=\"" + img + "\" alt=\"\">\n        <div class=\"songsBox__song__name\">" + name + "</div>\n        <div class=\"songsBox__song__artist\">" + artist + "</div>\n    </div>";
}
function songPage(artist, name, filename) {
    debugger;
    location.href = "../songPage/songPage.html?artist=" + artist + "&name=" + name + "&filename=" + filename;
}
