import { useState } from "react";
import rpc from 'rage-rpc';
import { close, menu, save } from './scripts/buttons';
import List from "./views/List.views";
import Profile from './views/Profile.views';

type Props = {
    login: string,
    avatarUrl: string,
    admin: boolean,
    adminName: string,
};

const Settings = () => {
    const [data, setData] = useState<Props>({
        login: 'S8k1',
        avatarUrl: 'https://a.rsg.sc/n/balbaskin',
        admin: false,
        adminName: 'Ciklop'
    });

    const [page, setPage] = useState('profile');

    rpc.register('CefSettings', (clientData: Props) => {
        setData({ ...data, login: clientData.login, avatarUrl: clientData.avatarUrl });
    });

    return (
        <div className="all_settings">
            <div className="nav_content">
                <button className="close" onClick={close}></button>
                <button className="main_menu" onClick={menu}></button>
                <button className="save" onClick={save}></button>

                {!data.admin && (
                    <div className="player_nav">
                        <img className="playerImage" src={data.avatarUrl} alt="selfi" />
                        <div className="playerName">{data.login}</div>
                    </div>
                )};

                {data.admin && (
                    <div className="player_nav">
                        <img className="playerImage" src={data.avatarUrl} alt="selfi" />
                        <div className="playerName">{data.adminName}</div>
                    </div>
                )};
            </div>

            <List />
            {page === 'profile' && <Profile setThisPage={setPage} />}
        </div>
    )
}

export default Settings;