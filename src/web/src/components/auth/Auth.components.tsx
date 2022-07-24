import React from 'react';
import Login from './components/Login.components';
import Register from './components/Register.components';

const Authorziation: React.FC = () => {
    const [page, setPage] = React.useState('login')

    return (
        <div className='auth'>
            <nav className='nav'>
                <button className='close' onClick={() => console.log('true')}></button>
                <button className='rollup' onClick={() => console.log('true2')}></button>
                <button className='expand' onClick={() => console.log('true3')}></button>
            </nav>

            {page === 'login' && <Login setThisPage={setPage} />}
            {page === 'reg' && <Register setThisPage={setPage} />}
        </div>
    )
}

export default Authorziation;