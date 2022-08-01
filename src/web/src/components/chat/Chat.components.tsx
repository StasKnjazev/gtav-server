import { useState, useEffect, memo } from "react";

const Chat = () => {
    const [data, setData] = useState({
        active: false,
        showMenu: false
    });

    useEffect(() => {
        (window as any).chatAPI = {
            show: (toggle: boolean) => {
                setData({...data, active: toggle});
            },

            activate: (toggle: boolean) => {
                if (!toggle && data.showMenu) {
                    setData({ ...data, showMenu: !data.showMenu });
                    // @ts-ignore
                    (mp as any).invoke('focus', data.showMenu);
                    if (data.showMenu) {
                        setTimeout(() => {
                            
                        }, 10);
                    }
                }
            }
        }
    }, [])

    return (
        <div className={!data.active ? 'active' : 'chat'}>
            
        </div>  
    )
}

export default memo(Chat);