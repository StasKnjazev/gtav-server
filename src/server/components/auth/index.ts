import CharacterModel from "@/database/models/Character";
import UserModel from "@/database/models/User";
import bcrypt from "bcryptjs";

class Auth {
  constructor() {
    this.initEvents();
  }

  private initEvents(): void {
    mp.events.add({
      playerJoin: async (player: PlayerMp) => {
        try {
          const findUser = await UserModel.findOneAndUpdate(
            { serial: player.serial },
            { $set: { loggedIn: true } }
          );
          if (!findUser) {
            player.call("showNewAccountBrowser");
            player.dimension = player.id + 1000;
          } else {
            this.loginToAccount(player);
          }
        } catch (e) {
          console.error(e);
        }
      },

      playerQuit: async (player: PlayerMp) => {
        try {
          this.playerIsQuit(player);
        } catch (e) {
          console.log(e);
        }
      },

      authLogin: async (player: PlayerMp, login: string, password: string) => {
        const authUser = await UserModel.findOne({ login: login });
        if (!authUser) return console.log("Неверный логин или пароль!");
        if (authUser.serial !== player.serial || authUser.rgsc !== player.rgscId || authUser.socialClub !== player.socialClub) return console.log("Данные аккаунта не совпадают.");
        player.outputChatBox(`Добро пожаловать на сервер ${authUser.login}`);
        // const { x, y, z }: any = authUser.position;
        // player.position = new mp.Vector3(x, y, z);
        player.dbId = authUser._id.toString();
        player.loggedIn = true;
      },

      registerNewCharacterWithUser: async (
        player: PlayerMp,
        email: string,
        login: string,
        password: string,
        firstName: string,
        lastName: string,
        age: string,
        gender: string
      ) => {
        try {
          const findUser = await UserModel.findOne({
            rgsc: player.rgscId,
            serial: player.serial,
          });

          if (!findUser) {
            const character = new CharacterModel({
              firstName: firstName,
              lastName: lastName,
              age: age,
              gender: gender,
              fullName: `${firstName} ${lastName}`,
              armour: 0,
              health: 100,
              position: player.position,
            });

            const hash = (await bcrypt.hash(password, 10)).toString();
            const user = new UserModel({
              email: email,
              login: login,
              password: hash,
              loggedIn: true,
              rgsc: player.rgscId,
              socialClub: player.socialClub,
              ip: player.ip,
              serial: player.serial,
              avatarSocialClub: `https://a.rsg.sc/n/${player.socialClub}`,
              admin: false,
              character: character._id,
            });

            await user.save();
            await character.save();

            player.outputChatBox(`${character.firstName}`);
            player.model = mp.joaat(
              gender === "female" ? "mp_f_freemode_01" : "mp_m_freemode_01"
            );

            player.call("destroyNewAccountBrowser");
          } else {
            console.log("Аккаунт уже существует!"); // notify
          }
        } catch (e) {
          console.log(e);
        }
      },
    });
  }

  private loginToAccount(player: PlayerMp) {
    UserModel.findOne({ serial: player.serial })
      .populate({path: "character"})
      .exec(function (err: any, users: any) {
        if (err) return console.error(`Populate error - ${err}`);
        player.outputChatBox(
          `Добро пожаловать на сервер: ${users.character.fullName}`
        );
        const { x, y, z }: any = users.character.position;
        player.position = new mp.Vector3(x, y, z);
        player.dbId = users.character._id.toString();
        player.uid = users.character.uid;
        player.loggedIn = true;
        player.model = mp.joaat(
          users.character.gender === "female"
            ? "mp_f_freemode_01"
            : "mp_m_freemode_01"
        );
      });
  }

  private async playerIsQuit(player: PlayerMp) {
    const data = {
      serial: player.serial,
      position: player.position,
      armour: player.armour,
      health: player.health,
      dbId: player.dbId,
      uid: player.uid,
    };

    const findUser = await UserModel.findOneAndUpdate(
      { serial: data.serial },
      { $set: { loggedIn: false } }
    );

    const findCharacter = await CharacterModel.findOneAndUpdate(
      { uid: data.uid },
      {
        $set: {
          position: data.position,
          armour: data.armour,
          health: data.health,
        },
      }
    );

    findUser!.save();
    findCharacter!.save();
  }
}

new Auth();
