class Keyboard {

    constructor() {
        this.LEFT = false;
        this.RIGHT = false;
        this.UP = false;
        this.DOWN = false;
        this.SPACE = false;
        window.addEventListener('keydown', (event) => this.onKeyDown(event));
        window.addEventListener('keyup', (event) => this.onKeyUp(event));
        window.addEventListener('touchmove', (e) => { e.preventDefault(); }, { passive: false });
    }


    /**
     * Handles keydown events by setting the corresponding control flags to true
     * based on the pressed key's keyCode.
     * 
     * @param {KeyboardEvent} event - The keydown event triggered by the user.
     */
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


    /**
     * Handles keyup events by setting the corresponding control flags to false
     * based on the released key's keyCode.
     * 
     * @param {KeyboardEvent} event - The keyup event triggered by the user.
     */
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


    /**
     * Sets the corresponding control flag to true based on the button ID
     * passed as an argument.
     * 
     * @param {string} buttonId - The ID of the button that was pressed.
     * @returns {boolean} The updated state of the control flag.
     */
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


    /**
     * Sets the corresponding control flag to false based on the button ID
     * passed as an argument.
     * 
     * @param {string} buttonId - The ID of the button that was released.
     * @returns {boolean} The updated state of the control flag.
     */
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


    /**
     * Initializes touch event listeners for control buttons, allowing for
     * touch interactions. It sets control flags to true on touchstart 
     * and false on touchend.
     */
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