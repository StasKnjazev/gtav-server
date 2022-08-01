import { useState, memo } from 'react';
import rpc from 'rage-rpc';

type Props = {
    uid: number,
    isAdmin: boolean,
    online: number,
};

const Hud = () => {
    const [data, setData] = useState<Props>({
        uid: 0,
        isAdmin: false,
        online: 0,
    });

    rpc.register('hudSetData', (hudData: Props) => {
        setData({ ...data, uid: hudData.uid, isAdmin: hudData.isAdmin, online: hudData.online });
    });

    return (
        <div className='hud'>
            <div className='top_right'>
                <span className='logo'>Project X</span>
                <span className='online'>Online: {data.online | 0} / 1000</span>
                <span className='uid'># {data.uid | 0}</span>

                {/* {data.isAdmin === true && (
                    <span className='reports_value'>
                        Репортов: 0
                    </span>
                )} */}
            </div>
        </div>
    )
}

export default memo(Hud);