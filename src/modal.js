
export default class Modal {
    constructor() {
        this.modal = document.querySelector('.modal');
        this.modalText = document.querySelector('.modal__text');
        this.modalRefreshBtn = document.querySelector('.modal__refresh__button');
        this.modalRefreshBtn.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
        });
    }

    setOnClick(onClick) {
        this.onClick = onClick;
    }

    showText(text) {
        this.modal.classList.remove('hide__modal');
        this.modalText.innerText = text;
    }

    hide() {
        this.modal.classList.add('hide__modal');
    }
}