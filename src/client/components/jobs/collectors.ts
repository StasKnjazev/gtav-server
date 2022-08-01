import notifyBlack from "./scripts/startNotify";
import script from "./scripts/work";

mp.events.add({
    startWorkCollectors: () => {
        notifyBlack('чтобы открыть меню.');
        mp.keys.bind(key.E, true, script.startWork);
    },

    stopWorkCollectors: () => {
        notifyBlack('чтобы открыть меню.');
        mp.keys.bind(key.E, true, script.stopWork);
    }
});