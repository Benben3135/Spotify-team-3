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
// async function getSongs(){
//     try {
//         const response = await fetch('/API/songs/get-song')
//         const result = await response.json();
//         const { songs } = result;
//         if(!Array.isArray(songs)) throw new Error("songs are not array")
//         console.log(songs)
//         console.log(result)
//         return songs;
//     } catch (error) {
//         console.error(error);
//         return []
//     }
// }
function handleUploadSong(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var formData, response, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    ev.preventDefault();
                    formData = new FormData();
                    formData.append('filename', ev.target.filename.value);
                    formData.append('file', ev.target.file.files[0]);
                    formData.append('title', ev.target.title.value);
                    formData.append('genre', ev.target.genre.value);
                    return [4 /*yield*/, fetch("/API/songs/upload-file", {
                            method: 'POST',
                            body: formData
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    console.log(result);
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error(error_1.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// async function handleUploadSong(ev:any) {
//     try {
//         ev.preventDefault();
//         // console.log(`wefwef`)
//         const filename = ev.target.filename.value
//         const file = ev.target.file.value
//         const title = ev.target.title.value
//         const genre = ev.target.genre.value
//         if(!filename || !file || !title || !genre) throw new Error("Please fill all fileds")
//         const song:Song = {filename, file, title, genre};
//         const response = await fetch("/API/songs/upload-file", {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(song)
//         })
//         if(response.ok){
//             const result = await response.json();
//             console.log(result);
//         }
//     } catch (error) {
//         console.error(error.message)
//     }
// }
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
                        throw new Error("songs are not array");
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
        var html = "<div class=\"song-container\">\n        <h2>filename: " + song.filename + "</h2>\n        <p>file: " + song.file + "</p>\n        <p>title: " + song.title + "</p>\n        <p>genre: " + song.genre + "</p>\n        </div>\n        ";
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
        var songs, rootSong;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSongs()];
                case 1:
                    songs = _a.sent();
                    rootSong = document.querySelector("#rootSong");
                    renderSongs(songs, rootSong);
                    return [2 /*return*/];
            }
        });
    });
}
/*
Patch
http://localhost:3000/API/songs/upload-file
*/
// async function handleUploadSong(ev: any) {
//     try {
//       ev.preventDefault();
//       const form = ev.target;
//       const formData = new FormData(form);
//       const response = await fetch("API/songs/upload-file", {
//         method: 'PATCH',
//         headers: {'Content-Type': 'mulpipart/form-data'},
//         body: formData, // Use FormData for file uploads
//       });
//       const result = await response.json();
//       console.log(result);
//     } catch (error) {
//       console.error(error)
//     }
//   }
