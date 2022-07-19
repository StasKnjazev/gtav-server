mp.events.add('callRegAccount', (email, login, password, rpassword) => {
    mp.events.callRemote('authRegister', email, login, password, rpassword);
});