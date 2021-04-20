import { Field, ItemType} from './field.js';
import * as sound from './sound.js'

export class GameBuilder {
    setDuration(duration){
        this.gameDuration = duration;
        return this;
    }

    setCarrotCount(carrotCount){
        this.carrotCount = carrotCount;
        return this;
    }

    setBugCount(bugCount) {
        this.bugCount = bugCount;
        return this;
    }

    build(){
        return new Game(this.gameDuration, this.carrotCount, this.bugCount);
    }

}

export const Reason = Object.freeze({
    win: 'win',
    lost: 'lost',
    replay: 'replay'
});

class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.started = false;
        this.timer = undefined;
        this.score = 0;

        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.playBtn = document.querySelector('.game__button');
        this.playBtn.addEventListener('click', () => {
            if(this.started){ 
                this.pause(Reason.replay);
            }
            else{
                this.start();
            }
        })

        this.gameField = new Field(this.carrotCount, this.bugCount);
        this.gameField.setEventListener(this.onItemClick);
    }

    setStopGame(stopGame) {
        this.stopGame = stopGame;
    }

    onItemClick = (item) => {
        if(!this.started) {
            return;
        }
        
        if(item === ItemType.carrot) {
            this.score++;
            this.updateScore();
            if(this.score === this.carrotCount) {
                this.pause(Reason.win);
            }
        }
        else if(item === ItemType.bug) {
            this.pause(Reason.lost);
        }
    }

    start() {
        this.started = true;
        this.initGame();
        this.showPauseIcon();
        this.showTimerAndScore();
        this.startTimer();
        sound.playBg();
    }
    
    pause(reason) {
        this.started = false;
        this.pauseTimer();
        this.hideGameButton();
        sound.pauseBg();
        this.stopGame && this.stopGame(reason)
    }

    initGame() {
        this.gameScore.innerHTML = this.carrotCount;
        this.score = 0;
        this.gameField.init();
    }

    updateScore() {
        this.gameScore.innerHTML = this.carrotCount - this.score;
    }
    
    startTimer() {
        let remainingSecs = this.gameDuration;
        this.displayTime(remainingSecs);
    
        this.timer = setInterval(() => {
            if(remainingSecs <= 0) {
                clearInterval(this.timer);
                this.pause(this.score===this.carrotCount ? Reason.win : Reason.lost);
                return;
            }
            this.displayTime(--remainingSecs);
        }, 1000)
    }
    
    pauseTimer(){
        clearInterval(this.timer);
    }
    
    displayTime(secs) {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        this.gameTimer.innerText = `${minutes}:${seconds}`
    }
    
    showTimerAndScore() {
        this.gameTimer.style.visibility = "visible";
        this.gameScore.style.visibility = "visible";
    }
    
    showPauseIcon() {
        const icon = this.playBtn.querySelector('.fas');
        icon.classList.add('fa-pause');
        icon.classList.remove('fa-play');
        this.playBtn.style.visibility = 'visible';
    }
    
    hideGameButton() {
        this.playBtn.style.visibility = "hidden";
    }
}