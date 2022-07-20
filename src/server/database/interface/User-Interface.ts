export interface IUser {
    uid: number;
    dbId: string;
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    fullName: string;
    password: string;
    loggedIn: boolean;
    rgsc: string;
    socialClub: string;
    ip: string | number;
    serial: string;
    position: Object;
    avatarSocialClub: string;
}