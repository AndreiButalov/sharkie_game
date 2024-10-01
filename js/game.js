let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    // startGames();

    let startView = document.getElementById('start_view');
    startView.innerHTML = '';
    startView.innerHTML = startViewGenerate();

    // let controls_panel = document.getElementById('controls_panel');
    // controls_panel.innerHTML = '';
    // controls_panel.innerHTML = controlsPanelGenerate();

    let buttonTryAgain = document.getElementById('you_win');
    buttonTryAgain.innerHTML = '';
    buttonTryAgain.innerHTML = tryAgainGenerate();  

    let gameOver = document.getElementById('game_over');
    gameOver.innerHTML = '';
    gameOver.innerHTML = gameOverGenerate();

    let mobile_panel = document.getElementById('mobile_panel');
    mobile_panel.innerHTML = '';
    mobile_panel.innerHTML = /*html*/`
    <div class="all_controls_button">
        <div class="nav_bar_button">
                <button class="buttons" onclick="sayHallo()"></button>
                <button class="buttons" onclick="sayHallo()"></button>
                <button class="buttons" onclick="sayHallo()"></button>                
        </div>
        <div class="mobile_panel">
            <div class="controls_button_mobile">
                <div class="up_button_mobilie">
                    <button>&#8679;</button>
                </div>
                <div class="left_right_button_mobile">
                    <button>&#8678;</button>
                    <button>&#8681;</button>
                    <button>&#8680;</button>
                </div>
            </div>
            <div class="trow_button_mobile">
                <button>T</button>
            </div>
        </div>
    </div>
    `;
    
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
}


function checkIsGameOver() {
    const gameOverCheck = setInterval(() => {
        if(world.isGameOver) {
            clearInterval(gameOverCheck);
            setTimeout (()=> {
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