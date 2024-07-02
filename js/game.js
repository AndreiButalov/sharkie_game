let canvas;
let world;


function init() {
    const canvas = document.getElementById('canvas');
    scaleCanvas(canvas);
    world = new World(canvas);   
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