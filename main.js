let songIndex = 0;
let audio = new Audio();
let playButtons = document.getElementsByClassName('material-symbols-outlined');
let progress = document.getElementById('range');
let backwardButton = document.getElementById('backward');
let playPauseButton = document.getElementById('playPause');
let forwardButton = document.getElementById('forward');
let randomButton = document.getElementById('random');
let storedTime = 0;

let songs = [
  { songName: "Baby You", filePath: "baby_you.mp3" },
  { songName: "Perfect", filePath: "perfect.mp3" },
  { songName: "Good Parts", filePath: "good-parts.mp3" },
  { songName: "Love My Way", filePath: "love_my_way.mp3" },
  { songName: "Bom", filePath: "path_to_bom.mp3" },
  { songName: "Good Parts (speed up)", filePath: "good_parts_speed_up.mp3" },
  { songName: "Stay With Me", filePath: "stay_with_me.mp3" },
  { songName: "Pretty's On The Inside (nightcore)", filePath: "pretty's_on_the_inside.mp3" },
  { songName: "Love Story", filePath: "love_story.mp3" },
];

function playSong(index) {
  audio.src = songs[index].filePath;
  audio.currentTime = storedTime;
  displaySongName(songs[index].songName);
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

randomButton.addEventListener('click', () => {
  const previousIcon = songIndex;
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * songs.length);
  } while (randomIndex === songIndex);
  pauseSong();
  changeButtonIcon(songIndex, 'play_circle');
  changeButtonIconBottom('play_circle');
  songIndex = randomIndex;
  storedTime=0;
  displaySongName(songs[songIndex].songName);
  playSong(songIndex);
  changeButtonIcon(songIndex, 'pause_circle');
  changeButtonIconBottom('pause_circle');
});

function displaySongName(name) {
  document.getElementById('songName').innerHTML = name;
  console.log(name);
}

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
