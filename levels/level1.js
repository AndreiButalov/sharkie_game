let level1;

const initialOffset = -720;
const step = 719;
const repetitions = 5;

const greenFishIntervals = [750, 1440, 2160, 2880, 3500];
const redFishIntervals = [800, 1240, 2160, 2880, 3500];
const jellyFishIntervals = [200, 1240, 2160, 2880, 3500];
const coinIntervals = [750, 1440, 2060, 2680, 3000];

const waterLayers = ['img/3. Background/Layers/5. Water/D2.png', 'img/3. Background/Layers/5. Water/D1.png'];
const fondo2Layers = ['img/3. Background/Layers/4.Fondo 2/D2.png', 'img/3. Background/Layers/4.Fondo 2/D1.png'];
const fondo1Layers = ['img/3. Background/Layers/3.Fondo 1/D2.png', 'img/3. Background/Layers/3.Fondo 1/D1.png'];
const floorLayers = ['img/3. Background/Layers/2. Floor/D2.png', 'img/3. Background/Layers/2. Floor/D1.png'];
const lightLayers = ['img/3. Background/Layers/1. Light/2.png', 'img/3. Background/Layers/1. Light/1.png'];


function createBackgroundLayer(layerImages, initialOffset, step, repetitions) {
    let objects = [];
    for (let i = 0; i < repetitions; i++) {
        for (let j = 0; j < layerImages.length; j++) {
            objects.push(new BackgroundObject(layerImages[j], initialOffset + (i * layerImages.length + j) * step));
        }
    }
    return objects;
}


function initialGames() {

    const backgroundObjects = [
        ...createBackgroundLayer(waterLayers, initialOffset, step, repetitions),
        ...createBackgroundLayer(fondo2Layers, initialOffset, step, repetitions),
        ...createBackgroundLayer(fondo1Layers, initialOffset, step, repetitions),
        ...createBackgroundLayer(floorLayers, initialOffset, step, repetitions),
        ...createBackgroundLayer(lightLayers, initialOffset, step, repetitions)
    ];


    const greenFishArray = greenFishIntervals.flatMap(interval =>
        Array(1).fill().map(() => new GreenBubbleFish(interval))
    );

    const redFishArray = redFishIntervals.flatMap(interval =>
        Array(1).fill().map(() => new RedBubbleFish(interval))
    );

    const jellyFishArray = redFishIntervals.flatMap(interval =>
        Array(1).fill().map(() => new JellyFish(interval))
    );



    const enemiesFishsArray = [
        ...greenFishArray,
        ...redFishArray,
        ...jellyFishArray
    ]

    const coinArray = coinIntervals.flatMap(interval =>
        Array(1).fill().map(() => new Coin(interval))
    );

    const poisonArray = coinIntervals.flatMap(interval =>
        Array(1).fill().map(() => new PoisonCollect(interval))
    );
    
    level1 = new Level(enemiesFishsArray, backgroundObjects, coinArray, poisonArray);
}