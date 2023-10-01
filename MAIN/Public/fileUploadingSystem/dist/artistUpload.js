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
var APIcontroller = (function () {
    var _this = this;
    var cliendId = 'd93b29fc7e23418d902c640d9fa04579';
    var clientSecret = '2d2d026500254369bcf690a008ac1524';
    //private methods
    var _getToken = function () { return __awaiter(_this, void 0, void 0, function () {
        var result, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://accounts.spotify.com/api/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'Basic ' + btoa(cliendId + ':' + clientSecret)
                        }, body: 'grant_type-client_credentials'
                    })];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.access_token]; // we will be able to use that bearer token to call a Spotify endpoint giving us actual playlists 
            }
        });
    }); };
    var _getGenres = function (token) { return __awaiter(_this, void 0, void 0, function () {
        var result, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://api.spotify.com/v1/browse/categories', {
                        method: 'GET',
                        headers: { 'Authorization': 'Bearer ' + token }
                    })];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.categories.items];
            }
        });
    }); };
    var _getPlaylistByGenre = function (token, genreId) { return __awaiter(_this, void 0, void 0, function () {
        var limit, result, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    limit = 10;
                    return [4 /*yield*/, fetch("https://api.spotify.com/v1/browse/categories/" + genreId + "/playlists?limit=" + limit, {
                            method: 'GET',
                            headers: { 'Authorization': 'Bearer ' + token }
                        })];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.playlists.items];
            }
        });
    }); };
    var _getTracks = function (token, tracksEndPoint) { return __awaiter(_this, void 0, void 0, function () {
        var limit, result, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    limit = 10;
                    return [4 /*yield*/, fetch(tracksEndPoint + "?limit=" + limit, {
                            method: 'GET',
                            headers: { 'Authorization': 'Bearer ' + token }
                        })];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.items];
            }
        });
    }); };
    var _getTrack = function (token, trackEndPoint) { return __awaiter(_this, void 0, void 0, function () {
        var result, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("" + trackEndPoint, {
                        method: 'GET',
                        headers: { 'Authorization': 'Bearer ' + token }
                    })];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    return {
        getToken: function () {
            return _getToken();
        },
        getGenres: function (token) {
            return _getGenres(token);
        },
        getPlaylistByGenre: function (token, genreId) {
            return _getPlaylistByGenre(token, genreId);
        },
        getTracks: function (token, tracksEndPoint) {
            return _getTracks(token, tracksEndPoint);
        },
        getTrack: function (token, trackEndPoint) {
            return _getTrack(token, trackEndPoint);
        }
    };
    //By these two parentheses below we know that this module is an iffy(it cause the function to fire immediately.) 
}());
//UI Module
var UIController = (function () {
    //object to hold references to html selectores
    var DOMElements = {
        selectGenre: "#select_genre",
        selectPlaylist: "#select_playlist",
        buttonSubmit: "#btn_submit",
        divSongDetail: "#song-detail",
        htToken: "#hidden_token",
        divSonglist: ".song-list"
    };
    //public methods
    return {
        //method to get input fields
        inputField: function () {
            return {
                genre: document.querySelector(DOMElements.selectGenre),
                playlist: document.querySelector(DOMElements.selectPlaylist),
                songs: document.querySelector(DOMElements.divSonglist),
                submit: document.querySelector(DOMElements.buttonSubmit),
                songDetail: document.querySelector(DOMElements.divSongDetail)
            };
        },
        //need methods to create select list option
        createGenre: function (text, value) {
            var html = "<option value=\"" + value + "\">" + text + "</option>";
            document.querySelector(DOMElements.selectGenre).insertAdjacentHTML('beforeend', html);
        },
        createPlaylist: function (text, value) {
            var html = "<option value=\"" + value + "\">" + text + "</option>";
            document.querySelector(DOMElements.selectPlaylist).insertAdjacentHTML('beforeend', html);
        },
        //need method to create a track list group item
        createTrack: function (id, name) {
            var html = "<a href=\"#\" class=\"list-group-item list-group-item-action list-group-item-light\" id=\"" + id + "\">" + name + "</a>";
            document.querySelector(DOMElements.divSonglist).insertAdjacentHTML('beforeend', html);
        },
        //need method to create the song detail
        createSongDetail: function (img, title, artist) {
            var detailDiv = document.querySelector(DOMElements.divSongDetail);
            //any time user clicks a new song, we need to clear out the song detail div
            detailDiv.innerHTML = '';
            var html = "\n            <div class=\"row col-sm-12 px-0\">\n                    <img src=\"" + img + "\" alt=\"\">\n                </div>    \n                <div class=\"row col-sm-12 px-0\">\n                    <label for=\"Genre\" class=\"form-label col-sm-12\">" + title + ":</label>\n                </div>         \n                <div class=\"row col-sm-12 px-0\">\n                    <label for=\"artist\" class=\"form-label col-sm-12\">" + artist + ":</label>\n                </div>       \n            ";
            detailDiv.insertAdjacentHTML('beforeend', html);
        },
        resetTrackDetail: function () {
            this.inputField().songDetail.innerHTML = '';
        },
        resetTracks: function () {
            this.inputField().songs.innerHTML = '';
            this.resetTrackDetail();
        },
        resetPlaylist: function () {
            this.inputField().playlist.innerHTML = '';
            this.resetTracks();
        }
    };
})();
var APPController = (function (UICtrl, APICtrl) {
    var _this = this;
    //get input field object ref
    var DOMInputs = UICtrl.inputField();
    //get genres on page load
    var loadGenres = function () { return __awaiter(_this, void 0, void 0, function () {
        var token, genres;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, APICtrl.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, APICtrl.getGenres(token)];
                case 2:
                    genres = _a.sent();
                    //populate our genres select element
                    genres.forEach(function (element) { return UICtrl.createGenre(element.name, element.id); });
                    return [2 /*return*/];
            }
        });
    }); };
    //create genre change event listener
    DOMInputs.genre.addEventListener('change', function () { return __awaiter(_this, void 0, void 0, function () {
        var token, genreSelect, genreId, playlist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    //when user changes genres, we need to reset the subsequent fields
                    UICtrl.resetPlaylist();
                    token = UICtrl.getStoredToken().token;
                    genreSelect = UICtrl.inputField().genre;
                    genreId = genreSelect.options[genreSelect.selectedIndex].value;
                    return [4 /*yield*/, APICtrl.getPlaylistByGenre(token, genreId)];
                case 1:
                    playlist = _a.sent();
                    //load the playlist select field
                    console.log(playlist);
                    return [2 /*return*/];
            }
        });
    }); });
    //create submit button click event listenet
    DOMInputs.submit.addEventListener('click', function (e) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            e.preventDefault();
            return [2 /*return*/];
        });
    }); });
    //create song selection click event listener
    DOMInputs.songs.addEventListener('click', function (e) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            e.preventDefault();
            return [2 /*return*/];
        });
    }); });
})();
