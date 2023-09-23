"use strict";
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
exports.__esModule = true;
exports.getDoneTodayHabits = exports.HabitDoneToday = exports.changeTimeTo = exports.getHabitTime = exports.getDoneHabits = exports.deleteHabit = exports.habitDone = exports.getUserHabits = exports.addNewHabit = void 0;
var habitsModel_1 = require("./habitsModel");
exports.addNewHabit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, categorie, time, userEmail, habit;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, categorie = _a.categorie, time = _a.time, userEmail = _a.userEmail;
                if (!name || !categorie || !time)
                    throw new Error("please complete all fields");
                return [4 /*yield*/, habitsModel_1.HabitModelDB.create({
                        name: name,
                        categorie: categorie,
                        time: time,
                        status: "todo",
                        email: userEmail
                    })];
            case 1:
                habit = _b.sent();
                res.send(true);
                return [2 /*return*/];
        }
    });
}); };
exports.getUserHabits = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, tasks, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.query.email;
                return [4 /*yield*/, habitsModel_1.HabitModelDB.find({ email: email })];
            case 1:
                tasks = _a.sent();
                console.log(tasks);
                res.send(tasks);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.habitDone = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, categorie, status, email, date, task, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, name = _a.name, categorie = _a.categorie, status = _a.status, email = _a.email;
                return [4 /*yield*/, habitsModel_1.HabitModelDB.findOne({ name: name, email: email }, 'createdAt')];
            case 1:
                date = _b.sent();
                return [4 /*yield*/, habitsModel_1.DoneHabitModelDB.create({
                        name: name,
                        categorie: categorie,
                        email: email,
                        dateStarted: date.createdAt
                    })];
            case 2:
                task = _b.sent();
                res.send(true);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteHabit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, categorie, status, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name = _a.name, categorie = _a.categorie, status = _a.status;
                return [4 /*yield*/, habitsModel_1.HabitModelDB.deleteOne({ name: name })];
            case 1:
                _b.sent();
                console.log("task deleted!");
                res.send(true);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                console.error(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getDoneHabits = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, doneHabits, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.query.email;
                return [4 /*yield*/, habitsModel_1.DoneHabitModelDB.find({ email: email })];
            case 1:
                doneHabits = _a.sent();
                res.send(doneHabits);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getHabitTime = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, _a, name, categorie, habit, habitTime, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                email = req.query.email;
                _a = req.body, name = _a.name, categorie = _a.categorie;
                return [4 /*yield*/, habitsModel_1.HabitModelDB.findOne({ email: email, name: name })];
            case 1:
                habit = _b.sent();
                return [4 /*yield*/, habitsModel_1.HabitModelDB.findOne({ email: email, name: name, categorie: categorie }, 'time')];
            case 2:
                habitTime = _b.sent();
                res.cookie("habitID", habit._id, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
                res.send(habitTime);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _b.sent();
                console.error(error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.changeTimeTo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var habitID, changetimeTo, newHabit, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                habitID = req.cookies.habitID;
                changetimeTo = req.body.changetimeTo;
                if (!habitID)
                    throw new Error("user doesnt found on cookie");
                console.log(habitID);
                return [4 /*yield*/, habitsModel_1.HabitModelDB.findByIdAndUpdate(habitID, { time: changetimeTo }, { "new": true })];
            case 1:
                newHabit = _a.sent();
                res.send(true);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.HabitDoneToday = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, categorie, userDB, email, userHabit, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name = _a.name, categorie = _a.categorie;
                userDB = req.user;
                console.log(name, categorie, userDB);
                email = userDB.email;
                return [4 /*yield*/, habitsModel_1.HabitModelDB.findOneAndUpdate({ email: email, name: name, categorie: categorie }, { doneToday: true })];
            case 1:
                userHabit = _b.sent();
                res.send(true);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _b.sent();
                console.error(error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getDoneTodayHabits = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var habitsDone, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, habitsModel_1.HabitModelDB.find({ doneToday: true })];
            case 1:
                habitsDone = _a.sent();
                res.send(habitsDone);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                console.error(error_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
