const audioPlayer = document.getElementById('audio-player');
const songTitle = document.getElementById('title');
const artistName = document.getElementById('artist');
const progressBar = document.getElementById('progress');
const currentTim = document.getElementById('time');
const durationSong = document.getElementById('duration');
const portadaSong = document.getElementById('portada')

const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next')
const prvBtn = document.getElementById('prev')

let playlist = [
  {
    url: "../assets/music/Danny Ocean - Me Rehúso.mp3",
    name: "Danny Ocean",
    title: "Me Rehúso",
    img: "../assets/images/album/danny_ocean.webp",
  },
  {
    url: "../assets/music/Dragon & Caballero - Fruta Prohibida.mp3",
    name: "Dragon & Caballero",
    title: "Fruta Prohibida",
    img: "../assets/images/album/dragon_y_caballero.webp",
  },
  {
    url: "../assets/music/Feid - LUNA.mp3",
    name: "Feid",
    title: "Luna",
    img: "../assets/images/album/feid.webp",
  },
  {
    url: "../assets/music/Joey Montana - Sin Ti.mp3",
    name: "Joey Montana",
    title: "Sin Ti",
    img: "../assets/images/album/joey_montana.webp",
  },
  {
    url: "../assets/music/Kevin El Autorizado - El Villano.mp3",
    name: "Kevin El Autorizado",
    title: "El Villano",
    img: "../assets/images/album/kevin_el_autorizado.webp",
  },
  {
    url: "../assets/music/La Secta - La Locura Automática (Reggaeton).mp3",
    name: "La Secta",
    title: "La Locura Automática",
    img: "../assets/images/album/la_secta.webp",
  },
  {
    url: "../assets/music/Marc Segui - Tiroteo (Remix).mp3",
    name: "Marc Segui",
    title: "Tiroteo (Remix)",
    img: "../assets/images/album/marc_segui.webp",
  },
  {
    url: "../assets/music/Rkm & Ken-y - Llorarás.mp3",
    name: "Rkm & Ken-y",
    title: "Llorarás",
    img: "../assets/images/album/rakim_y_ken.webp",
  },
  {
    url: "../assets/music/She - A 700 Km (Con Elena).mp3",
    name: "She",
    title: "A 700 Km",
    img: "../assets/images/album/she_y_elena.webp",
  },
  {
    url: "../assets/music/Zafiro Rap - Siempre Unidos.mp3",
    name: "Zafiro Rap",
    title: "Siempre Unidos",
    img: "../assets/images/album/zafiro_rap.webp",
  },
];

let indexSong = 0;

function loadSong(index) {
  songTitle.textContent = index.title;
  artistName.textContent = index.name;
  audioPlayer.src = index.url;
  portadaSong.src = index.img;
}

loadSong(playlist[indexSong])

function tooglePlay() {

  if (audioPlayer.paused) {
    audioPlayer.play()
    activateAnimation(false)
    changeButtton(playBtn, false)
    return
  }

  audioPlayer.pause()
  changeButtton(playBtn, true)
  activateAnimation(true)
}

function changeButtton(container, isPlay) {
  if(!isPlay) {
    container.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
    </svg>
    `
    container.style.backgroundColor = '#91001e'
    return 
  }

  container.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-play-fill"
    viewBox="0 0 16 16">
    <path
      d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
  </svg>
  `
  container.style.backgroundColor = '#222'
}

function updateProgress() {

  const { duration, currentTime } = audioPlayer;
  if (isNaN(duration)) return;

  progressBar.max = duration;

  if (!audioPlayer.paused) {
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

function nextSong() {
  if(playlist.length === 0) return

  indexSong = (indexSong + 1) % playlist.length
  loadSong(playlist[indexSong])

  if(audioPlayer.paused) {
    audioPlayer.play()
    changeButtton(playBtn, false)
    activateAnimation(false)
  }
}

function prevSong() {
  if(playlist.length === 0) return

  indexSong = (indexSong - 1 + playlist.length) % playlist.length
  loadSong(playlist[indexSong])

  if(audioPlayer.paused) {
    audioPlayer.play()
    changeButtton(playBtn, false)
    activateAnimation(false)
  }
}

function activateAnimation(isPlay) {

  const container = document.querySelector('.music-container')


  if(!isPlay) {
    container.style.animation = "animate 4s linear infinite"
    container.classList.add('add-animation')
    return
  }
  
  container.style.animation = "none"
  container.classList.remove('add-animation')

  // if(isPlay) {
  //   document.getElementById('animation').remove()
  //   return
  // }

  // const style = document.createElement('style')
  // style.id = 'animation'

  // const keyFrame = `
  //   @keyframes animate {
  //     0% {
  //       --efect: 0deg
  //     }
  //     100% {
  //       --efect: 360deg
  //     }
  //   }
  // `
  // style.textContent = keyFrame
  // document.head.appendChild(style)
}

playBtn.addEventListener('click', tooglePlay);
nextBtn.addEventListener('click', nextSong);
prvBtn.addEventListener('click', prevSong);
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('loadedmetadata', updateProgress);
progressBar.addEventListener('input', setProgressBar)
audioPlayer.addEventListener('ended', () => {
  changeButtton(playBtn, true)
  progressBar.value = 0;
  currentTim.textContent = "0:00";
  activateAnimation(true)
})