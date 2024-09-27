class StatusBarBoss extends StatusBar {

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 510;
        this.y = -5;
        this.setPercentage(100);
    }

}