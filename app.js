// dom elements
var elements = {
    video: document.getElementById('video'),
    playBtns: document.querySelectorAll('#video, #play'),
    stopVideo: document.getElementById('stop'),
    progress: document.getElementById('progress'),
    timestamp: document.getElementById('timestamp')
};
var passedSeconds = 0;
var timestamp = new Date(0);
// Functions
var playVideo = function () {
    var _a;
    elements.video.play();
    (_a = document.querySelector('i')) === null || _a === void 0 ? void 0 : _a.classList.replace('fa-play', 'fa-pause');
};
var pauseVideo = function () {
    var _a;
    elements.video.pause();
    (_a = document.querySelector('i')) === null || _a === void 0 ? void 0 : _a.classList.replace('fa-pause', 'fa-play');
};
var togglePlayback = function () {
    if (elements.video.paused)
        playVideo();
    else
        pauseVideo();
};
var stopPlayback = function () {
    passedSeconds = 0;
    timestamp = new Date(0);
    elements.video.currentTime = 0;
    pauseVideo();
};
var changeCurrentTime = function () {
    elements.video.currentTime =
        (+elements.progress.value * elements.video.duration) / 100;
    passedSeconds = (+elements.progress.value * elements.video.duration) / 100;
    timestamp.setSeconds(passedSeconds);
    displayTime();
};
var advanceTime = function () {
    if (elements.video.currentTime <= passedSeconds)
        return;
    passedSeconds++;
    timestamp.setSeconds(passedSeconds);
};
var displayTime = function () {
    elements.timestamp.textContent = timestamp.toISOString().substr(11, 8);
};
var progressVideo = function () {
    elements.progress.value = "" + (elements.video.currentTime / elements.video.duration) * 100;
    advanceTime();
    displayTime();
};
// Event listeners
// play pause & stop
elements.playBtns.forEach(function (btn) { return btn.addEventListener('click', togglePlayback); });
elements.stopVideo.addEventListener('click', stopPlayback);
elements.video.addEventListener('ended', stopPlayback);
// slider and time
elements.progress.addEventListener('input', changeCurrentTime);
elements.video.addEventListener('timeupdate', progressVideo);
