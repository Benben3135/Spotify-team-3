import { Schema, model } from 'mongoose';
const cron = require('node-cron');
// DB models
export const HabitSchema = new Schema({
    name: String,
    categorie: String,
    time: String,
    status:String,
    email: String,
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
      },
      doneToday: {
        type: Boolean,
        default: false,
      }
});

export const HabitModelDB = model("habits", HabitSchema);

const resetDoneTodayJob = cron.schedule('0 0 * * *', async () => {
    try {
      // Reset the doneToday property to false for all habits
      await HabitModelDB.updateMany({}, { $set: { doneToday: false } });
      console.log('doneToday properties reset to false for all habits.');
    } catch (error) {
      console.error('Error resetting doneToday properties:', error);
    }
  });
  
  // Start the cron job
  resetDoneTodayJob.start();





export const doneHabitsShema = new Schema({
    name: String,
    categorie: String,
    email:String,
    timeHabited:String,
    dateStarted:Date,
    timeDone: {
        type: Date,
    immutable: true,
    default: () => Date.now(),
    }
})

export const DoneHabitModelDB = model("DoneHabits", doneHabitsShema);
