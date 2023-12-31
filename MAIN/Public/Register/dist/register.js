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
function handleUpdateNameCard(ev) {
    debugger;
    var name = ev.target.value;
    var artistName = document.querySelector(".artist__nameCard");
    artistName.innerHTML = name;
}
function handleUpdateImgCard(ev) {
    debugger;
    var img = ev.target.value;
    var artistImg = document.querySelector(".artist__imgCard");
    artistImg.innerHTML = "<img class=\"artist__imgCard__img\" src=\"" + img + "\" alt=\"\">";
}
function handleUpdateInfoCard(ev) {
    debugger;
    var info = ev.target.value;
    console.log(info);
    var artistInfo = document.querySelector(".artist__infoCard");
    artistInfo.innerHTML = info;
}
function handleRegister(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var name, email, password, user, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ev.preventDefault();
                    debugger;
                    name = ev.target.name.value;
                    email = ev.target.email.value;
                    password = ev.target.password.value;
                    user = { name: name, email: email, password: password };
                    if (!user.email || !user.password)
                        throw new Error("missing some details");
                    return [4 /*yield*/, fetch("http://localhost:3000/API/users/register", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(user)
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    window.location.href = "http://localhost:3000/index.html";
                    return [2 /*return*/];
            }
        });
    });
}
function handleRegisterArtist(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var name, email, password, birthday, age, artistName, artistImg, artistInfo, user, response, data, user, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ev.preventDefault();
                    debugger;
                    name = ev.target.name.value;
                    email = ev.target.email.value;
                    password = ev.target.password.value;
                    birthday = ev.target.age.value;
                    age = calculateAge(birthday);
                    artistName = ev.target.artistName.value;
                    artistImg = ev.target.artistImg.value;
                    artistInfo = ev.target.artistInfo.value;
                    if (!artistName) return [3 /*break*/, 3];
                    user = { name: name, email: email, password: password, age: age, artistName: artistName, artistImg: artistImg, artistInfo: artistInfo };
                    if (!user.email || !user.password)
                        throw new Error("missing some details");
                    return [4 /*yield*/, fetch("http://localhost:3000/API/users/register", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(user)
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.error) {
                        alert(data.error);
                        return [2 /*return*/];
                    }
                    window.location.href = "http://localhost:3000/index.html";
                    return [3 /*break*/, 6];
                case 3:
                    user = { name: name, email: email, password: password };
                    if (!user.email || !user.password)
                        throw new Error("missing some details");
                    return [4 /*yield*/, fetch("http://localhost:3000/API/users/register", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(user)
                        })];
                case 4:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 5:
                    data = _a.sent();
                    window.location.href = "http://localhost:3000/index.html";
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function calculateAge(birthday) {
    // Parse the input birthday string into a Date object
    var birthdayDate = new Date(birthday);
    // Get the current date
    var currentDate = new Date();
    // Calculate the age by subtracting the birth year from the current year
    var age = currentDate.getFullYear() - birthdayDate.getFullYear();
    return age;
}
