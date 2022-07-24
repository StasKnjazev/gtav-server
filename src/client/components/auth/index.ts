let createAccountCef: BrowserMp | null = null;
let hud: BrowserMp | null = null;

mp.events.add({
  callRegAccount: (email: string, login: string, password: string, rpassword: string) => {
    mp.events.callRemote("authRegister", email, login, password, rpassword);
    mp.console.logInfo(`${email} ${login} ${password} ${rpassword}`);
  },

  callLoginAccount: (login: string, password: string) => {
    mp.events.callRemote("authLogin", login, password);
    mp.gui.cursor.show(true, true);
  },

  callCharacterRegister: (mainData: Object, gender: Object) => {
    mp.console.logInfo(`${mainData} / ${gender}`);
  },

  destroyNewAccountBrowser: () => {
    if (createAccountCef) {
      createAccountCef.destroy();
      createAccountCef = null;
      mp.gui.chat.show(true);
      mp.gui.chat.activate(true);
      mp.gui.cursor.show(false, false);
      mp.players.local.freezePosition(false);
    }
  },

  showNewAccountBrowser: () => {
    if (!createAccountCef) {
      createAccountCef = mp.browsers.new("http://localhost:3000/auth");
      mp.players.local.position = new mp.Vector3(35.68, 859.94, 197.72);
      mp.gui.chat.show(false);
      mp.gui.chat.activate(false);
      mp.gui.cursor.show(true, true);
      mp.players.local.freezePosition(true);
    }
  },
});
