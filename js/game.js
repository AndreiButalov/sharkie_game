let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    let startView = document.getElementById('start_view');

    startView.innerHTML = '';
    startView.innerHTML = /*html*/`
        <div class="controls">
            <img class="button" src="img/6.Botones/Start/3.png">
            <div>
                <div>
                    <img class="button" src="img/6.Botones/Key/arrow keys.png" alt="">
                    <span>MOBE SHARK</span>
                </div>
                <div>
                    <img class="button" src="img/6.Botones/Key/Space Bar key.png" alt="">
                    <span>ATTACK</span>
                </div>
            </div>
        </div>
    `;

}

function startGames() {
    const canvas = document.getElementById('canvas');
    scaleCanvas(canvas);
    world = new World(canvas, keyboard);
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