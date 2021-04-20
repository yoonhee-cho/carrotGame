const CARROT_SIZE = 80;

import * as sound from './sound.js'

export const ItemType = Object.freeze({
    carrot: 'carrot',
    carrotClass: '.carrot',
    bug: 'bug',
    bugClass: '.bug',
})

export class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();  
        this.field.addEventListener('click', this.onClick)  
    }

    setEventListener(onItemClick) {
        this.onItemClick= onItemClick;
    }

    onClick = (event) => {
        const target = event.target;
        if(target.matches('.carrot')) {
            target.remove();
            sound.playCarrot();
            this.onItemClick && this.onItemClick(ItemType.carrot);
           
        }
        else if(target.matches('.bug')) {
            sound.playBug();
            this.onItemClick && this.onItemClick(ItemType.bug);
        }
    } 

    init() {
      this.field.innerHTML = '';
      this._addItem('carrot', this.carrotCount, 'img/carrot.png');  
      this._addItem('bug', this.bugCount, 'img/bug.png');  
    }

    _addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width-CARROT_SIZE;
        const y2 = this.fieldRect.height-CARROT_SIZE;
        
        for(let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            item.style.left = `${randomNum(x1, x2)}px`;
            item.style.top = `${randomNum(y1, y2)}px`;
            this.field.appendChild(item);
        }
    }
}

function randomNum(min, max) {
    return Math.random() * (max - min) + min;
}

