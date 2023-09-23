import express from "express";
import { addNewHabit , getUserHabits , habitDone , deleteHabit , getDoneHabits , getHabitTime , changeTimeTo , HabitDoneToday , getDoneTodayHabits} from "./habitsCont" ;
import { getLoggedUser } from "./habitsMiddlwear"
const habitsRouter = express.Router();

habitsRouter.post("/add-new-habit", addNewHabit)
.get("/get-user-habits", getUserHabits)
.post("/habitDone", habitDone)
.post("/deleteHabit", deleteHabit)
.get("/getDoneHabits", getDoneHabits)
.post("/getHabitTime", getHabitTime)
.post("/changeTimeTo", changeTimeTo)
.post("/HabitDoneToday", getLoggedUser,  HabitDoneToday)
.get("/getDoneTodayHabits",getLoggedUser, getDoneTodayHabits);




export default habitsRouter;