function handleUpdateNameCard(ev) {
  debugger;
  const name = ev.target.value;
  const artistName = document.querySelector(".artist__nameCard") as HTMLDivElement
  artistName.innerHTML = name;

}
function handleUpdateImgCard(ev) {
  debugger;
  const img = ev.target.value;
  const artistImg = document.querySelector(".artist__imgCard") as HTMLDivElement
  artistImg.innerHTML = `<img class="artist__imgCard__img" src="${img}" alt="">`;
}
function handleUpdateInfoCard(ev) {
  debugger;

  const info = ev.target.value;
  console.log(info)
  const artistInfo = document.querySelector(".artist__infoCard") as HTMLDivElement
  artistInfo.innerHTML = info;

}

async function handleRegister(ev: any) {

  ev.preventDefault();
  debugger;

  const name = ev.target.name.value;
  const email = ev.target.email.value;
  const password = ev.target.password.value;

  const user = { name, email, password };
  if (!user.email || !user.password) throw new Error("missing some details");
  const response = await fetch("http://localhost:3000/API/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();

  window.location.href = `http://localhost:3000/index.html`;
}

async function handleRegisterArtist(ev: any) {

  ev.preventDefault();
  debugger;

  const name = ev.target.name.value;
  const email = ev.target.email.value;
  const password = ev.target.password.value;
  const birthday = ev.target.age.value;

  const age = calculateAge(birthday);
  const artistName = ev.target.artistName.value;
  const artistImg = ev.target.artistImg.value;
  const artistInfo = ev.target.artistInfo.value;
  //register an artist
  if (artistName) {
    const user = { name, email, password, age, artistName, artistImg, artistInfo };
    if (!user.email || !user.password) throw new Error("missing some details");
    const response = await fetch("http://localhost:3000/API/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
      return;
    }

    window.location.href = `http://localhost:3000/index.html`;



  }
  //register for not an artist user
  else {
    const user = { name, email, password };
    if (!user.email || !user.password) throw new Error("missing some details");
    const response = await fetch("http://localhost:3000/API/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    window.location.href = `http://localhost:3000/index.html`;
  }


}

function calculateAge(birthday) {
  // Parse the input birthday string into a Date object
  const birthdayDate = new Date(birthday);

  // Get the current date
  const currentDate = new Date();

  // Calculate the age by subtracting the birth year from the current year
  const age = currentDate.getFullYear() - birthdayDate.getFullYear();

  return age;
}




