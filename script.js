const wrapper=document.querySelector(".wrapper"),
musicImg=wrapper.querySelector("img"),
musicName=wrapper.querySelector(".name"),
musicArtist=wrapper.querySelector(".artist"),
playPauseBtn=wrapper.querySelector(".play-pause"),
prevBtn=wrapper.querySelector("#prev"),
nextBtn=wrapper.querySelector("#next"),
mainAudio=wrapper.querySelector("#main-song"),
progress=wrapper.querySelector(".progress"),
progressBar=wrapper.querySelector(".progress-bar"),
imageRotate=document.querySelector("#image-id"),
muteBtn=document.getElementById("mute");
const repeatBtn=document.getElementById("repeat");
const themeBtn=document.getElementById("theme");
const PlaySong=document.getElementById("songDetails")
const songsMenu=document.getElementById("songMenu")
const bodyColor=document.querySelector("#bodyColor")
var clicked=document.querySelector(".clicked");


for(i=0;i<allMusic.length;i++){
    const divSong=document.createElement("div")
    divSong.className="song"
    songsMenu.appendChild(divSong)
    divSong.innerHTML=`
    <div class="songDetails">
        <h4>${allMusic[i].name}</h4>
        <h5>${allMusic[i].artist}</h5>
        <h6 style="color:white;display:none">${allMusic[i].index}</h6>
    </div>
    <img class="menuImg" src="img/${allMusic[i].img}.jpg">
    `
}


let musicIndex=Math.floor((Math.random()*allMusic.length)+1);
isMusicPaused=true;
window.addEventListener("load",loadMusic(musicIndex))


function loadMusic(indexNumber){
    musicName.innerText=allMusic[indexNumber-1].name;
    musicArtist.innerText=allMusic[indexNumber-1].artist;
    musicImg.src=`img/${allMusic[indexNumber-1].img}.jpg`;
    mainAudio.src=`music/${allMusic[indexNumber-1].src}.mp3`;
}

function playMusic(){
    mainAudio.play();
    wrapper.classList.add('paused');
    musicImg.classList.add('rotate')
    playPauseBtn.innerHTML=`<i class="fa-solid fa-pause"></i>`
}

function pauseMusic(){
    mainAudio.pause();
    wrapper.classList.remove("paused");
    musicImg.classList.remove("rotate");
    playPauseBtn.innerHTML=`<i class="fa-solid fa-play"></i>`
}

playPauseBtn.addEventListener('click',()=>{
    const isMusicPlay=wrapper.classList.contains('paused');
    isMusicPlay ? pauseMusic():playMusic();
    if(pauseMusic){
        imageRotate.classList.remove('img-rotate');
    }
    else{
        imageRotate.classList.add('img-rotate')
    }
})

function prevMusic(){
    musicIndex--;
    if(musicIndex<1){
        musicIndex=allMusic.length;
    }
    else{
        musicIndex=musicIndex
    }
    loadMusic(musicIndex);
    playMusic();
}

prevBtn.addEventListener('click',()=>{
    prevMusic();
});

function nextMusic(){
    musicIndex++;
    if(musicIndex>allMusic.length){
        musicIndex=1
    }
    else{
        musicIndex=musicIndex;
    }
    loadMusic(musicIndex);
    playMusic();
}
nextBtn.addEventListener('click',()=>{
    nextMusic();
});


/**Progress Bar */

mainAudio.addEventListener("timeupdate",(e)=>{
    const currentTime=e.target.currentTime;
    const duration=e.target.duration;

    let progresWidth=(currentTime/duration)*100;
    progressBar.style.width=`${progresWidth}%`;

    let musicCurrentTime=wrapper.querySelector(".current-time");
    let musicDuration=wrapper.querySelector(".max-time");

    mainAudio.addEventListener("loadeddata",()=>{
        let mainAdDuration=mainAudio.duration;
        let totalMin=Math.floor(mainAdDuration/60);
        let totalSec=Math.floor(mainAdDuration%60);
        if(totalSec<10){
            totalSec=`0${totalSec}`;
        }
        musicDuration.innerText=`${totalMin}:${totalSec}`;
    });

    let currentMin=Math.floor(currentTime/60);
    let currentSec=Math.floor(currentTime%60);
    if(currentSec<10){
        currentSec=`0${currentSec}`;
    }

    musicCurrentTime.innerText=`${currentMin}:${currentSec}`;
})

progress.addEventListener("click",(e)=>{
    let progressWidth=progress.clientWidth;
    let clickedOffsetX=e.offsetX;
    let songDuration=mainAudio.duration;

    mainAudio.currentTime=(clickedOffsetX/progressWidth)*songDuration;
    playMusic();
})

/**Mute button */
muteBtn.addEventListener("click",()=>{
    muteBtn.classList.toggle("fa-volume-xmark");
    if(mainAudio.muted==true){
        mainAudio.muted=false;
        muteBtn.style.padding="12px 10px"
        muteBtn.style.boxShadow="none"
        muteBtn.style.color="#86898c"

    }
    else{
        mainAudio.muted=true;
        muteBtn.style.padding="12px 11px"
        muteBtn.style.boxShadow="0 0 15px #e1530a"
        muteBtn.style.color="#e1530a"
    }
})

/*song repeat*/
mainAudio.addEventListener("ended",()=>{
    if(clicked.innerHTML==="ON"){
        playMusic();
    }
    else{
        nextMusic();
    }
})

repeatBtn.addEventListener("click",()=>{
    const repeatOn=repeatBtn.classList.contains("repeat-on")
    if(repeatOn){
        repeatBtn.style.color="#86898c"
        repeatBtn.style.boxShadow="none"
        repeatBtn.classList.remove('repeat-on')
        clicked.innerHTML="OFF"
                
    }
    else{
        repeatBtn.style.color="#e1530a"
        repeatBtn.style.boxShadow="0 0 10px #e1530a"
        repeatBtn.classList.add('repeat-on')
        clicked.innerHTML="ON"
    }
   
})

/**Theme Button */

themeBtn.addEventListener("click",()=>{
    themeBtn.classList.toggle("fa-moon")
    const themeColor=themeBtn.classList.contains('fa-moon');
   if(themeColor){
    themeBtn.style.background="#e6e6e6"
    themeBtn.style.color="#040404"
    themeBtn.style.padding="14px 18px"
    document.body.style.backgroundColor="#040404"
   }
   else{
    themeBtn.style.background="#040404"
    themeBtn.style.color="#e6e6e6"
    themeBtn.style.padding="18px"
    document.body.style.backgroundColor="#e6e6e6"
   }
})

const GodFather=document.querySelectorAll(".song")[0].onclick=function(){
    loadMusic(this.querySelector("h6").innerHTML)
    playMusic();
}
const RamaraoOnDuty=document.querySelectorAll(".song")[1].onclick=function(){
    loadMusic(this.querySelector("h6").innerHTML)
    playMusic();
}
const Karthikeya=document.querySelectorAll(".song")[2].onclick=function(){
    loadMusic(this.querySelector("h6").innerHTML)
    playMusic();
}
const RRR=document.querySelectorAll(".song")[3].onclick=function(){
    loadMusic(this.querySelector("h6").innerHTML)
    playMusic();
}
const Sarkaru=document.querySelectorAll(".song")[4].onclick=function(){
    loadMusic(this.querySelector("h6").innerHTML)
    playMusic();
}
const Master=document.querySelectorAll(".song")[5].onclick=function(){
    loadMusic(this.querySelector("h6").innerHTML)
    playMusic();
}
const AlaVaikunta=document.querySelectorAll(".song")[6].onclick=function(){
    loadMusic(this.querySelector("h6").innerHTML)
    playMusic();
}
const RadheShyam=document.querySelectorAll(".song")[7].onclick=function(){
    loadMusic(this.querySelector("h6").innerHTML)
    playMusic();
}
const OriDevuda=document.querySelectorAll(".song")[8].onclick=function(){
    loadMusic(this.querySelector("h6").innerHTML)
    playMusic();
}