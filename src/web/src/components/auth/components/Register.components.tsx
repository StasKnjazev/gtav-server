import React from 'react';
import { Link } from 'react-router-dom';

const Register = ({ setThisPage }: any) => {
    const [email, setEmail] = React.useState(''),
        [login, setLogin] = React.useState(''),
        [password, setPassword] = React.useState(''),
        [rpassword, setRPassword] = React.useState('');

    const onRegAccount = (
        email: string,
        login: string,
        password: string,
        rpassword: string
    ) => {
        const regExpMail =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regExpMail.test(email)) return console.log("Почта не валидна");
        if (email === "" || login === "" || password === "" || rpassword === "")
            return console.log("Введены не все данные");
        if (login.length < 4) return console.log("Логин слишком короткий");
        if (password.length < 6) return console.log("Пароль слишком короткий");
        if (password !== rpassword) return console.log("Пароли не совпадают");

        console.log(email, login, password, rpassword);
        // @ts-ignore
        if (window.mp) {
            // @ts-ignore
            window.mp.trigger("callRegAccount", email, login, password, rpassword);
        }
    };


    return (
        <div className='register'>
            <div className='content'>
                <p className='description'>Если вы хотите зарегистрировать новый аккаунт, заполните форму предложенную ниже.</p>

                <input
                    className='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Укажите E-mail'
                />

                <input
                    className='logIn'
                    type='text'
                    min='4'
                    max='32'
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder='Укажите логин'
                />

                <input
                    className='password'
                    type='password'
                    min='6'
                    max='32'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Укажите пароль'
                />

                <input
                    className='password'
                    type='password'
                    min='6'
                    max='32'
                    value={rpassword}
                    onChange={(e) => setRPassword(e.target.value)}
                    placeholder='Укажите пароль повторно'
                />

                <button className='enterReg' onClick={() => onRegAccount(email, login, password, rpassword)}>
                    <Link to='/character'>Продолжить</Link>
                </button>
                <button className='enterLog' onClick={() => setThisPage('login')}>Войти в аккаунт</button>
            </div>
        </div>
    )
}

export default Register;