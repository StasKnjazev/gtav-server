import { UserModel } from "@/database/models/User";
import bcrypt from "bcryptjs";

class Auth {
  constructor() {
    this.initEvents();
  }

  private initEvents(): void {
    mp.events.add({
      playerJoin: async (player: PlayerMp) => {
        try {
          const findsUser = await UserModel.findOneAndUpdate(
            { serial: player.serial },
            { $set: { loggedIn: true } }
          );
          if (!findsUser) {
            player.call("showNewAccountBrowser");
          } else {
            player.outputChatBox(`Добро пожаловать на сервер ${findsUser.login}`);
            const { x, y, z }: any = findsUser.position;
            player.position = new mp.Vector3(x, y, z);
            player.dbId = findsUser._id.toString();
            player.loggedIn = true;
          }
        } catch (e) {
          console.error(e);
        }
      },

      playerQuit: async (player: PlayerMp) => {
        try {
          const findUserQuit = await UserModel.findOneAndUpdate(
            { serial: player.serial },
            { $set: { loggedIn: false, position: player.position } }
          );

          findUserQuit!.save();
        } catch (e) {
          console.log(e);
        }
      },

      authLogin: async (player: PlayerMp, login: string, password: string) => {
        player.outputChatBox(`[Server] ${login} ${password}`);
        const authUser = await UserModel.findOne({ login: login });
        if (!authUser) return console.log("Неверный логин или пароль!");
        if (
          authUser.serial !== player.serial ||
          authUser.rgsc !== player.rgscId ||
          authUser.socialClub !== player.socialClub
        )
          return console.log("Данные аккаунта не совпадают.");
        player.outputChatBox(`Добро пожаловать на сервер ${authUser.login}`);
        const { x, y, z }: any = authUser.position;
        player.position = new mp.Vector3(x, y, z);
        player.dbId = authUser._id.toString();
        player.loggedIn = true;
      },

      authRegister: async (
        player: PlayerMp,
        email: string,
        login: string,
        password: string
      ) => {
        player.outputChatBox(`[Server] ${email} ${login} ${password}`);
        const findUser = await UserModel.findOne({ serial: player.serial });
        if (!findUser || !findUser.socialClub || !findUser.rgsc) {
          const passHash = (await bcrypt.hash(password, 10)).toString();

          const newUser = new UserModel({
            email: email,
            login: login,
            password: passHash,
            loggedIn: true,
            rgsc: player.rgscId,
            socialClub: player.socialClub,
            ip: player.ip,
            serial: player.serial,
            position: player.position,
            avatarSocialClub: `https://a.rsg.sc/n/${player.socialClub}`,
          });

          await newUser.save();

          player.outputChatBox(`Аккаунт успешно зарегистрирован под логином: ${login}`);
          player.call("destroyNewAccountBrowser");
        } else {
          player.outputChatBox("Аккаунт уже существует");
        }
      },
    });
  }
}

new Auth();
