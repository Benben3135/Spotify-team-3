"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//npm i dotenv
require("dotenv/config");
const app = express_1.default();
const port = process.env.PORT || 3000;
//middlware for using parser
app.use(cookie_parser_1.default());
//static files
app.use(express_1.default.static("Public"));
//body
app.use(express_1.default.json());
const { MONGO_URI } = process.env;
//connect to mongoDB with mongoose
mongoose_1.default.connect(MONGO_URI).then(() => {
    console.info("MongoDB connected");
})
    .catch(err => {
    console.error(err);
});
const userRouter_1 = __importDefault(require("./API/users/userRouter"));
app.use("/API/users", userRouter_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
