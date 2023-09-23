"use strict";
exports.__esModule = true;
var express_1 = require("express");
var habitsCont_1 = require("./habitsCont");
var habitsMiddlwear_1 = require("./habitsMiddlwear");
var habitsRouter = express_1["default"].Router();
habitsRouter.post("/add-new-habit", habitsCont_1.addNewHabit)
    .get("/get-user-habits", habitsCont_1.getUserHabits)
    .post("/habitDone", habitsCont_1.habitDone)
    .post("/deleteHabit", habitsCont_1.deleteHabit)
    .get("/getDoneHabits", habitsCont_1.getDoneHabits)
    .post("/getHabitTime", habitsCont_1.getHabitTime)
    .post("/changeTimeTo", habitsCont_1.changeTimeTo)
    .post("/HabitDoneToday", habitsMiddlwear_1.getLoggedUser, habitsCont_1.HabitDoneToday)
    .get("/getDoneTodayHabits", habitsMiddlwear_1.getLoggedUser, habitsCont_1.getDoneTodayHabits);
exports["default"] = habitsRouter;
