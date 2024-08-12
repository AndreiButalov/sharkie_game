let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    let startView = document.getElementById('start_view');

    startView.innerHTML = '';
    startView.innerHTML = /*html*/`
        <div class="content">
            <h1>SHARKIE</h1>        
            <div class="start">
                <button class="start_button" onclick="startGames()">START</button>
            </div>
            <div class="controls">
                <img class="sharkie_image" src="img/1.Sharkie/1.IDLE/1.png">

                <div class="controls_menu">
                    <div class="control_menu_left">
                        <img class="button_arrows" src="img/6.Botones/Key/arrow keys.png" alt="">
                        <span>MOVE SHARK</span>
                    </div>
                    <div class="control_menu_left">
                        <img class="button_space" src="img/6.Botones/Key/Space Bar key.png" alt="">
                        <span>ATTACK</span>
                    </div>
                </div>

            </div>
        </div>
    `;


    let controls_panel = document.getElementById('controls_panel');

    controls_panel.innerHTML = '';
    controls_panel.innerHTML = /*html*/`
        <div class="controls_panel_content">            
            <div class="button_group">
                <button class="buttons" onclick="sayHallo()"></button>
                <button class="buttons" onclick="sayHallo()"></button>
                <button class="buttons" onclick="sayHallo()"></button>                
            </div>
        </div>
    `;

}

function sayHallo() {
    console.log('hallo');
    
}



function startGames() {
    let startView = document.getElementById('start_view');
    startView.style.display = 'none';
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