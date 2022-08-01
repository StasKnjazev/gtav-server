mp.events.add('hudGetDataToRPC', (player: PlayerMp) => {
    player.call('hudDataWithRPC', [player.uid, player.admin]);
});