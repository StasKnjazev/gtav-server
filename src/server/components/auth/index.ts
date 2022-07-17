import { UserModel } from "@/database/models/User";

class Auth {
    private login!: string;
    private password!: string;
    private passwordHash!: string;

    constructor() {
        this.initEvents();
    }

    private initEvents(): void {
        mp.events.add({
            playerJoin: async (player: PlayerMp) => {
                try {
                    const findUser = await UserModel.findOne({ serial: player.serial });
                    if (!findUser) return player.outputChatBox('Авторизация не доступна, только регистрация.'); // сделать чтобы отображало страницу регистрации
                    
                    UserModel.findOneAndUpdate({serial: player.serial}, { $set: { loggedIn: true } });
                    player.outputChatBox(`Добро пожаловать на сервер ${findUser.firstName} ${findUser.lastName}`);
                    const {x, y, z}: any = findUser.position;
                    player.position = new mp.Vector3(x, y, z);
                    player.dbId = findUser._id.toString();
                    player.loggedIn = true;

                    // method автоматического логина в аккаунт (через storage)
                } catch (e) {
                    console.error(e);
                }
            },

            playerQuit: async (player: PlayerMp) => {
                try {
                    const findUserQuit = await UserModel.findOneAndUpdate({ serial: player.serial });
                    if (!findUserQuit) return console.log('Данный пользователь либо не найден, либо не вышел из игры!');

                    console.log(`${findUserQuit.firstName} ${findUserQuit.lastName} - Вышел из игры!`);
                    player.loggedIn = false;
                } catch (e) {
                    console.log(e);
                }
            }
        });
    }
}

new Auth();