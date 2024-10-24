let canvas;
let world;
let keyboard = new Keyboard();
let isFullScreen = false;


/**
 * Initializes the game by rendering the UI, setting up the pause button, sound button, and fullscreen functionality.
 */
function init() {
    renderUI();
    setupPauseButton();
    soundOffOnButton();
    fullScreen();
    checkDevice();
}


/**
 * Renders various UI components by setting the inner HTML of specific elements.
 * Calls different functions to generate content for each element.
 */
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


/**
 * Handles the fullscreen functionality by toggling between full screen and normal screen modes.
 * Adds event listeners to the fullscreen button for click and keydown actions.
 */
function fullScreen() {
    let bntFullScreen = document.getElementById('btn_fullScreen');
    let fullscreen = document.getElementById('fullscreen');

    bntFullScreen.addEventListener('click', function () {
        isFullScreen = !isFullScreen;
        this.innerHTML = isFullScreen ? '<img src="img/normalScreen.png">' : '<img src="img/fullScreen.png">';
        isFullScreen ? enterFullscreen(fullscreen) : exitFullscreen(fullscreen);
    });

    bntFullScreen.addEventListener('keydown', function (e) {
        e.preventDefault();
    });
}


/**
 * Requests to enter fullscreen mode on the provided element.
 * Supports various browser-specific fullscreen methods.
 * 
 * @param {HTMLElement} element - The HTML element to display in fullscreen mode.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {  // For IE11
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) { // For Safari
        element.webkitRequestFullscreen();
    }
}


/**
 * Exits fullscreen mode by calling the appropriate method depending on the browser.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { // For Safari
        document.webkitExitFullscreen();
    }
}


/**
 * Starts the game by initializing game elements, updating the sound button, 
 * hiding the start view, making the navigation bar visible, and setting up the world and controls.
 */
function startGames() {
    initialGames();
    document.getElementById('btn_sound').innerHTML = '<img src="img/pngwing.com.png"/> ';
    document.getElementById('start_view').style.display = 'none';
    document.getElementById('nav_bar_button').style.visibility = 'initial';
    document.getElementById('mobile_panel').style.display = 'block';

    const canvas = document.getElementById('canvas');
    scaleCanvas(canvas);

    world = new World(canvas, keyboard);
    checkIsWin();
    checkIsGameOver();
    keyboard.touchControlButtons();
}


/**
 * Sets up the pause button functionality, allowing the game to pause and resume. 
 * Toggles between pause and play icons and controls game sounds accordingly.
 */
function setupPauseButton() {
    const buttonPause = document.getElementById('btn_pause');

    buttonPause.addEventListener('click', function () {
        world.isGamePause = !world.isGamePause;
        this.innerHTML = world.isGamePause ? '<img src="img/Daco_1000848.png"/>' : '<img src="img/Daco_4414172.png"/> ';

        if (world.isGamePause) {
            world.sound.stopAllSoundsEndLevel();
        } else if (!world.isMuted) {
            soundsPlay();
        }
    });

    buttonPause.addEventListener('keydown', function (e) {
        e.preventDefault();
    });
}


/**
 * Sets up the sound toggle button. Mutes or unmutes the game sounds based on user interaction,
 * switching between sound on and off icons.
 */
function soundOffOnButton() {
    const buttonSound = document.getElementById('btn_sound');

    buttonSound.addEventListener('click', function () {
        world.isMuted = !world.isMuted;
        this.innerHTML = world.isMuted ? '<img src="img/pngwing.com (off).png"/>' : '<img src="img/pngwing.com.png"/> ';
        world.isMuted ? world.sound.stopAllSounds() : soundsPlay();
    });

    buttonSound.addEventListener('keydown', function (e) {
        e.preventDefault();
    });
}


/**
 * Plays the appropriate game sounds based on the game state (level or boss music).
 * Ensures sounds only play if the game is not muted.
 */
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


/**
 * Restarts the game, stops all game sounds, resets the win or game over state, and hides the end-game views.
 */
function tryAgain() {
    world.sound.stopAllSounds();
    startGames();
    document.getElementById('you_win').style.display = "none";
    document.getElementById('game_over').style.display = "none";
    world.youWin = false;
    world.isGameOver = false;
}


/**
 * Checks if the game is over at regular intervals. If the game is over, it displays the game over screen after a short delay.
 */
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


/**
 * Checks if the player has won the game at regular intervals. If the player wins, it displays the win screen after a short delay.
 */
function checkIsWin() {
    const tryAgainInterval = setInterval(() => {
        if (world.youWin) {
            clearInterval(tryAgainInterval);
            setTimeout(() => {
                document.getElementById('you_win').style.display = "block";
            }, 2000);
        }
    }, 200);
}


/**
 * Scales the canvas to fit the device's pixel ratio, ensuring high-quality rendering on various devices.
 * 
 * @param {HTMLCanvasElement} canvas - The canvas element to scale.
 */
function scaleCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = 720;
    const height = 480;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
}


/**
 * Checks the device's screen width and height to determine if the device is suitable
 * for displaying the content. If the screen dimensions indicate a small or unsuitable 
 * device, it hides the canvas and displays a warning message. Otherwise, it shows the canvas.
 *
 * This function targets two main elements in the DOM:
 * 1. `canvas`: The main content element that is displayed or hidden based on the screen size.
 * 2. `deviceWarning`: A warning element that is shown if the device size is not optimal.
 *
 * Display Conditions:
 * - If the screen width is less than 1024 and less than 667, or
 * - If the screen height is greater than 1023 and the width is less than or equal to 1024,
 *   the canvas is hidden and a device warning is displayed.
 * Otherwise, the canvas is shown, and the warning is hidden.
 *
 * The device warning is styled to cover the entire viewport with a message in the center.
 */
function checkDevice() {
    const deviceWarning = document.getElementById('device_warning');
    const canvas = document.getElementById('canvas');
    const width = window.innerWidth;
    const height = window.innerHeight;

    if ((width < 1024 && width < 667) || height > 1023 && width <= 1024) {
        canvas.style.display = 'none';
        deviceWarning.style.display = 'flex';
    } else {
        canvas.style.display = 'block';
        deviceWarning.style.display = 'none';
    }
}

/**
 * Adds an event listener to the window that triggers the `checkDevice` function
 * whenever the window is resized. This allows the application to dynamically check
 * the device's screen dimensions and adjust the visibility of the canvas and 
 * the device warning message accordingly.
 * 
 * The `checkDevice` function will be executed on each resize event, ensuring
 * that users receive the appropriate display based on the current window size.
 */
window.addEventListener('resize', checkDevice);