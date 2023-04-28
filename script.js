"use strict";

const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");

const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");

const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song titles (same as audio and img files)
const songs = ["hey", "summer", "ukulele"];

// Keep track of song (position in the array)
let songIndex = 2;

////////////////////////////////////////
// FUNCTIONS

// Update song details
const loadSong = function (song) {
  // change the title
  title.innerText = song;
  // change the audio src dinamically
  audio.src = `music/${song}.mp3`;
  // change the image src dinamically
  cover.src = `images/${song}.jpg`;
};

// Control audio Play/Pause
const controlPlayer = function () {
  // check if player is running
  const isPlaying = musicContainer.classList.contains("play");

  isPlaying ? pauseSong() : playSong();
};

// Play song
const playSong = function () {
  // add .play class to music container
  musicContainer.classList.add("play");
  // change btn icon from play to pause
  playBtn.innerHTML = `
  <i class="fas fa-pause"></i>
  `;
  // switch on the player
  audio.play();
};

// Pause song
const pauseSong = function () {
  // remove .play class to music container
  musicContainer.classList.remove("play");
  // change btn icon from pause to play
  playBtn.innerHTML = `
  <i class="fas fa-play"></i>
  `;
  // pause the player
  audio.pause();
};

// Prev song
const prevSong = function () {
  // decrease the index of 1
  songIndex--;
  // go to last song if current index is below zero
  if (songIndex < 0) songIndex = songs.length - 1;

  // load song
  loadSong(songs[songIndex]);

  // play song
  playSong();
};

// Next song
const nextSong = function () {
  // increase the index of 1
  songIndex++;
  // go to first song if current index is above the last position
  if (songIndex > songs.length - 1) songIndex = 0;

  // load song
  loadSong(songs[songIndex]);

  // play song
  playSong();
};

// Update progress bar
const updateProgress = function (e) {
  // get duration and current time from event object
  const { duration, currentTime } = e.srcElement;
  // get the progress percentage
  const progressPercent = (currentTime / duration) * 100;
  // add the percentage to the width of the progress element
  progress.style.width = `${progressPercent}%`;
};

// Set progress bar
const setProgress = function (e) {
  // get the total bar width in px
  const width = this.clientWidth;
  // get the bar width amount in the clicked point (in px)
  const clickX = e.offsetX;
  // set the duration via audio API
  const duration = audio.duration;

  // get the current time via audio API
  // Eg. 50w : 100w = Xs = 60s
  audio.currentTime = (clickX / width) * duration;
};

////////////////////////////////////////
// EVENT LISTENERS

playBtn.addEventListener("click", controlPlayer);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);

////////////////////////////////////////
// INIT

// Initially load song details into DOM
loadSong(songs[songIndex]);
