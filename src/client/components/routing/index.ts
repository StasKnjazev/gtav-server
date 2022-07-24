let main: BrowserMp | null = null;

mp.events.add('changeUrlToClient', async (url: string) => {
    if (!main) {
        main = mp.browsers.new(`http://localhost:3000/${url}`);
    } else {
        main.destroy();
        main = null;
    }
});