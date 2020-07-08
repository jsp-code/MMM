var eventoObj = class {
    constructor() {
        this._onEvent = () => {};
        this._inicializar();
    }
    _inicializar = async function() {
        await new Promise(resolve => {
            this.gatilho = () => {
                resolve('deu certo');
                this._inicializar();
                return true;
            }
        });
        this._onEvent();
    }
    set onEvent(callBack) {
        this._onEvent = callBack;
    }
}
export{eventoObj};