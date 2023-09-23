

function getEmailFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('email');
}

const email = getEmailFromQuery();
console.log(email)


getDoneHabits()
async function getDoneHabits() {
    debugger;
    const response = await fetch(`/API/habits/getDoneHabits?email=${email}`);
    const data = await response.json();
    console.log(data)
    exportData(data)
}

class DoneHabit {
    constructor(
        public name: string,
        public categorie: string,
        public dateStarted: Date,
        public timeDone: Date

    ) { }
}
function exportData(data: DoneHabit[]) {
    data.forEach(obj => {
        const name = obj.name;
        const categorie = obj.categorie;
        const date = obj.timeDone;
        const dateStarted = obj.dateStarted;
        console.log(date, dateStarted)
        const root = document.querySelector(".doneHabits") as HTMLDivElement;
        renderData(name, categorie, dateStarted, date, root)
    })
}

function CALCtimePassed(days,hours,minutes,seconds){
    if (days == 0 && hours == 0 && minutes == 0) {
        return `${seconds} seconds`;
    }
    if (days == 0 && hours == 0 && minutes != 0) {
        return `${minutes} minutes, ${seconds} seconds`;
    }
    if (days == 0 && hours != 0 && minutes != 0) {
        return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }
    if (days != 0 && hours != 0 && minutes != 0) {
        return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }
    
}


function renderData(name, categorie, dateStarted: Date, date: Date, root: HTMLDivElement) {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();

    const dateObjectStarted = new Date(dateStarted);

    const timeDifferenceInMilliseconds = dateObject.getTime() - dateObjectStarted.getTime();

    // Convert the time difference to the desired units (e.g., hours, minutes, seconds)
    const millisecondsInASecond = 1000;
    const millisecondsInAMinute = 60 * millisecondsInASecond;
    const millisecondsInAnHour = 60 * millisecondsInAMinute;
    const millisecondsInADay = 24 * millisecondsInAnHour;

    const days = Math.floor(timeDifferenceInMilliseconds / millisecondsInADay);
    const hours = Math.floor((timeDifferenceInMilliseconds % millisecondsInADay) / millisecondsInAnHour);
    const minutes = Math.floor((timeDifferenceInMilliseconds % millisecondsInAnHour) / millisecondsInAMinute);
    const seconds = Math.floor((timeDifferenceInMilliseconds % millisecondsInAMinute) / millisecondsInASecond);
    const timePassed = CALCtimePassed(days,hours,minutes,seconds)
    console.log(timePassed)
   



    const html = `<div class="doneHabits__habit">
    <h1 class="doneHabits__habit__header">${name}</h1>
    <h2 class="doneHabits__habit__categorie">${categorie}</h2>
    <h2 class="doneHabits__habit__date">${day}/${month}/${year}</h2>
    <h2 class="doneHabits__habit__date">Time Habited: ${timePassed}</h2>
</div>`
    root.innerHTML += html;

}
function backToMain() {
    window.location.href = `../main/main.html?email=${email}`;
}
