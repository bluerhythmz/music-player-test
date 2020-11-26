
let seekBar = document.querySelector('.seek-bar');
let playButton = document.querySelector('button.play');
let fillBar = seekBar.querySelector('.fill');
let nextButton = document.querySelector('.next')
let preButton = document.querySelector('.pre')
let songs = ["audio.mp3", "audio2.mp3", "audio3.mp3"];
let song = new Audio();
let playImg = document.getElementById("playImg")
let counter = 0
let currentSong = 0;
let mouseDown = false;
//yerrrrrrrr
window.onload = pauseSong() 

function pauseSong() {
    song.src = songs[currentSong]
    song.pause();
}

function playSong() {
    song.src = songs[currentSong]
    song.play();
}

function togglePlayPause() {
    
    if (song.paused) {
        song.play();
        playImg.src = "Pause.png"
    } else {
        song.pause();
        playImg.setAttribute("src", "Play.png")
    }
}


nextButton.addEventListener('click', function () {
    currentSong++
    if (currentSong > 2) {
        currentSong = 0
    }
    playSong()
});

preButton.addEventListener('click', function () {
    currentSong--
    if (currentSong < 0) {
        currentSong = 2
    }
    playSong()
})

song.addEventListener('timeupdate', function () {
    if (mouseDown) return
    let p = song.currentTime / song.duration;

    fillBar.style.width = p * 100 + '%';
});


function clamp (min, val, max) {
    return Math.min(Math.max(min, val), max)
}

function getP (e) {
    let p = (e.clientX - seekBar.offsetLeft) / seekBar.clientWidth;
    p = clamp(0, p, 1)

    return p;
}

seekBar.addEventListener('mousedown', function (e) {
    mouseDown = true;

    let p = getP(e)

    fillBar.style.width = p * 100 + '%';
    console.log(p)
})

window.addEventListener('mousemove', function (e) {
    if (!mouseDown) return;
    let p = getP(e);

    fillBar.style.width = p * 100 + '%';
});

window.addEventListener('mouseup', function (e) {
    if (!mouseDown) return;

    mouseDown = false;

    let p = getP(e)

    fillBar.style.width = p * 100 + '%';

    song.currentTime = p * song.duration;
})