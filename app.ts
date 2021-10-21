// dom elements
const elements = {
  video: document.getElementById('video') as HTMLVideoElement,
  playBtns: document.querySelectorAll('#video, #play'),
  stopVideo: document.getElementById('stop') as HTMLButtonElement,
  progress: document.getElementById('progress') as HTMLInputElement,
  timestamp: document.getElementById('timestamp') as HTMLSpanElement,
};

let passedSeconds: number = 0;
let timestamp: Date = new Date(0);

// Functions
const playVideo = () => {
  elements.video.play();
  document.querySelector('i')?.classList.replace('fa-play', 'fa-pause');
};

const pauseVideo = () => {
  elements.video.pause();
  document.querySelector('i')?.classList.replace('fa-pause', 'fa-play');
};

const togglePlayback = () => {
  if (elements.video.paused) playVideo();
  else pauseVideo();
};

const stopPlayback = () => {
  passedSeconds = 0;
  timestamp = new Date(0);
  elements.video.currentTime = 0;

  pauseVideo();
};

const changeCurrentTime = () => {
  elements.video.currentTime =
    (+elements.progress.value * elements.video.duration) / 100;

  passedSeconds = (+elements.progress.value * elements.video.duration) / 100;
  timestamp.setSeconds(passedSeconds);

  displayTime();
};

const advanceTime = () => {
  if (elements.video.currentTime <= passedSeconds) return;

  passedSeconds++;
  timestamp.setSeconds(passedSeconds);
};

const displayTime = () => {
  elements.timestamp.textContent = timestamp.toISOString().substr(11, 8);
};

const progressVideo = () => {
  elements.progress.value = `${
    (elements.video.currentTime / elements.video.duration) * 100
  }`;

  advanceTime();

  displayTime();
};

// Event listeners
// play pause & stop
elements.playBtns.forEach(btn => btn.addEventListener('click', togglePlayback));
elements.stopVideo.addEventListener('click', stopPlayback);
elements.video.addEventListener('ended', stopPlayback);

// slider and time
elements.progress.addEventListener('input', changeCurrentTime);
elements.video.addEventListener('timeupdate', progressVideo);
