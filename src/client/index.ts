import './basic';
import './utils';
import './components';

let main = null;

if (!main) {
	main = mp.browsers.new('http://localhost:3000/auth');
	mp.gui.chat.push('Браузер работает');
}

mp.events.add('callLoginAccount', (login: string, password: string) => {
	mp.gui.chat.push(`${login} ${password}`);
	mp.events.callRemote('authLogin', login, password);
})