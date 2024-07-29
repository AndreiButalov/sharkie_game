function createBackgroundLayer(layerImages, initialOffset, step, repetitions) {
    let objects = [];
    for (let i = 0; i < repetitions; i++) {
        for (let j = 0; j < layerImages.length; j++) {
            objects.push(new BackgroundObject(layerImages[j], initialOffset + (i * layerImages.length + j) * step));
        }
    }
    return objects;
}

const waterLayers = ['img/3. Background/Layers/5. Water/D2.png', 'img/3. Background/Layers/5. Water/D1.png'];
const fondo2Layers = ['img/3. Background/Layers/4.Fondo 2/D2.png', 'img/3. Background/Layers/4.Fondo 2/D1.png'];
const fondo1Layers = ['img/3. Background/Layers/3.Fondo 1/D2.png', 'img/3. Background/Layers/3.Fondo 1/D1.png'];
const floorLayers = ['img/3. Background/Layers/2. Floor/D2.png', 'img/3. Background/Layers/2. Floor/D1.png'];
const lightLayers = ['img/3. Background/Layers/1. Light/2.png', 'img/3. Background/Layers/1. Light/1.png'];

const initialOffset = -720;
const step = 720;
const repetitions = 5;

const backgroundObjects = [
    ...createBackgroundLayer(waterLayers, initialOffset, step, repetitions),
    ...createBackgroundLayer(fondo2Layers, initialOffset, step, repetitions),
    ...createBackgroundLayer(fondo1Layers, initialOffset, step, repetitions),
    ...createBackgroundLayer(floorLayers, initialOffset, step, repetitions),
    ...createBackgroundLayer(lightLayers, initialOffset, step, repetitions)
];

const level1 = new Level(
    [
        new Bubblefish(),
        // new Bubblefish(),
        // new Bubblefish()
    ],
    backgroundObjects
);

