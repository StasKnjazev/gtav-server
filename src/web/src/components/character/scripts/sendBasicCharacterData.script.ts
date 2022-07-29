type Props = {
  firstName: string,
  lastName: string,
  age: string
};

export const sendData = (mainData: Props, gender: {}) => {
  if (
    mainData.firstName === "" ||
    mainData.lastName === "" ||
    mainData.age === "" ||
    gender === {}
  ) return console.log("Укажите все необходимые данные.");
  const ruPattern = /^\p{Script=Cyrillic}+$/u;
  const numberPattern = /[0-9]/;
  if (
    numberPattern.test(mainData.firstName) ||
    numberPattern.test(mainData.lastName)
  ) return console.log("Есть цифры в строке");
  const ageNum = Number(mainData.age);
  if (ruPattern.test(mainData.firstName) || ruPattern.test(mainData.lastName)) return console.log("Латиница");
  if (ageNum >= 100) return console.log("Недопустимый возраст!");

  console.log({ ...mainData }, { ...gender });
  // @ts-ignore
  if (window.mp) {
    // @ts-ignore
    window.mp.trigger("", { ...mainData }, { ...gender });
  }
};