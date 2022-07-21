'use strict';

class localHud {
    get localCursor() {
        return mp.gui.cursor.visible;
    }
    set localCursor(toggle) {
        mp.gui.cursor.show(toggle, toggle);
    }
    toggleLocalCursor() {
        this.localCursor = !this.localCursor;
    }
    enabledHud = true;
    get isEnabledHud() {
        return this.enabledHud;
    }
    setEnabledHud(toggle) {
        this.enabledHud = toggle;
        mp.gui.chat.show(toggle);
        mp.game.ui.displayHud(toggle);
        mp.game.ui.displayAreaName(toggle);
        mp.game.ui.displayRadar(toggle);
    }
}
var localHud$1 = new localHud();

const localPlayer = mp.players.local;
class Fly {
    enabled = false;
    camera = mp.cameras.new("gameplay");
    constructor() {
        mp.keys.bind(0x73, true, () => this.toggleFly());
        mp.events.add("render", () => this.fly());
    }
    set state(toggle) {
        this.enabled = toggle;
    }
    get state() {
        return this.enabled;
    }
    fly() {
        const { localCursor } = localHud$1;
        if (!this.state || localCursor)
            return;
        const cameraRot = this.camera.getRot(2);
        const nativeHeading = mp.game.invoke("0x8D4D46230B2C353A" /* RageEnums.Natives.CAM.GET_FOLLOW_PED_CAM_VIEW_MODE */) != 4
            ? cameraRot.z + 180
            : cameraRot.z;
        localPlayer.setHeading(nativeHeading);
        let { position: { x, y, z }, } = localPlayer;
        let realspeed = 1;
        if (mp.keys.isDown(160 /* key.LSHIFT */))
            realspeed *= 2;
        if (mp.keys.isDown(18 /* key.ALT */))
            realspeed *= 0.2;
        if (mp.keys.isDown(87 /* key.W */)) {
            x += realspeed * -Math.sin((cameraRot.z * Math.PI) / 180);
            y += realspeed * Math.cos((cameraRot.z * Math.PI) / 180);
            z += realspeed * Math.sin((cameraRot.x * Math.PI) / 180);
        }
        if (mp.keys.isDown(65 /* key.A */)) {
            cameraRot.z -= 90;
            x += realspeed * Math.sin((cameraRot.z * Math.PI) / 180);
            y += realspeed * -Math.cos((cameraRot.z * Math.PI) / 180);
        }
        if (mp.keys.isDown(83 /* key.S */)) {
            x += realspeed * Math.sin((cameraRot.z * Math.PI) / 180);
            y += realspeed * -Math.cos((cameraRot.z * Math.PI) / 180);
            z += realspeed * -Math.sin((cameraRot.x * Math.PI) / 180);
        }
        if (mp.keys.isDown(68 /* key.D */)) {
            cameraRot.z += 90;
            x += realspeed * Math.sin((cameraRot.z * Math.PI) / 180);
            y += realspeed * -Math.cos((cameraRot.z * Math.PI) / 180);
        }
        if (mp.keys.isDown(32 /* key.SPACE */))
            z += 0.5 * realspeed;
        if (mp.keys.isDown(162 /* key.LCTRL */))
            z -= 0.5 * realspeed;
        localPlayer.position = new mp.Vector3(x, y, z);
    }
    toggleFly() {
        if (!this.state) {
            localPlayer.freezePosition(true);
            this.state = true;
        }
        else {
            localPlayer.freezePosition(false);
            this.state = false;
            const { position } = localPlayer;
            const { x, y } = position;
            const z = mp.game.gameplay.getGroundZFor3DCoord(x, y, position.z, false, false) +
                1;
            localPlayer.position = new mp.Vector3(x, y, z);
        }
    }
}
new Fly();

mp.keys.bind(114 /* key.F3 */, true, () => {
    mp.gui.cursor.visible = !mp.gui.cursor.visible;
});

const Natives = {
    SET_BLIP_CATEGORY: "0x234CDD44D996FD9A",
    SHOW_HEADING_INDICATOR_ON_BLIP: "0x5FBCA48327B914DF"
};

mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === "player") {
        let color = parseInt(entity.getVariable("blipColor"));
        if (entity.blip == 0) entity.createBlip(1);

        entity.setBlipColor(isNaN(color) ? 0 : color);
        mp.game.invoke(Natives.SET_BLIP_CATEGORY, entity.blip, 7);
        mp.game.invoke(Natives.SHOW_HEADING_INDICATOR_ON_BLIP, entity.blip, true);
    }
});

mp.events.addDataHandler("blipColor", (entity, value) => {
    if (entity.type === "player") {
        let color = parseInt(value);
        entity.setBlipColor(isNaN(color) ? 0 : color);
    }
});

let createAccountCef = null;
mp.events.add({
    callRegAccount: (email, login, password, rpassword) => {
        mp.events.callRemote("authRegister", email, login, password, rpassword);
        mp.console.logInfo(`${email} ${login} ${password} ${rpassword}`);
        mp.gui.cursor.visible = true;
        mp.gui.cursor.show(true, true);
    },
    callLoginAccount: (login, password) => {
        mp.events.callRemote("authLogin", login, password);
        mp.gui.cursor.visible = true;
        mp.gui.cursor.show(true, true);
    },
    destroyNewAccountBrowser: () => {
        if (createAccountCef) {
            createAccountCef.destroy();
            createAccountCef = null;
            mp.gui.chat.show(true);
            mp.gui.chat.activate(true);
            mp.gui.cursor.visible = false;
            mp.gui.cursor.show(false, false);
            mp.players.local.freezePosition(false);
        }
    },
    showNewAccountBrowser: () => {
        if (!createAccountCef) {
            createAccountCef = mp.browsers.new('http://localhost:3000/auth');
            mp.players.local.position = new mp.Vector3(35.68, 859.94, 197.72);
            mp.gui.chat.show(false);
            mp.gui.chat.activate(false);
            mp.gui.cursor.visible = true;
            mp.gui.cursor.show(true, true);
            mp.players.local.freezePosition(true);
        }
    },
});
