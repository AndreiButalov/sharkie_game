let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    startGames();
    // let startView = document.getElementById('start_view');
    // startView.innerHTML = '';
    // startView.innerHTML = startViewGenerate();

    let buttonTryAgain = document.getElementById('you_win');
    buttonTryAgain.innerHTML = '';
    buttonTryAgain.innerHTML = tryAgainGenerate();

    let gameOver = document.getElementById('game_over');
    gameOver.innerHTML = '';
    gameOver.innerHTML = gameOverGenerate();

    let mobile_panel = document.getElementById('mobile_panel');
    mobile_panel.innerHTML = '';
    mobile_panel.innerHTML = controlButtonsGenerate();

    // document.getElementById('btn_pause').addEventListener('click', function() {
    //     world.isGamePause = !world.isGamePause;    
    //     this.textContent = world.isGamePause ? false : true;
    //     if (world.isGamePause) {
    //         console.log(world.isGamePause);
    //     } else {
    //         console.log(world.isGamePause);
    //     }
    // });
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
    document.getElementById('start_view').style.display = 'none';
    // document.getElementById('nav_bar_button').style.visibility = 'initial';
    const canvas = document.getElementById('canvas');
    scaleCanvas(canvas);
    world = new World(canvas, keyboard);
    // checkIsWin();
    // checkIsGameOver();
    // touchControlButtons();
}


function touchControlButtons() {
    const buttons = ['btn_up', 'btn_left', 'btn_down', 'btn_right', 'btn_fire'];
    buttons.forEach(buttonId => {
        const button = document.getElementById(buttonId);

        button.addEventListener('touchstart', (e) => {
            if (e.cancelable) {
                e.preventDefault();
            }
            controlButtonTrue(buttonId);
        });

        button.addEventListener('touchend', (e) => {
            if (e.cancelable) {
                e.preventDefault();
            }
            controlButtonsFalse(buttonId);
        });
    });
}


function controlButtonTrue(buttonId) {
    switch (buttonId) {
        case 'btn_up':
            return keyboard.UP = true;
        case 'btn_left':
            return keyboard.LEFT = true;
        case 'btn_down':
            return keyboard.DOWN = true;
        case 'btn_right':
            return keyboard.RIGHT = true;
        case 'btn_fire':
            return keyboard.SPACE = true;
    }
}


function controlButtonsFalse(buttonId) {
    switch (buttonId) {
        case 'btn_up':
            return keyboard.UP = false;
        case 'btn_left':
            return keyboard.LEFT = false;
        case 'btn_down':
            return keyboard.DOWN = false;
        case 'btn_right':
            return keyboard.RIGHT = false;
        case 'btn_fire':
            return keyboard.SPACE = false;
    }
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