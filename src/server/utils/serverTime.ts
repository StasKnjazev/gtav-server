import { consoleColor } from '../../shared/contansts';

export default class Time {
	private date: Date;
	private hour!: number;
	private minutes!: number;
	private seconds!: number;

	constructor(date: Date) {
		this.date = date;
		this.setDateOnServer(true);
	}

	/**
	 * @param status - Включено обновление времени, или нет. p.s (на будущее может быть)
	 */
	private setDateOnServer(status: boolean) {
		switch (status) {
			case true:
				this.date.setHours(this.date.getUTCHours() + 3);
				this.hour = this.date.getHours();
				this.minutes = this.date.getMinutes();
				this.seconds = this.date.getSeconds();

				setInterval(() => {
					mp.world.time.set(this.hour, this.minutes, this.seconds);
				}, 1000);

                console.log(`${consoleColor.Yellow}[Server] ${consoleColor.Reset}[${this.date.getDate()}/${this.date.getUTCHours()}:${this.date.getUTCMinutes()}] Обновление времени - ${consoleColor.Green}${status}${consoleColor.Reset}.`)
				break;

			case false:
                this.date.setHours(this.date.getUTCHours() + 3);
				mp.world.time.set(0, 0, 0);
				console.log(`${consoleColor.Yellow}[Server] ${consoleColor.Reset}[${this.date.getUTCDate()}/${this.date.getUTCHours()}:${this.date.getUTCMinutes()}] Обновление времени - ${consoleColor.Red}${status}${consoleColor.Reset}.`);
				break;
		}
	}
}
