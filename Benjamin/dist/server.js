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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cron = require('node-cron');
const app = express_1.default();
const port = process.env.PORT || 3000;
//static files
app.use(express_1.default.static("public"));
//body
app.use(express_1.default.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const usersRouter_1 = __importDefault(require("./API/users/usersRouter"));
app.use("/API/users", usersRouter_1.default);
const habitsRouter_1 = __importDefault(require("./API/habits/habitsRouter"));
app.use("/API/habits", habitsRouter_1.default);
const mongoose = require('mongoose');
main().catch(err => console.log(err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose.connect('mongodb+srv://benben3135:cpoI5wCWhSRm5jlw@cluster0.nmg3euq.mongodb.net/');
        console.log('Connected to Atlas');
    });
}
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
