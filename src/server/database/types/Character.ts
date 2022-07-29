export type Character = {
    uid: number,
    firstName: string,
    lastName: string,
    age: string,
    gender: string,
    fullName: string,
    position: Object,
    health: number,
    armour: number,
    admin: boolean;
    adminLvl: 1 | 2 | 3;
};