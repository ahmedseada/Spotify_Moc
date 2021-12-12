import { ipcRenderer } from "electron";

let player: any = document.getElementById("player");
let isGreater = GetDurationHours(player.duration);
let played :any = document.getElementById('played');
let left :any = document.getElementById('left');
let total :any = document.getElementById('total');
let playedRange :any = document.getElementById('playedRange');
let tracksBody :any = document.querySelector('.tracks-table tbody');



function Minimize(){
  console.log("Minimizing");
  
  ipcRenderer.send('min');
}
function Maximize(){
  console.log("Maximizing");
  
  ipcRenderer.send('max');
}
function Close(){
  console.log("Closing");
  
  ipcRenderer.send('close');
}
 
function Seed(){
    
    player.currentTime =player.duration * (playedRange.value/100)


    
}
function LoadTracks(){
  ipcRenderer.removeAllListeners('paths');
  ipcRenderer.removeAllListeners('load-tracks');
    ipcRenderer.send('load-tracks');
    ipcRenderer.on('paths',(evt,paths : Array<string>)=>{
      paths.forEach(path => { 
        let tr= `
        <tr>
             <th>#</th>
             <th>Title</th>
             <th>Alubm</th>
        </tr>
        `;
  
        tracksBody.insertAdjacentHTML('beforeend',tr);
      });

    })
}
player.ontimeupdate = (evt: any) => {
    let totalDu = getTimeString(player.duration);
    let currentTime = getTimeString(player.currentTime);
    let leftDu  = getTimeString(player.duration - player.currentTime)
    playedRange.value = (player.currentTime/player.duration) *100;
    console.log(playedRange.value );
    
    total.innerHTML = totalDu;
    played.innerHTML = currentTime;
    // left.innerHTML = leftDu;
};

function play(){
    player.play();
}

function getTimeString(seconds: number): string {
    let secondsToHours = (seconds / (60 * 60)); 
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

 