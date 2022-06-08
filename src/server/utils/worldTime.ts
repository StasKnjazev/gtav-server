class WorldTime {
    private date!: Date;

    constructor() {
        this.changeWorldTime();
    }
    
    private changeWorldTime () {
        this.date = new Date();
        this.date.setHours(this.date.getUTCHours() + 3);
        const hour = this.date.getHours(),
            minute = this.date.getMinutes(),
            seconds = this.date.getSeconds();

        setInterval(() => {
            mp.world.time.set(hour, minute, seconds);
        }, 1000);
    }
}

new WorldTime();