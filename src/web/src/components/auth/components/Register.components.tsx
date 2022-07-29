import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Register = ({ setThisPage }: any) => {
    const [email, setEmail] = useState(''),
        [login, setLogin] = useState(''),
        [password, setPassword] = useState(''),
        [rpassword, setRPassword] = useState('');

    const navigate = useNavigate();

    const onRegAccount = (email: string, login: string, password: string, rpassword: string) => {
        const regExpMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regExpMail.test(email)) return console.log("Почта не валидна");
        if (email === "" || login === "" || password === "" || rpassword === "") return console.log("Введены не все данные");
        if (login.length < 4) return console.log("Логин слишком короткий");
        if (password.length < 6) return console.log("Пароль слишком короткий");
        if (password !== rpassword) return console.log("Пароли не совпадают");

        console.log(email, login, password);
        navigate('/character', { replace: true, state: { ue: email, ul: login, up: password } });
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
                    Продолжить
                </button>
                <button className='enterLog' onClick={() => setThisPage('login')}>Войти в аккаунт</button>
            </div>
        </div>
    )
}

export default Register;