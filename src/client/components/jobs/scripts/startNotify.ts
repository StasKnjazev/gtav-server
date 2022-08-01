export default function notifyBlack (message: string) {
    if (mp.players.local.vehicle) return;
    if (mp.players.local.isTypingInTextChat) return;
    if (mp.game.ui.isPauseMenuActive()) return;

    mp.game.ui.setTextComponentFormat("STRING");
    mp.game.ui.addTextComponentSubstringPlayerName(`Нажмите ~INPUT_CONTEXT~ ${message}`);
    mp.game.ui.displayHelpTextFromStringLabel(0, false, true, 3000);
}