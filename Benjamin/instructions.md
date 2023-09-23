HABITER
A tool to manage your habits.
elements:
//register+login pages (login page creates USER cookie automatically)
//welcome greeting: hello (user's name) have a great day of habits!
//inspirational quote changing randomly every time the page refreshes
//add new habit button that opens new tab in which you creates a new habit (changes tab dsiplay from none to flex)
//add new habit tab - in which you create a new habit. you need to name your habit, choose your habit's category and time of day (form select). by the time of day you choosed the habit will be placed in one of the 3 time of day columns.
//by checking a habit you can:
1. delete it
2. done forever
3. done for today
4. change time of day (which will change its column depends on the time you choosed)
//docs tab - by clicking the burger icon a docs tab will open with info about the app and info about the current user.
//done page - where the done forever tasks will go. it write when the task done and how much time it habited (from start till marking done forever).
//task that marked as done today changes its color (and its entity of done today in the DB to true), untill 00:00 (midnight) of that day. the function that changes all the doneToday entities in the DB uses cron (The node-cron module is tiny task scheduler in pure JavaScript for node.js based on GNU crontab. This module allows you to schedule task in node.js using full crontab syntax).