class localHud {
    public get localCursor(): boolean {
        return mp.gui.cursor.visible
    }

    public set localCursor(toggle: boolean) {
        mp.gui.cursor.show(toggle, toggle)
    }

    public toggleLocalCursor() {
        this.localCursor = !this.localCursor
    }
    
    public enabledHud = true

    public get isEnabledHud() {
        return this.enabledHud
    }

    public setEnabledHud(toggle: boolean) {
        this.enabledHud = toggle
        mp.gui.chat.show(toggle)
        mp.game.ui.displayHud(toggle)
        mp.game.ui.displayAreaName(toggle)
        mp.game.ui.displayRadar(toggle)
    }
}

export default new localHud()