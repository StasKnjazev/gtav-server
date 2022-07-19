import React from 'react';
import onAccount from './scripts/login/onLoginAccount';

const Login = ({setThisPage}: any) => {
    const [inputLogin, setInputLogin] = React.useState(''),
        [inputPassword, setInputPassword] = React.useState('');

    return (
        <div className='login'>
            <div className='content'>
                <h2 className='title'>Добро пожаловать</h2>
                <p className='description'>Войдите в свой аккаунт, или же зарегистрируйте новый.</p>

                <input
                    className='logIn'
                    min='4'
                    max='32'
                    type='text'
                    value={inputLogin}
                    onChange={(e) => setInputLogin(e.target.value)}
                    placeholder='Логин'
                />

                <input
                    className='pass'
                    type='password'
                    min='6'
                    max='32'
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    placeholder='Пароль'
                />

                <button className='enterBtn' onClick={() => onAccount(inputLogin, inputPassword)}>Войти</button>
                <button className='registerBtn' onClick={() => setThisPage('reg')}>Зарегистрироваться</button>
            </div>
        </div>
    )
}

export default Login;