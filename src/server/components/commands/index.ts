import CharacterModel from "@/database/models/Character";
import UserModel from "@/database/models/User";

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

  setAdmin: async (player: PlayerMp, uid: number) => {
    const character = await CharacterModel.findOne({ uid: uid });
    if (!character) {
      player.outputChatBox("Пользователь не найден.");
    } else {
      character.admin = true;
      character.adminLvl = 3;

      player.notify(`${character.fullName} Назначен администратором ${character.adminLvl} уровня!`);
    }
  },

  changeUrl: async (player: PlayerMp, url: string) => {
    player.call('changeUrlToClient', [url]);
  },
});
