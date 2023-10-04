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
function handleAddSong(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var name, artist, song, response, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    ev.preventDefault();
                    name = ev.target.name.value;
                    artist = ev.target.artist.value;
                    if (!name || !artist)
                        throw new Error("Please fill all fileds");
                    song = { name: name, artist: artist };
                    return [4 /*yield*/, fetch("/API/songs/add-song", {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(song)
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    console.log(result);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getSongs() {
    return __awaiter(this, void 0, void 0, function () {
        var response, result, songs, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/API/songs/get-song')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    songs = result.songs;
                    if (!Array.isArray(songs))
                        throw new Error("Songs are not array");
                    console.log(songs);
                    console.log(result);
                    return [2 /*return*/, songs];
                case 3:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function renderSongHtml(song) {
    try {
        var html = "<div class=\"song-container\">\n        <h2>name: " + song.name + "</h2>\n        <p>artist: " + song.artist + "</p>\n        </div>\n        <form id=\"" + song._id + "\" onsubmit=\"handleUpdateName(event)\">\n           <input type=\"string\" name=\"name\" value=\"" + song.name + "\" placeholder=\"name\">\n           <button type=\"submit\">Update</button>\n        </form>\n        <button id=\"delete\" onclick=\"handleDeleteSong('" + song._id + "')\">Delete</button>\n        ";
        return html;
    }
    catch (error) {
        console.error(error);
        return "";
    }
}
function renderSongs(songs, HTMLElement) {
    try {
        if (!HTMLElement)
            throw new Error("HTMLElement not found");
        console.log(songs);
        if (!Array.isArray(songs))
            throw new Error("songs are not array");
        var songsHTML = songs.map(function (song) { return renderSongHtml(song); }).join("");
        HTMLElement.innerHTML = songsHTML;
    }
    catch (error) {
        console.error(error);
    }
}
function handleGetSong() {
    return __awaiter(this, void 0, void 0, function () {
        var songs, rootsong;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSongs()];
                case 1:
                    songs = _a.sent();
                    rootsong = document.querySelector("#rootSong");
                    renderSongs(songs, rootsong);
                    return [2 /*return*/];
            }
        });
    });
}
function handleDeleteSong(songId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, result, songs, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log(songId);
                    return [4 /*yield*/, fetch('/API/songs/delete-song', {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ songId: songId })
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    songs = result.songs;
                    renderSongs(songs, document.querySelector("#rootSong"));
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function handleUpdateName(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var name, id, response, result, songs, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    ev.preventDefault();
                    name = ev.target.name.value;
                    id = ev.target.id;
                    console.log(id, name);
                    return [4 /*yield*/, fetch('/API/songs/update-song-name', {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: id, name: name })
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    console.log(result);
                    songs = result.songs;
                    renderSongs(songs, document.querySelector('#rootSong'));
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error(error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// async function handleGetUser(){
//     try {
//         //Ask server to get the user
//         const response = await fetch('API/users/get-user');
//         const data = await response.json();
//         console.log(data)
//     } catch (error) {
//         console.error(error)
//     }
// }
// async function handleGetUsers(){
//     try {
//         //ask the server to get the user
//         const response = await fetch("API/users/get-users")
//         const data = await response.json();
//         console.log(data)
//     } catch (error) {
//         console.error(error)
//     }
// }
