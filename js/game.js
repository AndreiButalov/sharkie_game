let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    let startView = document.getElementById('start_view');
    startView.innerHTML = '';
    startView.innerHTML = startViewGenerate();

    let buttonTryAgain = document.getElementById('you_win');
    buttonTryAgain.innerHTML = '';
    buttonTryAgain.innerHTML = tryAgainGenerate();

    let gameOver = document.getElementById('game_over');
    gameOver.innerHTML = '';
    gameOver.innerHTML = gameOverGenerate();

    let mobile_panel = document.getElementById('mobile_panel');
    mobile_panel.innerHTML = '';
    mobile_panel.innerHTML = controlButtonsGenerate();
}


function tryAgain() {
    startGames();
    document.getElementById('you_win').style.display = "none";
    document.getElementById('game_over').style.display = "none";
    world.youWin = false;
    world.isGameOver = false;
}


function startGames() {
    initialGames();
    let startView = document.getElementById('start_view');
    startView.style.display = 'none';
    const canvas = document.getElementById('canvas');
    scaleCanvas(canvas);
    world = new World(canvas, keyboard);
    checkIsWin();
    checkIsGameOver();
    touchControlButtons();
}


function touchControlButtons() {
    const buttons = ['btn_up', 'btn_left', 'btn_down', 'btn_right', 'btn_fire'];

    buttons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        button.addEventListener('touchstart', (e) => {
            if (e.cancelable) {
                e.preventDefault();
            }
            switch (buttonId) {
                case 'btn_up':
                    keyboard.UP = true;
                    break;
                case 'btn_left':
                    keyboard.LEFT = true;
                    break;
                case 'btn_down':
                    keyboard.DOWN = true;
                    break;
                case 'btn_right':
                    keyboard.RIGHT = true;
                    break;
                case 'btn_fire':
                    keyboard.SPACE = true;
                    break;
            }
        });

        button.addEventListener('touchend', (e) => {
            if (e.cancelable) {
                e.preventDefault();
            }
            switch (buttonId) {
                case 'btn_up':
                    keyboard.UP = false;
                    break;
                case 'btn_left':
                    keyboard.LEFT = false;
                    break;
                case 'btn_down':
                    keyboard.DOWN = false;
                    break;
                case 'btn_right':
                    keyboard.RIGHT = false;
                    break;
                case 'btn_fire':
                    keyboard.SPACE = false;
                    break;
            }
        });
    });
}


function checkIsGameOver() {
    const gameOverCheck = setInterval(() => {
        if (world.isGameOver) {
            clearInterval(gameOverCheck);
            setTimeout(() => {
                document.getElementById('game_over').style.display = "block";
            }, 2000)
        }
    }, 200)
}


function checkIsWin() {
    const tryAgainInterval = setInterval(() => {
        if (world.youWin) {
            clearInterval(tryAgainInterval);
            setTimeout(() => {
                document.getElementById('you_win').style.display = "block";
            }, 2000)
        }
    }, 200);
}


function scaleCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = 720;
    const height = 480;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
}


window.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });


window.addEventListener('keydown', (event) => {
    if (event.keyCode == 32) {
        keyboard.SPACE = true
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true
    }

    if (event.keyCode == 38) {
        keyboard.UP = true
    }

    if (event.keyCode == 39) {
        keyboard.RIGHT = true
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true
    }
})

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 32) {
        keyboard.SPACE = false
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false
    }

    if (event.keyCode == 38) {
        keyboard.UP = false
    }

    if (event.keyCode == 39) {
        keyboard.RIGHT = false
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false
    }
})