mp.events.add({
  changeToMale: () => {
    mp.players.local.model = mp.game.joaat('mp_m_freemode_01');
  },

  changeToFemale: () => {
    mp.players.local.model = mp.game.joaat('mp_f_freemode_01');
  }
})
