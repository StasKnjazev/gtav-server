const onAccount = (login: string, password: string) => {
  if (login === undefined || login === null || login === '') return;
  if (password === undefined || password === null || password === '') return;
  
  console.log(login, password);
  // @ts-ignore
  if (window.mp) {
    // @ts-ignore
    window.mp.trigger("callLoginAccount", login, password);
  }
};

export default onAccount;
