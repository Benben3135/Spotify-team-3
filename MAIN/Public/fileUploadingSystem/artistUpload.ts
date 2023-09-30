
const redirect_uri = "http://127.0.0.1:5500/MAIN/Public/fileUploadingSystem/artistUpload.html"

let client_id = "";
let client_secret = "";

const AUTHORIZE = "https://accounts.spotify.com/authorize"

function onPageLoad(){

}



function requestAuthorization(){
    client_id = (document.querySelector("#clientId") as HTMLInputElement).value;
    client_secret = (document.querySelector("#clientSecret") as HTMLInputElement).value;
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret",client_secret); //In a real app you should not expose your client_secret to the user

    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response-type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private" //permissions we want from spotify
    window.location.href = url; //Show Spotify's authorization screen
}