import React from 'react';

const List = ({ setThisPage }: any) => {
    return (
        <div className='container_list'>
            <ul className='list'>
                <li className='item' onClick={() => setThisPage('profile')}>Профиль</li>
                <li className='item' onClick={() => setThisPage('statistics')}>Статистика</li>
                <li className='item' onClick={() => setThisPage('achievements')}>Достижения</li>
                <li className='item' onClick={() => setThisPage('question')}>Вопрос</li>
                <li className='item' onClick={() => setThisPage('settings')}>Настройки</li>
            </ul>
        </div>
    )
}

export default List;