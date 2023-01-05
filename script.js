const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

const audio = document.querySelector("audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
const currTime = document.querySelector("#currTime");
const durrTime = document.querySelector("#durrTime");

// Song Titles
const songs = ["hey", "summer", "ukulele", "paradise"];

// Keep track of song
let songIndex = 3;

// Initially Load Songs into DOM
loadSongs(songs[songIndex]);

// Update Song Details to Player
function loadSongs(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play Song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// Pause Song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

// Previous Song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSongs(songs[songIndex]);

  playSong();
}

// Next Song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSongs(songs[songIndex]);

  playSong();
}

// Update Progress Bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set Progress Bar
function setProgress(e) {
  const width = this.clientWidth;
  const ClickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (ClickX / width) * duration;
}

// Event Listener
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change Songs
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// UpdateProgress
audio.addEventListener("timeupdate", updateProgress);

// click on  Progress Bar
progressContainer.addEventListener("click", setProgress);

// Song Ends
audio.addEventListener("ended", nextSong);
