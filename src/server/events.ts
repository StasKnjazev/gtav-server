import auth from "./components/auth";

mp.events.add({
  playerChat: (player: PlayerMp, message: string | any): void => {
    mp.players.broadcastInRange(player.position, 15, `#${player.uid} говорит: ${message}`);
  },

  playerJoin: async (player: PlayerMp): Promise<void> => {
    try {
      const user = auth.findUserWithSerial(player);
      if (!user) {
        player.call("showNewAccountBrowser");
        player.dimension = player.id + 1000;
      } else {
        auth.loginToAccount(player);
      }
    } catch (e) {
      console.error(e);
    }
  },

  playerQuit: async (player: PlayerMp): Promise<void> => {
    try {
      auth.playerIsQuit(player);
    } catch (e) {
      console.log(e);
    }
  },
});
