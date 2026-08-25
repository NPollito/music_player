const audioPlayer = document.getElementById('audio-player');
const songTitle = document.getElementById('title');
const artistName = document.getElementById('artist');
const progressBar = document.getElementById('progress');
const currentTim = document.getElementById('time');
const durationSong = document.getElementById('duration');

const playBtn = document.getElementById('play');

let playlist = [{
  url: "music/Zafiro Rap - Siempre Unidos.mp3",
  name: "Zafiro Rap",
  title: "Siempre Unidos",
}];

let indexSong = 0;

function loadSong(index) {
  songTitle.textContent = index.title;
  artistName.textContent = index.name;
  audioPlayer.src = index.url;
}

loadSong(playlist[indexSong])

function tooglePlay() {

  if(audioPlayer.paused) {
    audioPlayer.play()
    playBtn.textContent = 'll'
    return
  }

  playBtn.textContent = '▶'
  audioPlayer.pause()
}

function updateProgress() {

  const { duration, currentTime } = audioPlayer;
  if (isNaN(duration)) return;

  progressBar.max = duration;

  if(!audioPlayer.paused) {
    progressBar.value = currentTime
  } else {
    progressBar.value = currentTime
  }

  currentTim.textContent = formatTime(currentTime);
  durationSong.textContent = formatTime(duration);
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function setProgressBar() {
  audioPlayer.currentTime = progressBar.value
}

playBtn.addEventListener('click', tooglePlay)
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('loadedmetadata', updateProgress);
progressBar.addEventListener('input', setProgressBar)
audioPlayer.addEventListener('ended', () => {
  playBtn.textContent = '▶'
  progressBar.value = 0;
  currentTim.textContent = "0:00";
})