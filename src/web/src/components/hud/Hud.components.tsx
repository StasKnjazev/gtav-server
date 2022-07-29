import { useState } from 'react';
import rpc from 'rage-rpc';

type Props = {
    online: string,
    isAdmin: boolean,
};

const Hud = () => {
    const [data, setData] = useState<Props>({
        online: '',
        isAdmin: false,
    });

    // rpc.register('updateOnline', (inputOnline) => {
    //     setData({ ...data, online: inputOnline });
    // });

    // rpc.register('userIsAdmin', (status) => {
    //     setData({ ...data, isAdmin: status });
    // });

    return (
        <div className="hud">
            <div className="logo">Project X</div>
        </div>
    )
}

export default Hud;