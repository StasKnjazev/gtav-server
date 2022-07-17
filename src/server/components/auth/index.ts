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
                    const findUser = UserModel.findOne({ socialClub: player.socialClub });
                    if (!findUser) return player.outputChatBox('Авторизация не доступна, только регистрация.'); // сделать чтобы отображало страницу регистрации
                    
                    // method автоматического логина в аккаунт (через storage)
                } catch (e) {
                    console.error(e);
                }
            },
        });
    }
}

new Auth();