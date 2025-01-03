class Sound {

    constructor() {
        this.levelSound = new Audio('audio/underwater flow.mp3');
        this.adventureTheme = new Audio('audio/adventureTheme.mp3');
        this.bubbleHighSound = new Audio('audio/bubble_high.mp3');
        this.bubbleLowSound = new Audio('audio/bubble_low.mp3');
        this.coinSound = new Audio('audio/coin.mp3');
        this.drinkingPoison = new Audio('audio/drinkingPoison.mp3');
        this.finalBossSound = new Audio('audio/finalBossSound.mp3');
        this.laughterBoss = new Audio('audio/laughterBoss.mp3');
        this.bossDamage = new Audio('audio/bossDamage.mp3');
        this.waterSlapping = new Audio('audio/waterSlapping.mp3');
        this.electricShock = new Audio('audio/electricShock.mp3');
        this.bossAttackSound = new Audio('audio/bossAttack.mp3');
        this.bossDeathSound = new Audio('audio/bossDeathSound.mp3');
        this.yourWin = new Audio('audio/yourWin.mp3');
        this.fatality = new Audio('audio/fatality.mp3');
        this.blowingBubble = new Audio('audio/blowingBubble.mp3');

        this.sounds = [
            this.levelSound,
            this.adventureTheme,
            this.bubbleHighSound,
            this.bubbleLowSound,
            this.coinSound,
            this.drinkingPoison,
            this.finalBossSound,
            this.laughterBoss,
            this.bossDamage,
            this.waterSlapping,
            this.electricShock,
            this.bossAttackSound,
            this.bossDeathSound,
            this.yourWin,
            this.fatality,
            this.blowingBubble
        ];
    }

    /**
     * Stops all currently playing sounds and resets their playback to the beginning.
     * Sets the global muted state to true, indicating that sounds are muted.
     */
    stopAllSounds() {
        this.sounds.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
        world.isMuted = true;
    }

    
    /**
     * Stops all currently playing sounds and resets their playback to the beginning.
     * This method does not change the global muted state.
     */
    stopAllSoundsEndLevel() {
        this.sounds.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }


    /**
     * Plays final sound effects when the end boss spawns, including laughter and boss music.
     * Stops background sounds unless the game is muted.
     */
    finalSound() {
        if (!world.isMuted) {
            this.adventureTheme.pause();
            this.laughterBoss.play();
            this.finalBossSound.play();
        }
    }
    
}