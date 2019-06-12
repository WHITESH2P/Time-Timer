const spinner = document.querySelector('.spinner');
const filler = document.querySelector('.filler');
const mask = document.querySelector('.mask');
const hand = document.querySelector('.hand');
const hand_bg = document.querySelector('.hand-bg');
const audio = document.getElementById("audio");

var angleDeg = 0;
var curDeg = null;
var time_flag = false;

function getAngleDeg() {
  const center = document.getElementById('center').getBoundingClientRect();
  const _y = (center.top + center.bottom)/2;
  const _x = (center.right + center.left)/2;

  angleDeg = Math.atan2((_y - mouse_y), (_x - mouse_x)) * 180 / Math.PI;
  if (angleDeg < 90) {
    angleDeg = 90 - angleDeg;
  } else if (angleDeg > 90) {
    angleDeg = 450 - angleDeg;
  }
}

var setTime = document.getElementById("setTime");

setTime.addEventListener("click", function (e) {
  mouse_x = e.clientX;
  mouse_y = e.clientY;
  
  if (time_flag === false) {
    getAngleDeg();
  }
}, false);

setTime.addEventListener('touchstart', function(e) {
  mouse_x = e.touches[0].clientX;
  mouse_y = e.touches[0].clientY;
  
  if (time_flag === false) {
    getAngleDeg();
  }
}, false);


function setDate() {
  const now = new Date();
  const seconds = now.getSeconds();
  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6);
  let angleDeg_ = -180 - angleDeg;

  if (time_flag === true) {
    angleDeg_ += minsDegrees - curDeg;
    if (angleDeg_ > -180) {
      angleDeg_ = -180;
      angleDeg = 0;
      time_flag = false;
      if (alarm.value == "on") {
        audio.play();
      }
      StateInit();
    }
  }

  if (angleDeg_ < -360) {
    filler.style.opacity = 100;
    mask.style.opacity = 0;
    spinner.style.opacity = 100;
  } else {
    filler.style.opacity = 0;
    mask.style.opacity = 100;
    spinner.style.opacity = 100;
  }

  spinner.style.transform = `rotate(${angleDeg_}deg)`;
  handDeg = angleDeg_ + 180;
  hand.style.transform = `rotate(${handDeg}deg)`;
  hand_bg.style.transform = `rotate(${handDeg}deg)`;
}

setInterval(setDate, 50);
setDate();

var pauseTime = document.getElementById("pause");
pauseTime.addEventListener("click", function (e) {
  if (time_flag === true) {
    pauseTime.innerHTML = 'Resume';
    resetTime.style.display = 'inline-block';
    StatePaused();
  } else {
    pauseTime.innerHTML = 'Paused';
    resetTime.style.display = 'none';
    StateCount();
  }
}, false);

var startTime = document.getElementById("start");
startTime.addEventListener("click", function (e) {
  if (time_flag == false){
    startTime.style.display = 'none';
    pauseTime.style.display = 'inline-block';
    StateCount();
  }
}, false);

var resetTime = document.getElementById("reset");
resetTime.addEventListener("click", function (e) {
  StateInit();
}, false);

var alarm = document.getElementById("alarm");
alarm.addEventListener("click", function (e) {
  if (alarm.value == "on") {
    alarm.value = "off";
    alarm.innerHTML = '🔇';
  } else {
    alarm.value = "on";
    alarm.innerHTML = '🎵';
  }
}, false);


function StateInit() {
  startTime.style.display = 'inline-block';
  resetTime.style.display = 'none';
  pauseTime.style.display = 'none';
  pauseTime.innerHTML = 'Paused';

  angleDeg = 0;
  time_flag = false;
}

function StateCount() {
  const now = new Date();
  const seconds = now.getSeconds();
  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6);

  curDeg = minsDegrees;
  time_flag = true;
}

function StatePaused() {
  const now = new Date();
  const seconds = now.getSeconds();
  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6);
  angleDeg = angleDeg - minsDegrees + curDeg;
  time_flag = false;
}