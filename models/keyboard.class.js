class Keyboard {

    constructor() {
        this.LEFT = false;
        this.RIGHT = false;
        this.UP = false;
        this.DOWN = false;
        this.SPACE = false;
        window.addEventListener('keydown', (event) => this.onKeyDown(event));
        window.addEventListener('keyup', (event) => this.onKeyUp(event));
        window.addEventListener('touchmove', (e) => {e.preventDefault();}, { passive: false });
    }


    onKeyDown(event) {
        switch (event.keyCode) {
            case 32:
                this.SPACE = true;
                break;
            case 37:
                this.LEFT = true;
                break;
            case 38:
                this.UP = true;
                break;
            case 39:
                this.RIGHT = true;
                break;
            case 40:
                this.DOWN = true;
                break;
        }
    }


    onKeyUp(event) {
        switch (event.keyCode) {
            case 32:
                this.SPACE = false;
                break;
            case 37:
                this.LEFT = false;
                break;
            case 38:
                this.UP = false;
                break;
            case 39:
                this.RIGHT = false;
                break;
            case 40:
                this.DOWN = false;
                break;
        }
    }
    

    controlButtonTrue(buttonId) {
        switch (buttonId) {
            case 'btn_up':
                return this.UP = true;
            case 'btn_left':
                return this.LEFT = true;
            case 'btn_down':
                return this.DOWN = true;
            case 'btn_right':
                return this.RIGHT = true;
            case 'btn_fire':
                return this.SPACE = true;
        }
    }


    controlButtonsFalse(buttonId) {
        switch (buttonId) {
            case 'btn_up':
                return this.UP = false;
            case 'btn_left':
                return this.LEFT = false;
            case 'btn_down':
                return this.DOWN = false;
            case 'btn_right':
                return this.RIGHT = false;
            case 'btn_fire':
                return this.SPACE = false;
        }
    }


    touchControlButtons() {
        const buttons = ['btn_up', 'btn_left', 'btn_down', 'btn_right', 'btn_fire'];
        buttons.forEach(buttonId => {
            const button = document.getElementById(buttonId);

            button.addEventListener('touchstart', (e) => {
                if (e.cancelable) {
                    e.preventDefault();
                }
                this.controlButtonTrue(buttonId);
            });

            button.addEventListener('touchend', (e) => {
                if (e.cancelable) {
                    e.preventDefault();
                }
                this.controlButtonsFalse(buttonId);
            });
        });
    }

}