export const sendData = (firstName: string, lastName: string, age: string) => {
    const ruPattern = /^\p{Script=Cyrillic}+$/u;
    const ageNum = Number(age);
    if (ruPattern.test(firstName) || ruPattern.test(lastName)) return console.log('Латиница');
    if (ageNum >= 100) return console.log('Недопустимый возраст!');
    
    console.log(firstName, lastName, age);
    // @ts-ignore
    if (window.mp) {
        // @ts-ignore
        window.mp.trigger('', firstName, lastName, age);
    }
}