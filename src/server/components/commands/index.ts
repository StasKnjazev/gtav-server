import bcrypt from 'bcryptjs';
import { UserModel } from '@/database/models/User';

mp.events.addCommand({
	login: async (player: PlayerMp, inputLogin: string) => {
		const inputPassword = 'pass4';
		player.outputChatBox(`Input data: ${inputLogin} | ${inputPassword}`);

		const user = await UserModel.findOne({ login: inputLogin });

		const unHash = bcrypt.compareSync(inputPassword, user!.password);

		if (!user) return player.outputChatBox('Аккаунта не существует.');
		// if (user.loggedIn === true) return player.outputChatBox('На аккаунте уже кто-то играет.');
		if (!unHash) return player.outputChatBox('Неверный логин или пароль!');
		if (player.socialClub !== user.socialClub) return player.outputChatBox('[SocialClub] Аккаунт не соответсвует полученным данным.');
		if (player.serial !== user.serial) return player.outputChatBox('[Serial] Аккаунт не соответсвует полученным данным.');
		if (player.rgscId !== user.rgsc) return player.outputChatBox('[Rgsc] Аккаунт не соответсвует полученным данным.');

		const { x, y, z }: any = user.position;
		player.position = new mp.Vector3(x, y, z);
		player.dbId = user._id.toString();
		player.uid = user.uid;

		player.outputChatBox(`Добро пожаловать на сервер: ${user.firstName} ${user.lastName}`);
	},

	find: async (player: PlayerMp, inputId: string) => {
		const user = await UserModel.find({ _id: inputId });
        if (!user) return player.outputChatBox('Пользователь не найден');

        console.log(user);
	},

	reg: async (player: PlayerMp, inputEmail: string) => {
		const pass = 'pass4';
		const passHash = (await bcrypt.hash(pass, 10)).toString();

		const newUser = new UserModel({
			email: inputEmail,
			login: 'login4',
			firstName: 'firstname4',
			lastName: 'lastName4',
			fullName: `firstname4 + lastName4` /** тут сделать потом что-то типо: firstName + lastName (чтобы получить полное ФИ) */,
			password: passHash,
			loggedIn: player.loggedIn,
			ip: player.ip,
			serial: player.serial,
			rgsc: player.rgscId,
			socialClub: player.socialClub,
			position: player.position
		});

		await newUser.save();

		player.outputChatBox(`Добро пожаловать на сервер: ${newUser.firstName} ${newUser.lastName}`);
	},

	pos: (player: PlayerMp, _: any): void => {
		let p: Vector3 = player.position;
		let h: number | Vector3 = player.heading;
		console.log(`${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)} | * Head: ${h.toFixed(4)}`);
	}
});
