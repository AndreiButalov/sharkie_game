let canvas;
let ctx;
let character = new Image();

function init() {
    // canvas = document.getElementById('canvas');
    // ctx = canvas.getContext('2d');
    // character.src = '../img/1.Sharkie/3.Swim/1.png';
    
    // setTimeout(function() {
    //     ctx.drawImage(character, 10, 70, 80, 70);
    // }, 1000);

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Device Pixel Ratio berücksichtigen
    const dpr = window.devicePixelRatio || 1;
    const width = 720;
    const height = 480;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Bild laden und zeichnen
    const character = new Image();
    character.src = '../img/1.Sharkie/3.Swim/1.png';
    character.onload = function() {
        ctx.drawImage(character, 10, 250, 170, 170);
    };
    

}