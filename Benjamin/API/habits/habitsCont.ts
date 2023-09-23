import { HabitSchema , HabitModelDB, doneHabitsShema , DoneHabitModelDB } from "./habitsModel";



export const addNewHabit = async (req:any,res:any) => {
    const {name,categorie,time,userEmail } = req.body;
    if (!name || !categorie || !time) throw new Error("please complete all fields");
    const habit = await HabitModelDB.create({
        name:name,
        categorie:categorie,
        time:time,
        status:"todo",
        email: userEmail
    })
    res.send(true)
}

export const getUserHabits = async (req:any,res:any) => {
try {
    const {email} = req.query;
    const tasks = await HabitModelDB.find({email:email});
    console.log(tasks)
    res.send(tasks);
    

} catch (error) {
    console.error(error)
}
}
export const habitDone = async (req:any, res:any) => {
    try {
       const  { name , categorie , status , email } = req.body;
       const date = await HabitModelDB.findOne({ name: name, email: email }, 'createdAt');
       

       const task = await DoneHabitModelDB.create({
        name: name,
        categorie: categorie,
        email:email,
        dateStarted:date.createdAt,
        })
        res.send(true);
    } catch (error) {
        console.error(error);
    }
}
export const deleteHabit = async (req:any,res:any) => {
    try {
        const  { name , categorie , status } = req.body;
        await HabitModelDB.deleteOne({name:name}); 
        console.log("task deleted!")
        res.send(true);
    } catch (error) {
        console.error(error);
    }
}

export const getDoneHabits = async (req:any,res:any) => {
    try {
        const {email} = req.query;
        const doneHabits = await DoneHabitModelDB.find({email:email});
        res.send(doneHabits)
    } catch (error) {
        console.error(error);
    }
}

export const getHabitTime = async (req:any,res:any) => {
    try {
        const {email} = req.query;
        const {name, categorie} = req.body;
        const habit = await HabitModelDB.findOne({email:email, name:name});
        const habitTime = await HabitModelDB.findOne({email:email, name:name , categorie:categorie}, 'time');
        res.cookie("habitID" ,habit._id, {maxAge: 1000*60*60*24, httpOnly:true})

        res.send(habitTime)
    } catch (error) {
        console.error(error);
    }
}

export const changeTimeTo = async (req:any,res:any) => {
    try {
       const habitID = req.cookies.habitID;
       const {changetimeTo} = req.body;
       if(!habitID) throw new Error("user doesnt found on cookie")
       console.log(habitID)
       const newHabit = await HabitModelDB.findByIdAndUpdate(habitID, { time: changetimeTo }, { new: true });

       
    res.send(true)
    } catch (error) {
        console.error(error);
    }
}

export const HabitDoneToday = async (req:any,res:any) => {
    try {
        
      const {name, categorie} = req.body;
      const userDB = req.user;
      console.log(name,categorie,userDB)
      const email = userDB.email
      const userHabit = await HabitModelDB.findOneAndUpdate({email:email,name:name,categorie:categorie},{doneToday: true})
    res.send(true)
    } catch (error) {
        console.error(error);
    }
}

export const getDoneTodayHabits = async (req:any,res:any) => {
    try {
        const habitsDone = await HabitModelDB.find({doneToday: true})
    res.send(habitsDone)
    } catch (error) {
        console.error(error);
    }
}