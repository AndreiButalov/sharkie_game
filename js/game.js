let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    // startGames();

    let startView = document.getElementById('start_view');
    startView.innerHTML = '';
    startView.innerHTML = startViewGenerate();

    let controls_panel = document.getElementById('controls_panel');
    controls_panel.innerHTML = '';
    controls_panel.innerHTML = controlsPanelGenerate();

    let buttonTryAgain = document.getElementById('button_try_again');
    buttonTryAgain.innerHTML = '';
    buttonTryAgain.innerHTML = tryAgainGenerate();    
    
}


function tryAgain() {
    startGames();
    document.getElementById('try_again').style.display = "none";
    world.youWin = false;
}


function startGames() {
    initialGames();
    let startView = document.getElementById('start_view');
    startView.style.display = 'none';
    const canvas = document.getElementById('canvas');
    scaleCanvas(canvas);
    world = new World(canvas, keyboard);
    checkIsWin();   
}


function checkIsWin() {
    const tryAgainInterval = setInterval(() => {        
        if (world.youWin) {
            clearInterval(tryAgainInterval);
            setTimeout(() => {
                document.getElementById('try_again').style.display = "block";
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