import config from "./config/collector.config";

class Collectors {
  public routes: any;
  private workBlip!: BlipMp;
  private marker!: MarkerMp;
  private status: boolean = false;

  constructor({ routes }: any) {
    this.routes = routes;

    config.bankBlips.map((position: any) => {
      const { x, y, z } = position;

      this.workBlip = mp.blips.new(408, new mp.Vector3(x, y, z), {
        name: "Работа инкассатора",
        scale: 0.7,
        color: 43,
        shortRange: true,
        dimension: 0,
      });
    });

    config.markers.map((position: any) => {
      const { x, y, z } = position;

      this.marker = mp.markers.new(27, new mp.Vector3(x, y, z), 1, {
        color: [0, 178, 255, 198],
        dimension: 0,
        visible: true,
      });
    });

    this.events();
    this.commands();
  }

  private async commands(): Promise<void> {
    mp.events.addCommand({
      fsc: (player: PlayerMp) => {
        player.position = new mp.Vector3(-1383.08, -505.05, 33.16);
      },
    });
  }

  private playerEnterColshape(player: PlayerMp, colshape: ColshapeMp) {
    try {
      switch (colshape) {
        case config.startColshapeFromSantos:
          if (player.isOnWork === false) {
            player.call("startWorkCollectors");
          } else {
            player.call("stopWorkCollectors");
          }
          break;

        default:
          break;
      }
    } catch (e) {
      console.error(e);
    }
  }

  private playerExitColshape(player: PlayerMp, colshape: ColshapeMp): void {
    switch (colshape) {
      case config.startColshapeFromSantos: break;

      default:
        break;
    }
  }

  private async playerStartWork(player: PlayerMp): Promise<void> {
    player.isOnWork = true;
    player.outputChatBox("Начал работать!");
  }

  private async playerStopWork(player: PlayerMp): Promise<void> {
    player.isOnWork = false;
    player.outputChatBox("Закончил работать!");
  }

  private async events(): Promise<void> {
    mp.events.add({
      playerEnterColshape: this.playerEnterColshape.bind(this),
      playerExitColshape: this.playerExitColshape.bind(this),
      playerStartWorkOnCollectors: async (player: PlayerMp) => {
        try {
          this.playerStartWork(player);
        } catch (e) {
          console.error(e);
        }
      },

      playerStopWorkOnCollector: async (player: PlayerMp) => {
        try {
          this.playerStopWork(player);
        } catch (e) {
          console.error(e);
        }
      },
    });
  }
}

new Collectors({
  routes: {
    0: {
      coordinates: [[]],
    },
  },
});
