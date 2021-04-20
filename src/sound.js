const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const lostSound = new Audio('./sound/alert.wav');

export function playBg() {
    playSound(bgSound);
}

export function playBug() {
    playSound(bugSound);
}

export function playCarrot() {
    playSound(carrotSound);
}

export function playWin() {
    playSound(winSound);
}

export function playLost() {
    playSound(lostSound);
}

export function pauseBg() {
    pauseSound(bgSound);
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function pauseSound(sound){
    sound.pause();
}