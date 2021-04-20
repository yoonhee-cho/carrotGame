import {GameBuilder, Reason} from './game.js';
import Modal from './modal.js';
import * as sound from './sound.js'


const gameFinishBanner = new Modal();
const game = new GameBuilder()
    .setDuration(5)
    .setCarrotCount(3)
    .setBugCount(3)
    .build();

 game.setStopGame(stopGame);

 function stopGame(reason) {
    let message
    switch (reason) {
        case Reason.replay:
            message = 'REPLAY❓❓'
            sound.playLost();
            break;
        case  Reason.win:
            message = 'YOU WON 🎉'
            sound.playWin();
            break;
        case  Reason.lost:
            message = 'YOU LOST 😭'
            sound.playLost();
            break;
        default :
            throw new Error('not a valid reason');
    }
    gameFinishBanner.showText(message);
 }

 gameFinishBanner.setOnClick(() => {
     game.start()
 });
// gameFinishBanner.setOnclick(game.start());
// 이거는 왜 DOM에 오류가 생기지? 
// 왜 바인딩은 에로우 펑션을 이용해면 this가 전달되는거지? -> 자동으로 바인딩이 됨 
//(e)=>{game.start(e)} // game.start
// game.start안에 this.에 접근하기 때문에 바인딩을 수동적으로 해주거나 arrow function을 써야 해요 


//innerHTML innerText의 차이점




