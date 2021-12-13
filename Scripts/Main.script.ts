import { ipcRenderer } from "electron";
import { IArtitstSearchItem, ITrackSearchItem } from "../Models/SearchItems";
let player: any = document.getElementById("player");
let isGreater = GetDurationHours(player.duration);
let played: any = document.getElementById("played");
let left: any = document.getElementById("left");
let total: any = document.getElementById("total");
let playedRange: any = document.getElementById("playedRange");
let playPauseImg: any = document.getElementById("playPauseImg");
let search_term: any = document.getElementById("search-term");
let search_type: any = document.getElementById("search-type");
let track_title: any = document.getElementById("track-title");
let track_artist: any = document.getElementById("track-artist");
let p_artist_name: any = document.getElementById("profile-artist-name");
let p_track_name: any = document.getElementById("profile-track-name");
let track_img: any = document.getElementById("track-img");
let profile_img: any = document.getElementById("profile-img");
let tracksBody: any = document.querySelector(".tracks-table tbody");
let tracks_table: any = document.querySelector(".tracks-table");
let card_container: any = document.querySelector("#card-container");
let isPlaying: boolean = false;

function Minimize() {
  console.log("Minimizing");

  ipcRenderer.send("min");
}
function Maximize() {
  console.log("Maximizing");

  ipcRenderer.send("max");
}
function Close() {
  console.log("Closing");

  ipcRenderer.send("close");
}

function Seed() {
  player.currentTime = player.duration * (playedRange.value / 100);
}
function LoadTracks() {
  if (search_term.value.trim() != "") {
    ipcRenderer.removeAllListeners("paths");
    let search_txt = search_term.value.trim().split(" ").join("%25");
    ipcRenderer.removeAllListeners("load-tracks");
    ipcRenderer.send("load-tracks", search_txt, "track");
    ipcRenderer.send("load-tracks", search_txt, "artist");

    ipcRenderer.on("tracks", (evt, tracks: Array<ITrackSearchItem>) => {
      
      
      tracks_table.classList.remove("hidden");

      tracksBody.innerHTML = "";

      tracksBody.classList.remove("hidden");
      let count = 1;
      tracks.forEach((track) => {
        let tr = `
          <tr  id="tr-${count}" onclick="PlayTrack('#tr-${count}','${track.preview_url}' , '${track.name}' ,'${
          track.artists[0].name
        }','${track.album.images[0].url}' )">
               <td>${count}</td>
               <td>${track.name}</td>
               <td>${track.artists[0] ? track.artists[0].name : ""}</td>
               <td>${track.album.name}</td>
          </tr>
          `;

        tracksBody.insertAdjacentHTML("beforeend", tr);
        count++;
      });
    });
    ipcRenderer.on("artists", (evt, artists: Array<IArtitstSearchItem>) => {
      tracks_table.classList.add("hidden");
      card_container.innerHTML='';
      tracksBody.innerHTML = "";
   


      artists.forEach((artist) => {
        let card = `
        <div class="artist-card">
            <img src="${artist.images[0].url}" alt="" id="artist-card-img">
            <p id="artist-card-name">${artist.name} </p>
            <p>Artist</p>
        </div>
        `;
        card_container.insertAdjacentHTML('beforeend',card);
      });
    });
  }
}

player.ontimeupdate = (evt: any) => {
  let totalDu = getTimeString(player.duration);
  let currentTime = getTimeString(player.currentTime);
  let leftDu = getTimeString(player.duration - player.currentTime);
  playedRange.value = (player.currentTime / player.duration) * 100;

  total.innerHTML = totalDu;
  played.innerHTML = currentTime;
  // left.innerHTML = leftDu;
};

function play() {
  let path = playPauseImg.src.split("/");
  path.pop();
  if (!isPlaying) {
    path.push("pause.png");
    playPauseImg.src = path.join("/");
    player.play();
  } else {
    path.push("play.png");
    playPauseImg.src = path.join("/");
    player.pause();
  }
  isPlaying = !isPlaying;
}
function PlayTrack(selector :string,src: string, title: string, artist: string, imgSrc: string) {
  if (src != "null") {
    document.querySelectorAll('tr').forEach(tr => tr.classList.remove('active-tr') );
    document.querySelector(selector)?.classList.add("active-tr");
    player.src = src;
    player.play();
    let path = playPauseImg.src.split("/");
    path.pop();
    path.push("pause.png");
    playPauseImg.src = path.join("/");
    isPlaying = true;

    track_title.innerText = `${title}`;
    p_track_name.innerText = `${title}`;

    track_artist.innerText = `${artist}`;
    p_artist_name.innerText = `${artist}`;
    track_img.src = `${imgSrc}`;
    profile_img.src = `${imgSrc}`;
  }
}

function getTimeString(seconds: number): string {
  let secondsToHours = seconds / (60 * 60);
  let hours = Math.floor(secondsToHours); // Caluclate Total Hours
  let min = Math.floor((secondsToHours - hours) * 60);
  let sec = Math.floor(((secondsToHours - hours) * 60 - min) * 60);

  if (!isGreater) {
    return `${hours < 10 ? "0" + hours : hours}:${min < 10 ? "0" + min : min}:${
      sec < 10 ? "0" + sec : sec
    }`;
  } else {
    return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  }
}

function GetDurationHours(seconds: number): boolean {
  let hours = Math.floor(seconds / (60 * 60));
  return hours > 0;
}

ipcRenderer.on("error-msg", (evt, msg) => {
  alert(msg);
});
