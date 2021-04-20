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





