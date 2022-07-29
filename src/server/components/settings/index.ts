import UserModel from "@/database/models/User";

import rpc from "rage-rpc";

mp.events.add("getInfoUserData", async (player: PlayerMp) => {
  const user = await UserModel.findOne({ serial: player.serial });
  if (!user) return;

  player.call('receptionUserData', [user.login, user.avatarSocialClub]);
  console.log([user.login, user.avatarSocialClub]);
});
