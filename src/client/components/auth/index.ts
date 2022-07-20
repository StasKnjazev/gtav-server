let createAccountCef: BrowserMp | null = null;

mp.events.add({
  callRegAccount: (
    email: string,
    login: string,
    password: string,
    rpassword: string
  ) => {
    mp.events.callRemote("authRegister", email, login, password, rpassword);
    mp.gui.cursor.visible = true;
  },

  callLoginAccount: (login: string, password: string) => {
    mp.events.callRemote("authLogin", login, password);
    mp.gui.cursor.visible = true;
  },

  destroyNewAccountBrowser: () => {
    if (createAccountCef) {
      createAccountCef.destroy();
      createAccountCef = null;
      mp.gui.cursor.visible = false;
    }
  },

  showNewAccountBrowser: () => {
    if (!createAccountCef) {
      createAccountCef = mp.browsers.new("http://localhost:3000/auth");
      mp.gui.cursor.visible = true;
      mp.game.graphics.notify("Web component is work.");
    }
  },
});
