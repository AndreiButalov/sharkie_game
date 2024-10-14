let level1;

const initialOffset = -720;
const step = 719;
const repetitions = 5;


const intervals = {
    greenFish: [750, 1440, 2160, 2500, 3100, 3600],
    redFish: [1100, 1850, 2400, 2880, 3600],
    greenjellyFish: [1200, 1740, 2900],
    lilajellyFish: [900, 2100, 3300],
    coin: [820, 1200, 1290, 1440, 2160, 2300, 2480, 2530, 2680, 3000],
    poison: [480, 1240, 2260, 2700, 3000],
    barrierDown: [500, 3000],
    barrierDownUp: [1700],
};


const layers = {
    water: ['img/3. Background/Layers/5. Water/D2.png', 'img/3. Background/Layers/5. Water/D1.png'],
    fondo2: ['img/3. Background/Layers/4.Fondo 2/D2.png', 'img/3. Background/Layers/4.Fondo 2/D1.png'],
    fondo1: ['img/3. Background/Layers/3.Fondo 1/D2.png', 'img/3. Background/Layers/3.Fondo 1/D1.png'],
    floor: ['img/3. Background/Layers/2. Floor/D2.png', 'img/3. Background/Layers/2. Floor/D1.png'],
    light: ['img/3. Background/Layers/1. Light/2.png', 'img/3. Background/Layers/1. Light/1.png'],
};

function createBackgroundLayer(layerImages) {
    return layerImages.flatMap((image, j) =>
        Array.from({ length: repetitions }, (_, i) => new BackgroundObject(image, initialOffset + (i * layerImages.length + j) * step))
    );
}

function createObjectsFromIntervals(createObjectFn, intervals) {
    return intervals.map(interval => createObjectFn(interval));
}

function initialGames() {
    const barrierArray = [
        ...createObjectsFromIntervals(interval => new BarrierDown(interval), intervals.barrierDown),
        ...createObjectsFromIntervals(interval => new BarrierDownUp(interval), intervals.barrierDownUp)
    ];

    const enemiesFishsArray = [
        ...createObjectsFromIntervals(interval => new GreenBubbleFish(interval), intervals.greenFish),
        ...createObjectsFromIntervals(interval => new RedBubbleFish(interval), intervals.redFish),
        ...createObjectsFromIntervals(interval => new GreenJellyFish(interval), intervals.greenjellyFish),
        ...createObjectsFromIntervals(interval => new LilaJellyFish(interval), intervals.lilajellyFish),
    ];

    const coinArray = createObjectsFromIntervals(interval => new Coin(interval), intervals.coin);
    const poisonArray = createObjectsFromIntervals(interval => new PoisonCollect(interval), intervals.poison);

    const backgroundObjects = [
        ...createBackgroundLayer(layers.water),
        ...createBackgroundLayer(layers.fondo2),
        ...createBackgroundLayer(layers.fondo1),
        ...createBackgroundLayer(layers.floor),
        ...createBackgroundLayer(layers.light)
    ];

    level1 = new Level(enemiesFishsArray, backgroundObjects, coinArray, poisonArray, barrierArray);
}