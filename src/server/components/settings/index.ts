import UserModel from "@/database/models/User";

mp.events.add("getInfoUserData", async (player: PlayerMp) => {
  const user = await UserModel.findOne({ serial: player.serial });
  if (!user) return;

  player.call('receptionUserData', [user.login, user.avatarSocialClub]);
});
