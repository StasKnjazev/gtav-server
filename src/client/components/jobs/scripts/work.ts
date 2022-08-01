function startWork() {
  mp.events.callRemote("playerStartWorkOnCollectors");

  setTimeout(() => {
    mp.keys.unbind(key.E, true, startWork);
  }, 100);
}

function stopWork() {
  mp.events.callRemote("playerStopWorkOnCollector");

  setTimeout(() => {
    mp.keys.unbind(key.E, true, stopWork);
  }, 100);
}

export default { 
    startWork,
    stopWork,
}