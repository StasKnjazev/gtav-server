import { useState } from "react";
import rpc from 'rage-rpc';

type Props = {
    firstName: string,
    lastName: string,
    avatarUrl: string,
};

const Settings = () => {
    const [data, setData] = useState<Props>({
        firstName: '',
        lastName: '',
        avatarUrl: ''
    });

    rpc.register('CefSettings', (clientData: Props) => {
        setData({ ...data, firstName: clientData.firstName, lastName: clientData.lastName, avatarUrl: clientData.avatarUrl });
    });

    return (
        <div className="all_settings">
            <div className="nav_content">
                <button className="close"></button>
                <button className="main_menu"></button>
                <button className="save"></button>

                <div className="player_nav">
                    <img className="playerImage" src={data.avatarUrl} alt="selfi" />
                    <div className="playerName">{data.firstName + ' ' + data.lastName}</div>
                </div>
            </div>

            {/* [24.07.2022] Coming soon more... */}
        </div>
    )
}

export default Settings;