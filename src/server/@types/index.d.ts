declare global {
	interface PlayerMp {
		dbId: string;
		uid: number;
		firstName: string;
		lastName: string;
		loggedIn: boolean;
		admin: boolean;
		adminLvl: string;
		
		money: {
			cash: number,
			bank: number,
		};

		isOnWork: boolean;
		isJob: string;
		jobCollctor: {
			bankIndex: number;
			partyFriendsValue: number;
			partyFriendsList: string[];
			vehicle: VehicleMp;
			pointIndex: number;
			routeIndex: number;
			bagsValue: number;
		};
	}
}

declare module 'express';

export {};
