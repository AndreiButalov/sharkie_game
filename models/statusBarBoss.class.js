class StatusBarBoss extends StatusBar {

    percentage = 100;

    IMAGES = [
        'img/4. Marcadores/orange/0_  copia.png',
        'img/4. Marcadores/orange/20_ copia 2.png',
        'img/4. Marcadores/orange/40_  copia.png',
        'img/4. Marcadores/orange/60_  copia.png',
        'img/4. Marcadores/orange/80_  copia.png',
        'img/4. Marcadores/orange/100_  copia.png'
    ];

    constructor() {
        super();
        this.x = 510;
        this.y = 59;
        this.setPercentageBoss(100);
    }

    setPercentageBoss(percentage) {
        this.percentage = percentage;
        let path  = this.IMAGES[this.resolveImagesIndex()];
        this.img = this.imageCache[path];
    }


    resolveImagesIndex(){
        if(this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
    
}