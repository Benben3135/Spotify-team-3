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
exports.sendEmail = exports.login = exports.register = void 0;
var userModel_1 = require("./userModel");
//The nodemailer package is a popular Node.js library that allows you to send email from your Node.js applications.
// terminal:
// npm install nodemailer crypto
var nodemailer = require("nodemailer");
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var SECRET = process.env.SECRET;
var secret = SECRET;
var saltRounds = 10;
exports.register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, hash, user, userDB, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password)
                    throw new Error("Please complete all fields");
                return [4 /*yield*/, bcrypt.hash(password, saltRounds)];
            case 1:
                hash = _b.sent();
                user = new userModel_1.UserModelDB({ email: email, password: hash });
                return [4 /*yield*/, user.save()];
            case 2:
                userDB = _b.sent();
                console.log(userDB);
                res.send({ ok: true, userDB: userDB });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error(error_1);
                res.send({ error: error_1.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userDB, hash, match, cookie, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password)
                    throw new Error("Please complete all fields");
                return [4 /*yield*/, userModel_1.UserModelDB.findOne({ email: email })];
            case 1:
                userDB = _b.sent();
                if (!userDB)
                    throw new Error("some of the details are incorrect");
                hash = userDB.password;
                if (!hash)
                    throw new Error("some of the details are incorrect");
                return [4 /*yield*/, bcrypt.compare(password, hash)];
            case 2:
                match = _b.sent();
                if (!match)
                    throw new Error("some of the details are incorrect");
                cookie = {
                    uid: userDB._id,
                    admin: userDB.admin
                };
                token = jwt.encode(cookie, secret);
                console.log(token);
                res.cookie("user", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 48 });
                res.send({ ok: true });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error(error_2);
                res.status(401).send({ error: error_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.sendEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, confirmationCode;
    return __generator(this, function (_a) {
        try {
            console.log("i started!");
            email = req.body.email;
            if (!email)
                throw new Error("Please complete all fields");
            confirmationCode = sendMail(email);
            res.send(confirmationCode);
        }
        catch (error) {
            console.error(error);
            res.status(401).send({ error: error.message });
        }
        return [2 /*return*/];
    });
}); };
//this code is sending an email with a confirmation code to register the app:
function sendMail(email) {
    debugger;
    //this function generates a random code:
    function generateRandomCode() {
        var min = 100000; // Minimum 6-digit number (inclusive)
        var max = 999999; // Maximum 6-digit number (inclusive)
        var confirmationNUM = Math.floor(Math.random() * (max - min + 1)) + min;
        var confirmation = confirmationNUM.toString();
        var cookie = {
            confirmation: confirmation
        };
        var token = jwt.encode(cookie, secret);
        return confirmation;
    }
    // Generate a random confirmation code in the length of 6 digits:
    var confirmationCode = generateRandomCode();
    //send an email with the confirmation code:
    var transporter = nodemailer.createTransport({
        host: "smtp.forwardemail.net",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "teamprojectmusic3@gmail.com",
            pass: "MusicMaster3"
        }
    });
    // async..await is not allowed in global scope, must use a wrapper
    function main() {
        return __awaiter(this, void 0, void 0, function () {
            var info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, transporter.sendMail({
                            from: '"MusicMaster" <teamprojectmusic3@gmail.com>',
                            to: "" + email,
                            subject: "your confirmation code",
                            text: "this is your confirmation code:" + confirmationCode + " , please insert it in the app",
                            html: "<b>" + confirmationCode + "</b>"
                        })];
                    case 1:
                        info = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    return confirmationCode;
}
