import { useState } from "react";
import rpc from 'rage-rpc';
import { close, menu, save } from './buttons';
import Profile from "./views/Profile.views";
import Statistics from "./views/Statistics.views";

type Props = {
    login: string,
    avatarUrl: string,
};

const Settings = () => {
    const [data, setData] = useState<Props>({
        login: '',
        avatarUrl: '',
    });

    const [active, setActive] = useState(0);

    rpc.register('CefSettings', (clientData: Props) => {
        setData({ ...data, login: clientData.login, avatarUrl: clientData.avatarUrl });
    });

    return (
        <div className="all_settings">
            <div className="nav_content">
                <button className="close" onClick={close}></button>
                <button className="main_menu" onClick={menu}></button>
                <button className="save" onClick={save}></button>

                <div className="player_nav">
                    <img className="playerImage" src={data.avatarUrl} alt="selfi" />
                    <div className="playerName">{data.login}</div>
                </div>
            </div>

            <div className='container_list'>
                <ul className="list">
                    <li className="item" onClick={() => setActive(1)}>Профиль</li>
                    <li className="item" onClick={() => setActive(2)}>Статистика</li>
                    <li className="item" onClick={() => setActive(3)}>Достижения</li>
                    <li className="item" onClick={() => setActive(4)}>Вопрос</li>
                    <li className="item" onClick={() => setActive(5)}>Настройки</li>
                </ul>
            </div>

            {active === 1 && <Profile />}
            {active === 2 && <Statistics />}
        </div>
    )
}

export default Settings;