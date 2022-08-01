import rpc from "rage-rpc";

let settingsBrowser: BrowserMp | null = null;

mp.keys.bind(key.F3, true, () => {
  mp.gui.cursor.visible = !mp.gui.cursor.visible;
});

mp.keys.bind(key.F2, true, async () => {
	mp.events.callRemote('getInfoUserData');
});

mp.events.add("receptionUserData", async (login: string, userAvatarUrl: string) => {
    if (!settingsBrowser) {
      const data = {
        login: login,
        avatarUrl: userAvatarUrl,
      };
      
      settingsBrowser = mp.browsers.new("http://localhost:3000/userMenu");
      await rpc.callBrowser(settingsBrowser, "CefSettings", { ...data });
      mp.gui.cursor.show(true, true);
    } else {
      settingsBrowser.destroy();
      settingsBrowser = null;
      mp.gui.cursor.show(false, false);
    }
});
