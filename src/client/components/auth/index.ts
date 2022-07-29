let createAccountCef: BrowserMp | null = null;

mp.events.add({
  newAccountWithCharacterFirst: (email: string, login: string, password: string, firstName: string, lastName: string, age: string, gender: string) => {
    mp.events.callRemote('registerNewCharacterWithUser', email, login, password, firstName, lastName, age, gender);
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
      mp.players.local.freezePosition(true);
      mp.gui.cursor.show(true, true);
    }
  },
});
