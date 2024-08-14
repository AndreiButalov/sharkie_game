const level1 = new Level(
    [
        new GreenBubbleFish(720),
        new GreenBubbleFish(1000),
        new GreenBubbleFish(1200)
    ],
    [
    new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', -720),
    new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 0),
    new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 720),
    new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 1440),
    new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 2160),
    new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', -720),
    new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 0),
    new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720),
    new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 1440),
    new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 2160),
    new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', -720),
    new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0),
    new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720),
    new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 1440),
    new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 2160),
    new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', -720),
    new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 0),
    new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720),
    new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 1440),
    new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 2160),
    new BackgroundObject('img/3. Background/Layers/1. Light/2.png', -720),
    new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 0),
    new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 720),
    new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 1440),
    new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 2160),
    ]
);








// let level1;

// const initialOffset = -720;
// const step = 720;
// const repetitions = 5;
// const fishIntervals = [750, 1440, 2160, 2880, 3500];


// const waterLayers = ['img/3. Background/Layers/5. Water/D2.png', 'img/3. Background/Layers/5. Water/D1.png'];
// const fondo2Layers = ['img/3. Background/Layers/4.Fondo 2/D2.png', 'img/3. Background/Layers/4.Fondo 2/D1.png'];
// const fondo1Layers = ['img/3. Background/Layers/3.Fondo 1/D2.png', 'img/3. Background/Layers/3.Fondo 1/D1.png'];
// const floorLayers = ['img/3. Background/Layers/2. Floor/D2.png', 'img/3. Background/Layers/2. Floor/D1.png'];
// const lightLayers = ['img/3. Background/Layers/1. Light/2.png', 'img/3. Background/Layers/1. Light/1.png'];


// function createBackgroundLayer(layerImages, initialOffset, step, repetitions) {
//     let objects = [];
//     for (let i = 0; i < repetitions; i++) {
//         for (let j = 0; j < layerImages.length; j++) {
//             objects.push(new BackgroundObject(layerImages[j], initialOffset + (i * layerImages.length + j) * step));
//         }
//     }
//     return objects;
// }



// // function initLevel() {

// const backgroundObjects = [
//     ...createBackgroundLayer(waterLayers, initialOffset, step, repetitions),
//     ...createBackgroundLayer(fondo2Layers, initialOffset, step, repetitions),
//     ...createBackgroundLayer(fondo1Layers, initialOffset, step, repetitions),
//     ...createBackgroundLayer(floorLayers, initialOffset, step, repetitions),
//     ...createBackgroundLayer(lightLayers, initialOffset, step, repetitions)
// ];




// const fishArray = fishIntervals.flatMap(interval =>
//     Array(2).fill().map(() => new GreenBubbleFish(interval))
// );



//     level1 = new Level(fishArray, backgroundObjects);
// // }



// const fishIntervals = [720, 1440, 2160, 2880, 3600];

// let lastY = null;

// const fishArray = fishIntervals.flatMap(interval => 
//     Array(3).fill().map(() => {
//         const fish = new GreenBubbleFish(interval, lastY);
//         lastY = fish.y;
//         return fish;
//     })
// );

// const level1 = new Level(fishArray, backgroundObjects);