'use strict';

let main = null;
if (!main) {
    main = mp.browsers.new('http://localhost:3000');
    mp.gui.chat.push('Браузер работает');
}
mp.events.add('useeffectevent', () => {
    mp.gui.chat.push('Ивент с эффекта сработал');
});
mp.events.add('usefunctionevent', () => {
    mp.gui.chat.push('Ивент с функции сработал');
});
mp.keys.bind(114 /* key.F3 */, true, () => {
    mp.gui.cursor.visible = !mp.gui.cursor.visible;
});
