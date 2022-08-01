import CharacterModel from "@/database/models/Character";
import UserModel from "@/database/models/User";
import bcrypt from "bcryptjs";

class Auth {
  constructor() {
    this.initEvents();
  }

  private initEvents(): void {
    mp.events.add({
      authLogin: async (player: PlayerMp, login: string, password: string) => {
        // soon...
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
              dimension: player.dimension,
              admin: false,
              isWorkOnJob: false,
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
            player.dimension = 0;
          } else {
            console.log("Аккаунт уже существует!"); // notify
          }
        } catch (e) {
          console.log(e);
        }
      },
    });
  }

  public loginToAccount(player: PlayerMp) {
    UserModel.findOne({ serial: player.serial })
      .populate({ path: "character" })
      .exec(function (err: any, users: any) {
        if (err) return console.error(`Populate error - ${err}`);
        player.outputChatBox(`Добро пожаловать на сервер: ${users.character.fullName}`);
        const { x, y, z }: any = users.character.position;
        player.position = new mp.Vector3(x, y, z);
        player.dbId = users.character._id.toString();
        player.uid = users.character.uid;
        player.loggedIn = true;
        player.model = mp.joaat(users.character.gender === "female" ? "mp_f_freemode_01" : "mp_m_freemode_01");
        player.dimension = users.character.dimension;
        player.admin = users.character.admin;
        player.adminLvl = users.character.adminLvl;
        player.isOnWork = users.character.isWorkOnJob;
        player.isJob = users.character.isJob;
      });
  }

  public async playerIsQuit(player: PlayerMp) {
    const data = {
      serial: player.serial,
      position: player.position,
      dimension: player.dimension,
      armour: player.armour,
      health: player.health,
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
          dimension: data.dimension,
          armour: data.armour,
          health: data.health,
        },
      }
    );

    findUser!.save();
    findCharacter!.save();
  }

  public async findUserWithSerial(player: PlayerMp) {
    const findUser = await UserModel.findOneAndUpdate(
      { serial: player.serial },
      { $set: { loggedIn: true } }
    );

    return findUser;
  }
}

const auth = new Auth();

export default auth;
