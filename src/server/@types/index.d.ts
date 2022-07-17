declare global {
	interface PlayerMp {
		isOnWork: boolean;
		isOnWorkAir: boolean;
		currentIndex: number;
		currentRoute: number;

		firstName: string;
		lastName: string;
		email: string;
		login: string;
		adminLvl: string;
		loggedIn: boolean;
		dbId: string;
		uid: number;
	}
}

export {};
