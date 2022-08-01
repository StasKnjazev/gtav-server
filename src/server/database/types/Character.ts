export type Character = {
    uid: number,
    firstName: string,
    lastName: string,
    age: string,
    gender: string,
    fullName: string,
    position: Object,
    dimension: number;
    health: number,
    armour: number,
    admin: boolean,
    adminLvl: number,
    money: Money,
    isWorkOnJob: boolean,
    isJob: string,
};

type Money = {
    cash: number,
    bank: number,
};