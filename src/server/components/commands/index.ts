import { UserModel } from "@/database/models/User";

mp.events.addCommand({
  pos: (player: PlayerMp, _: any): void => {
    let p: Vector3 = player.position;
    let h: number | Vector3 = player.heading;
    console.log(
      `${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(
        2
      )} | * Head: ${h.toFixed(4)}`
    );
  },

  setAdmin: async (player: PlayerMp, login: string) => {
    const user = await UserModel.findOne({ login: login });
    if (!user) return player.outputChatBox("Пользователь не найден.");
  },

  changeUrl: async (player: PlayerMp, url: string) => {
    player.call('changeUrlToClient', [url]);
  },
});
