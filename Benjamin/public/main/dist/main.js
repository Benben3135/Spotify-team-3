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
function getEmailFromQuery() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('email');
}
var email = getEmailFromQuery();
getUserData();
function getUserData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, name, dateCreatd, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/API/users/get-user?email=" + email)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    name = data[0].name;
                    dateCreatd = data[0].createdAt;
                    manageDocName(name);
                    console.log(name);
                    console.log(dateCreatd);
                    greeting(name);
                    getUserTasks();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function exitNewHabit() {
    var root = document.querySelector(".newHabit");
    var taskRoot = document.querySelector(".taskDocsRoot");
    root.style.display = "none";
    taskRoot.style.display = "none";
}
function greeting(name) {
    return __awaiter(this, void 0, void 0, function () {
        var root, html;
        return __generator(this, function (_a) {
            try {
                root = document.querySelector('#nameGreetingRoot');
                html = "hello " + name + " have a great day of habits!";
                root.innerHTML = html;
            }
            catch (error) {
                console.error(error);
            }
            return [2 /*return*/];
        });
    });
}
function openDocs() {
    var docsRoot = document.querySelector(".docs");
    docsRoot.style.display = "block";
    document.body.addEventListener("mousedown", function () {
        docsRoot.style.display = "none";
    });
    info();
}
function info() {
    return __awaiter(this, void 0, void 0, function () {
        var root, response, data, name, dateCreatd, date, year, month, day;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    root = document.querySelector(".infoRoot");
                    return [4 /*yield*/, fetch("/API/users/get-user?email=" + email)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    name = data[0].name;
                    dateCreatd = data[0].createdAt;
                    date = new Date(dateCreatd);
                    year = date.getFullYear();
                    month = date.getMonth() + 1;
                    day = date.getDate();
                    renderInfo(name, year, month, day, root);
                    return [2 /*return*/];
            }
        });
    });
}
function renderInfo(name, year, month, day, root) {
    var html = "<h2>USER DATA:</h2><div class=\"name\">name:" + name + "</div><div class=\"date\">date created:" + day + "/" + month + "/" + year + "</div>";
    root.innerHTML = html;
}
function newHabit() {
    var newHabitRoot = document.querySelector(".newHabit");
    newHabitRoot.style.display = "flex";
}
function handleNewHabit(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var newHabitRoot, name, categorie, time, userEmail, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    ev.preventDefault();
                    newHabitRoot = document.querySelector(".newHabit");
                    newHabitRoot.style.display = "none";
                    name = ev.target.name.value;
                    categorie = ev.target.categorie.value;
                    time = ev.target.time.value;
                    userEmail = email;
                    if (!name || !categorie || !time)
                        throw new Error("please complete all fields!");
                    return [4 /*yield*/, fetch("/API/habits/add-new-habit", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ name: name, categorie: categorie, time: time, userEmail: userEmail })
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data !== true) {
                        throw new Error("problem with server");
                    }
                    else {
                        location.reload();
                    }
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
function manageDocName(name) {
    var docRoot = document.querySelector("#docRoot");
    docRoot.innerHTML = name + "-HABITER";
}
// get tasks of user
var Categorie;
(function (Categorie) {
    Categorie["health"] = "health";
    Categorie["focus"] = "focus";
    Categorie["learn"] = "learn";
    Categorie["fun"] = "fun";
})(Categorie || (Categorie = {}));
var Time;
(function (Time) {
    Time["morning"] = "morning";
    Time["afternoon"] = "afternoon";
    Time["evening"] = "evening";
})(Time || (Time = {}));
var Status;
(function (Status) {
    Status["todo"] = "todo";
    Status["done"] = "done";
})(Status || (Status = {}));
var UserTasks = /** @class */ (function () {
    function UserTasks(name, categorie, time, status, email, _id) {
        this.name = name;
        this.categorie = categorie;
        this.time = time;
        this.status = status;
        this.email = email;
        this._id = _id;
    }
    return UserTasks;
}());
function getUserTasks() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/API/habits/get-user-habits?email=" + email)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    printUserTasks(data);
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
// print tasks of user
function printUserTasks(arr) {
    arr.forEach(function (obj) {
        if (obj.time === "morning") {
            printTaskByTime(obj, document.querySelector("#morning"));
        }
        if (obj.time === "afternoon") {
            printTaskByTime(obj, document.querySelector("#afternoon"));
        }
        if (obj.time === "evening") {
            printTaskByTime(obj, document.querySelector("#evening"));
        }
    });
}
function printTaskByTime(task, root) {
    var html = "<div onclick=\"taskDocs('" + task.name + "','" + task.categorie + "','" + task.status + "')\" class=\"task\" id=\"" + task._id + "\">\n    <h1 class=\"task__header\">" + task.name + "</h1>\n    <h2 class=\"task__categorie\">" + task.categorie + "</h2>\n</div>";
    root.innerHTML += html;
}
function taskDocs(name, categorie, status) {
    var root = document.querySelector(".taskDocsRoot");
    root.style.display = "flex";
    var html = "<div class=\"taskDoc\">\n    <div class=\"exitBTN\" onclick=\"exitNewHabit()\"><i class=\"fas fa-door-closed fa-lg door-closed\" style=\"color: #ffffff;\"></i></div>\n\n    <h1 class=\"taskDoc__header\">" + name + "</h1>\n    <h2 class=\"taskDoc__categorie\">" + categorie + "</h2>\n    <h2 class=\"taskDoc__status\">" + status + "</h2>\n    <div class=\"taskDoc__doneTodayBTN\" onclick=\"habitdoneToday('" + name + "','" + categorie + "','" + status + "')\">DONE Today!</div>\n    <div class=\"taskDoc__doneBTN\" onclick=\"taskDone('" + name + "','" + categorie + "','" + status + "')\">DONE Forever!</div>\n    <div class=\"taskDoc__deleteBTN\" onclick=\"deleteHabit('" + name + "','" + categorie + "','" + status + "')\">DELETE!</div>\n    <div class=\"taskDoc__changeTimeBTN\" onclick=\"changeHabitTime('" + name + "','" + categorie + "','" + status + "')\">change Time</div>\n\n</div>";
    root.innerHTML = html;
    taskBTNeffect();
}
function changeHabitTime(name, categorie, status) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, time, root, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/API/habits/getHabitTime?email=" + email, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ name: name, categorie: categorie })
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data.time);
                    time = data.time;
                    root = document.querySelector(".changeTime");
                    changeHabitTimeForm(name, categorie, status, time, root);
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
function changeHabitTimeForm(name, categorie, status, time, root) {
    var html = htmlForm(time);
    root.innerHTML += html;
    root.style.display = "flex";
}
function htmlForm(time) {
    if (time == "morning") {
        return "<form onsubmit=\"HandlechangeTime(event)\">\n        <select class=\"ChangeTimeSelect\" name=\"changetime\" id=\"changetime\">\n            <option value=\"afternoon\">afternoon</option>\n            <option value=\"evening\">evening</option>\n        </select>\n        <input type=\"submit\" placeholder=\"submit\">\n    </form>";
    }
    if (time == "afternoon") {
        return "<form onsubmit=\"HandlechangeTime(event)\">\n        <select class=\"ChangeTimeSelect\" name=\"changetime\" id=\"changetime\">\n            <option value=\"morning\">morning</option>\n            <option value=\"evening\">evening</option>\n        </select>\n        <input type=\"submit\" placeholder=\"submit\">\n    </form>";
    }
    if (time == "evening") {
        return "<form onsubmit=\"HandlechangeTime(event)\">\n        <select class=\"ChangeTimeSelect\" name=\"changetime\" id=\"changetime\">\n            <option value=\"morning\">morning</option>\n            <option value=\"afternoon\">afternoon</option>\n        </select>\n        <input type=\"submit\" placeholder=\"submit\">\n    </form>";
    }
}
function HandlechangeTime(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var changetimeTo, response, data, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    ev.preventDefault();
                    changetimeTo = ev.target.changetime.value;
                    return [4 /*yield*/, fetch("/API/habits/changeTimeTo", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ changetimeTo: changetimeTo })
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    location.reload();
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    console.error(error_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function taskBTNeffect() {
    var doneBTN = document.querySelector(".taskDoc__doneBTN");
    var deleteBTN = document.querySelector(".taskDoc__deleteBTN");
    var changeTimeBTN = document.querySelector(".taskDoc__changeTimeBTN");
    var doneTodayBTN = document.querySelector(".taskDoc__doneTodayBTN");
    var taskDoc = document.querySelector(".taskDoc");
    doneBTN.addEventListener("mouseover", function () {
        taskDoc.style.backgroundColor = "rgba(45, 211, 45, 0.465)";
    });
    doneBTN.addEventListener("mouseout", function () {
        taskDoc.style.backgroundColor = "transparent";
        taskDoc.style.backdropFilter = "blur(20px)";
    });
    deleteBTN.addEventListener("mouseover", function () {
        taskDoc.style.backgroundColor = "rgba(231, 27, 27, 0.58)";
    });
    deleteBTN.addEventListener("mouseout", function () {
        taskDoc.style.backgroundColor = "transparent";
        taskDoc.style.backdropFilter = "blur(20px)";
    });
    changeTimeBTN.addEventListener("mouseover", function () {
        taskDoc.style.backgroundColor = "rgb(217,193,193)";
        taskDoc.style.background = " linear-gradient(90deg, rgba(217,193,193,1) 34%, rgba(86,198,226,1) 80%)";
    });
    changeTimeBTN.addEventListener("mouseout", function () {
        taskDoc.style.backgroundColor = "transparent";
        taskDoc.style.background = "transparent";
        taskDoc.style.backdropFilter = "blur(20px)";
    });
    doneTodayBTN.addEventListener("mouseover", function () {
        taskDoc.style.backgroundColor = "rgb(73,205,166)";
        taskDoc.style.background = "linear-gradient(90deg, rgba(73,205,166,1) 34%, rgba(86,226,112,1) 80%)";
    });
    doneTodayBTN.addEventListener("mouseout", function () {
        taskDoc.style.backgroundColor = "transparent";
        taskDoc.style.background = "transparent";
        taskDoc.style.backdropFilter = "blur(20px)";
    });
}
function taskDone(name, categorie, status) {
    return __awaiter(this, void 0, void 0, function () {
        var root, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    root = document.querySelector(".taskDoc");
                    root.style.display = "none";
                    return [4 /*yield*/, fetch("/API/habits/habitDone", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ name: name, categorie: categorie, status: status, email: email })
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data !== true)
                        throw new Error("problem with the server");
                    deleteHabit(name, categorie, status);
                    return [2 /*return*/];
            }
        });
    });
}
function deleteHabit(name, categorie, status) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/API/habits/deleteHabit", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ name: name, categorie: categorie, status: status })
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data !== true) {
                        throw new Error("problem with server");
                    }
                    else {
                        location.reload();
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    console.error(error_6);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function redirectToDone() {
    window.location.href = "../doneHabits/doneHabits.html?email=" + email;
}
function habitdoneToday(name, categorie, status) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/API/habits/HabitDoneToday", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name: name, categorie: categorie })
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
window.addEventListener("load", changeDoneToday);
function changeDoneToday() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/API/habits/getDoneTodayHabits")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    data.forEach(function (obj) {
                        addClasslist(obj._id);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function addClasslist(id) {
    var root = document.getElementById(id);
    if (root) {
        root.classList.add('Done');
        root.classList.remove('task');
    }
    else {
        console.error("Element with ID \"" + id + "\" not found.");
    }
}
//  quotes
var Quote = /** @class */ (function () {
    function Quote(quote, author) {
        this.quote = quote;
        this.author = author;
    }
    return Quote;
}());
var quotes = [
    new Quote("Believe you can and you're halfway there.", "Theodore Roosevelt"),
    new Quote("The only way to do great work is to love what you do.", "Steve Jobs"),
    new Quote("Success is not final, failure is not fatal: It is the courage to continue that counts.", "Winston Churchill"),
    new Quote("Don't watch the clock; do what it does. Keep going.", "Sam Levenson"),
    new Quote("Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.", "Christian D. Larson"),
    new Quote("Success is walking from failure to failure with no loss of enthusiasm.", "Winston Churchill"),
];
function getRandomQuote(arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
printQuote();
function printQuote() {
    var quote = getRandomQuote(quotes);
    var html = "<h2 class=\"quoteRoot__quote\">" + quote.quote + "</h2><h2 class=\"quoteRoot__author\">" + quote.author + "</h2>";
    var quoteRoot = document.querySelector(".quoteRoot");
    quoteRoot.innerHTML += html;
}
