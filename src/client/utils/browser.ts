import rpc from "rage-rpc";

let hud: BrowserMp | null = null;

mp.events.add("playerReady", async () => {
  mp.events.callRemote("hudGetDataToRPC"); // Получаю данные из БД (player.uid, player.admin)
});

// Сделать обновление данных (online) каждые 5-10 секунд. (ПОТОМ)
mp.events.add("hudDataWithRPC", async (uid: number, admin: boolean) => {
  if (!hud) {
    const data = {
      uid: uid,
      isAdmin: admin,
      online: mp.players.length,
    };

    hud = mp.browsers.new("http://localhost:3000/hud");
    await rpc.callBrowser(hud, "hudSetData", {...data});
  } else {
    hud.destroy();
    hud = null;
  }
});
