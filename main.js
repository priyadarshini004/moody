let songIndex = 0;
let audio = new Audio();
let playButtons = document.getElementsByClassName('material-symbols-outlined');
let progress = document.getElementById('range');
let backwardButton = document.getElementById('backward');
let playPauseButton = document.getElementById('playPause');
let forwardButton = document.getElementById('forward');
let storedTime = 0;

let songs = [
  { songName: "Baby You", filePath: "baby you.mp3" },
  { songName: "Perfect", filePath: "Perfect.mp3" },
  { songName: "Good Parts", filePath: "good-parts.mp3" },
  { songName: "Love My Way", filePath: "Love my way.mp3" },
  { songName: "Bom", filePath: "bom.mp3" },
  { songName: "Good Parts (speed up)", filePath: "good parts speed up.mp3" },
  { songName: "Stay With Me", filePath: "stay with me.mp3" },
  { songName: "Pretty's On The Inside (nightcore)", filePath: "Pretty's On The Inside.mp3" },
  { songName: "Love Story", filePath: "love story.mp3" },
];

function playSong(index) {
  audio.src = songs[index].filePath;
  audio.currentTime = storedTime;
  audio.play();
  changeButtonIcon(index, 'pause_circle');
  changeButtonIconBottom('pause_circle');
}

function pauseSong() {
  audio.pause();
  storedTime = audio.currentTime;
  changeButtonIcon(songIndex, 'play_circle');
  changeButtonIconBottom('play_circle');
}

function changeButtonIcon(index, icon) {
  playButtons[index].textContent = icon;
}

function changeButtonIconBottom(icon) {
  playPauseButton.textContent = icon;
}

function playNextSong() {
  changeButtonIcon(songIndex, 'play_circle');
  changeButtonIconBottom('play_circle');
  songIndex = (songIndex + 1) % songs.length;
  storedTime = 0;
  playSong(songIndex);
}

backwardButton.addEventListener('click', () => {
  changeButtonIcon(songIndex,'play_circle');
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  storedTime = 0;
  playSong(songIndex);
});

forwardButton.addEventListener('click', () => {
  changeButtonIcon(songIndex,'play_circle');
  songIndex = (songIndex + 1) % songs.length;
  storedTime = 0;
  playSong(songIndex);
});

Array.from(playButtons).forEach((button, index) => {
  button.addEventListener('click', () => {
    const previousIcon = songIndex;
    if (audio.paused && songIndex !== index) {
      storedTime=0;
      playSong(index);
      songIndex = index;
      changeButtonIcon(index, 'pause_circle');
      changeButtonIconBottom('pause_circle');
      if(previousIcon !== songIndex){
        changeButtonIcon(previousIcon,'play_circle');
      }
    } 
    else if (!audio.paused && songIndex === index) {
      pauseSong();
      changeButtonIcon(index, 'play_circle');
      changeButtonIconBottom('play_circle');
      
    }
    else {
      playSong(index);
      songIndex = index;
      changeButtonIcon(index, 'pause_circle');
      changeButtonIconBottom('pause_circle');
      if(previousIcon !== songIndex){
        changeButtonIcon(previousIcon,'play_circle');
      }
    }
  });
});

playPauseButton.addEventListener('click', () => {
  if (audio.paused && audio.currentTime === 0) {
    playSong(songIndex);
    changeButtonIconBottom('pause_circle');
    changeButtonIcon(songIndex, 'pause_circle');
  } else if (!audio.paused) {
    pauseSong();
    changeButtonIconBottom('play_circle');
    changeButtonIcon(songIndex, 'play_circle');
  } else {
    audio.play();
    changeButtonIconBottom('pause_circle');
    changeButtonIcon(songIndex, 'pause_circle');
  }
});


audio.addEventListener('timeupdate', () => {
  const value = (audio.currentTime / audio.duration) * 100;
  progress.value = value;
});

progress.addEventListener('change', () => {
  const prog = (progress.value / 100) * audio.duration;
  audio.currentTime = prog;
});

audio.addEventListener('ended', () => {
  playNextSong();
});
