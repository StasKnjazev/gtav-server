const localPlayer = mp.players.local;
import localHud from "@/utils/hud";

class Fly {
  private enabled = false;
  private camera = mp.cameras.new("gameplay");

  constructor() {
    mp.keys.bind(0x73, true, () => this.toggleFly());
    mp.events.add("render", () => this.fly());
  }

  public set state(toggle: boolean) {
    this.enabled = toggle;
  }

  public get state(): boolean {
    return this.enabled;
  }

  public fly() {
    const { localCursor } = localHud;
    if (!this.state || localCursor) return;
    const cameraRot = this.camera.getRot(2);
    const nativeHeading =
      mp.game.invoke(RageEnums.Natives.CAM.GET_FOLLOW_PED_CAM_VIEW_MODE) != 4
        ? cameraRot.z + 180
        : cameraRot.z;
    localPlayer.setHeading(nativeHeading);
    let {
      position: { x, y, z },
    } = localPlayer;
    let realspeed: number = 1;

    if (mp.keys.isDown(key.LSHIFT)) realspeed *= 2;

    if (mp.keys.isDown(key.ALT)) realspeed *= 0.2;

    if (mp.keys.isDown(key.W)) {
      x += realspeed * -Math.sin((cameraRot.z * Math.PI) / 180);
      y += realspeed * Math.cos((cameraRot.z * Math.PI) / 180);
      z += realspeed * Math.sin((cameraRot.x * Math.PI) / 180);
    }
    if (mp.keys.isDown(key.A)) {
      cameraRot.z -= 90;
      x += realspeed * Math.sin((cameraRot.z * Math.PI) / 180);
      y += realspeed * -Math.cos((cameraRot.z * Math.PI) / 180);
    }
    if (mp.keys.isDown(key.S)) {
      x += realspeed * Math.sin((cameraRot.z * Math.PI) / 180);
      y += realspeed * -Math.cos((cameraRot.z * Math.PI) / 180);
      z += realspeed * -Math.sin((cameraRot.x * Math.PI) / 180);
    }
    if (mp.keys.isDown(key.D)) {
      cameraRot.z += 90;
      x += realspeed * Math.sin((cameraRot.z * Math.PI) / 180);
      y += realspeed * -Math.cos((cameraRot.z * Math.PI) / 180);
    }
    if (mp.keys.isDown(key.SPACE)) z += 0.5 * realspeed;

    if (mp.keys.isDown(key.LCTRL)) z -= 0.5 * realspeed;

    localPlayer.position = new mp.Vector3(x, y, z);
  }

  public toggleFly() {
    if (!this.state) {
      localPlayer.freezePosition(true);
      this.state = true;
    } else {
      localPlayer.freezePosition(false);
      this.state = false;
      const { position } = localPlayer;
      const { x, y } = position;
      const z =
        mp.game.gameplay.getGroundZFor3DCoord(x, y, position.z, false, false) +
        1;
      localPlayer.position = new mp.Vector3(x, y, z);
    }
  }
}

new Fly();
