let canvas;
let world;
let keyboard = new Keyboard();
let isFullScreen = false;


function init() {
    renderUI();
    setupPauseButton();
    soundOffOnButton();
    fullScreen();
}


function renderUI() {
    const elementsToRender = [
        { id: 'start_view', content: startViewGenerate() },
        { id: 'you_win', content: tryAgainGenerate() },
        { id: 'game_over', content: gameOverGenerate() },
        { id: 'mobile_panel', content: controlButtonsGenerate() }
    ];

    elementsToRender.forEach(({ id, content }) => {
        const element = document.getElementById(id);
        element.innerHTML = content;
    });
}


function fullScreen() {
    let bntFullScreen = document.getElementById('btn_fullScreen');
    let fullscreen = document.getElementById('fullscreen');
    bntFullScreen.addEventListener('click', function () {
        isFullScreen = !isFullScreen;
        this.innerHTML = isFullScreen ? 'n' : 'f';
        isFullScreen ? enterFullscreen(fullscreen) : exitFullscreen(fullscreen);
    })

    bntFullScreen.addEventListener('keydown', function (e) {
        e.preventDefault();
    });
}


function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {  
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) { 
        element.webkitRequestFullscreen();
    }
}


function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


function startGames() {
    initialGames();
    document.getElementById('btn_sound').innerHTML = '<img src="img/pngwing.com.png"/> ';
    document.getElementById('start_view').style.display = 'none';
    document.getElementById('nav_bar_button').style.visibility = 'initial';
    const canvas = document.getElementById('canvas');
    scaleCanvas(canvas);
    world = new World(canvas, keyboard);
    checkIsWin();
    checkIsGameOver();
    keyboard.touchControlButtons();
}


function setupPauseButton() {
    const buttonPause = document.getElementById('btn_pause');
    buttonPause.addEventListener('click', function () {
        world.isGamePause = !world.isGamePause;
        this.innerHTML = world.isGamePause ? '<img src="img/Daco_1000848.png"/>' : '<img src="img/Daco_4414172.png"/> ';
        world.isGamePause ? world.sound.stopAllSoundsEndLevel() : soundsPlay();
    });

    buttonPause.addEventListener('keydown', function (e) {
        e.preventDefault();
    });
}


function soundOffOnButton() {
    const buttonSound = document.getElementById('btn_sound');
    buttonSound.addEventListener('click', function () {
        world.isMuted = !world.isMuted;
        this.innerHTML = world.isMuted ? '<img src="img/pngwing.com (off).png"/>' : '<img src="img/pngwing.com.png"/> ';
        if (world.isMuted) {
            world.sound.stopAllSounds();
        } else {
            soundsPlay();
        }

    });

    buttonSound.addEventListener('keydown', function (e) {
        e.preventDefault();
    });
}


function soundsPlay() {
    if (!world.isMuted) {
        world.sound.levelSound.play();
        if (!world.endBoss) {
            world.sound.adventureTheme.play();
        } else {
            world.sound.finalBossSound.play();
        }
    }
    world.isMuted = false;
}


function tryAgain() {
    world.sound.stopAllSounds();
    startGames();
    document.getElementById('you_win').style.display = "none";
    document.getElementById('game_over').style.display = "none";
    world.youWin = false;
    world.isGameOver = false;
}


function checkIsGameOver() {
    const gameOverCheck = setInterval(() => {
        if (world.isGameOver) {
            clearInterval(gameOverCheck);
            setTimeout(() => {
                document.getElementById('game_over').style.display = "block";
            }, 2000);
        }
    }, 200);
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