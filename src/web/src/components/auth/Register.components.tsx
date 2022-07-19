import React from 'react';
import { onRegAccount } from './scripts/register/onRegAccount';

const Register = ({ setThisPage }: any) => {
    const [email, setEmail] = React.useState(''),
        [login, setLogin] = React.useState(''),
        [password, setPassword] = React.useState(''),
        [rpassword, setRPassword] = React.useState('');

    return (
        <div className='register'>
            <div className='content'>
                <p className='description'>Если вы хотите зарегистрировать новый аккаунт, заполните форму предложенную ниже.</p>

                <input
                    className='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Введите E-mail'
                />

                <input
                    className='logIn'
                    type='text'
                    min='4'
                    max='32'
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder='Введите логин'
                />

                <input
                    className='password'
                    type='password'
                    min='6'
                    max='32'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Введите пароль'
                />

                <input
                    className='password'
                    type='password'
                    min='6'
                    max='32'
                    value={rpassword}
                    onChange={(e) => setRPassword(e.target.value)}
                    placeholder='Введите пароль повторно'
                />

                <button className='enterReg' onClick={() => onRegAccount(email, login, password, rpassword)}>Продолжить</button>
                <button className='enterLog' onClick={() => setThisPage('login')}>Войти в аккаунт</button>
            </div>
        </div>
    )
}

export default Register;