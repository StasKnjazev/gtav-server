import CharacterModel from "@/database/models/Character";

class Money {
  constructor() {}

  public async changePlayerMoney(player: PlayerMp, type: string, value: number, message?: string) {
    const character = await CharacterModel.findOne({ uid: player.uid });
    if (!character) return console.log("Игрок не был найден!");
    if (value <= 0 || value === 0 || value === null) return console.log("Некорректная сумма перевода!");

    switch (type) {
        case "cash":
            character.money.cash = value;
            player.money.cash = character.money.cash;
            break;

        case "bank":
            character.money.bank = value;
            player.money.bank = character.money.bank;
            break;

        default:
            break;
    }

    await character.save();
    // call cef (rpc);
    console.log(`Счет [${character.fullName}] был пополнен на [${value}], итого: ${character.money.cash} | ${character.money.bank} / (${message})`);
  }
}

const playerMoney = new Money();

export default playerMoney;
