// @ts-ignore
const eventManager = window.EventManager || {
    events: {},

    add: function (name: string, handler: any) {
        this.events[name] = handler;
    },

    call: function (name: string, type: string, data: any) {
        if (name in this.events) {
            this.events[name]({
                type: type, data: data
            });
        } else {
            console.log(name + 'not found!');
        }
    },

    remove: function (name: string) {
        if (name in this.events) {
            this.events[name] = null;
            delete this.events[name];
        }
    },

    trigger: function (target: string, name: string, ...args: any) {
        // @ts-ignore
        mp.trigger(target, name, JSON.stringify(...args));
        console.log(`emitted: server::${target}:${name}\n`, ...args);
    }
}

// @ts-ignore
window.EventManager = eventManager;
export default eventManager;