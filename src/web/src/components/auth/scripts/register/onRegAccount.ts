export const onRegAccount = (
  email: string,
  login: string,
  password: string,
  rpassword: string
) => {
  const regExpMail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regExpMail.test(email)) return console.log("Почта не валидна");
  if (email === "" || login === "" || password === "" || rpassword === "")
    return console.log("Введены не все данные");
  if (login.length < 4) return console.log("Логин слишком короткий");
  if (password.length < 6) return console.log("Пароль слишком короткий");
  if (password !== rpassword) return console.log("Пароли не совпадают");

  console.log(email, login, password, rpassword);
  // @ts-ignore
  if (window.mp) {
    // @ts-ignore
    window.mp.trigger("callRegAccount", email, login, password, rpassword);
  }
};
