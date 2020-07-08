import {vec2} from './class/vec2.module.js';
import { eventoObj} from './class/eventoObj.module.js';
import { html_estruturas} from './estruturas/html_estruturas.module.js';
var esc_global = 1;
var estruturas  = html_estruturas;
var bloco = class {

    static bloco_texto = class {

        constructor(nome = 'bloco') {
            this._nome = nome;
            this._tipo = 'texto';
            this._titulo = 'Título';
            this._texto = '';
            this._pos = new vec2(0, 0);
            this._text_esc = new vec2(200, 40);
            this._corFundo = '#3888ff';
            this._corFonte = '#000000';
            this._fonteTitulo = 'FiraSansBlack';
            this._fonteTexto = 'FiraSans';
            this._selecionar = false;
            this._onMove = new eventoObj();
            this._onSelecionado = new eventoObj();
            this._html = estruturas.bloco_texto_html();
            this.inicializarHTML();
        }
        get html() {
            return this._html;
        }
        set nome(novo_nome) {
            this._nome = novo_nome;
            this._html.id = novo_nome;
        }
        get nome() {
            return this._nome;
        }
        get tipo() {
            return this._tipo;
        }
        set titulo(novo_titulo) {
            this._html.querySelector('.titulo').value = novo_titulo;
            this._titulo = novo_titulo;
        }
        get titulo() {
            return this._titulo;
        }
        set texto(novo_texto) {
            this._html.querySelector('.texto').value = novo_texto;
            this._texto = novo_texto;
        }
        get texto() {
            return this._texto;
        }
        set pos(vec) {
            this._pos = vec;
            this._html.style.marginLeft = vec.x + 'px';
            this._html.style.marginTop = vec.y + 'px';
        }
        get pos() {
            return this._pos;
        }
        set text_esc(vec) {
            this._text_esc = vec;
            this._html.querySelector('.texto').style.width = vec.x + 'px';
            this._html.querySelector('.texto').style.height = vec.y + 'px';
        }
        get text_esc() {
            return this._text_esc;
        }
        set corFundo(cor = '#00000000') {
            var estilo = this.html.style;

            this._corFundo = cor;
            estilo.backgroundColor = cor;
        }
        get corFundo() {
            return this._corFundo;
        }
        set corFonte(cor = '') {
            var estilo = this.html.querySelector('.titulo').style;
            this._corFonte = cor;
            estilo.color = cor;
        }
        get corFonte() {
            return this._corFonte;
        }
        set fonteTitulo(fonte = 'arial') {
            var estilo = this.html.querySelector('.titulo').style;
            this._fonteTitulo = fonte;
            estilo.fontFamily = fonte;
        }
        get fonteTitulo() {
            return this._fonteTitulo;
        }
        set fonteTexto(fonte) {
            var estilo = this.html.querySelector('.texto').style;
            this._fonteTexto = fonte;
            estilo.fontFamily = fonte;
        }
        get fonteTexto() {
            return this._fonteTexto;
        }
        set selecionar(estado = false) {

            var estilo = this._html.style
            this._selecionar = estado;
            if (estado == true) {
                estilo.border = `3px #ffaa00 solid`;
            } else {
                estilo.border = `none`;
            }
        }
        get selecionar() {
            return this._selecionar;
        }
        set onSelecionado(callback) {
            this._onSelecionado = callback;
        }
        selecionado() {
            this._onSelecionado.gatilho();
        }
        set onMove(callback) {
            this._onMove.onEvent = callback;
        }
        movendo() {
            this._onMove.gatilho();
        }
        _getEsc() {
            var x = this._html.offsetWidth;
            var y = this._html.offsetHeight;
            return new vec2(x, y);
        }
        getEscGlobal() {
            return esc_global;
        }
        get pos_centro() {
            var centro = vec2.somar(this.pos, this._getEsc().escala(0.5));
            return centro;
        };
        setEscalaHtml() {
            var htmlT = this.html.querySelector('.texto');
            var escala_x = htmlT.clientWidth;
            var escala_y = htmlT.clientHeight;
            var newEsc = new vec2(escala_x, escala_y);
            var teste = vec2.subtrair(this.text_esc,newEsc).comprimento() >10;
            if(teste){
                this.text_esc = newEsc;
            }
        }
        static JSON_export(newBloco) {
            var exportado = {
                nome: newBloco.nome,
                tipo: newBloco.tipo,
                titulo: newBloco.titulo,
                texto: newBloco.texto,
                pos: vec2.JSON_export(newBloco.pos),
                text_esc: vec2.JSON_export(newBloco.text_esc),
                corFundo: newBloco.corFundo,
                corFonte: newBloco.corFonte,
                fonteTitulo: newBloco.fonteTitulo,
                fonteTexto: newBloco.fonteTexto
            }
            return exportado;
        };
        static JSON_import(objJSON) {
            let importado = new bloco.bloco_texto();
            importado.nome = objJSON.nome;
            importado.titulo = objJSON.titulo;
            importado.texto = objJSON.texto;
            importado.pos = vec2.JSON_import(objJSON.pos);
            importado.text_esc = vec2.JSON_import(objJSON.text_esc);
            importado.corFundo = objJSON.corFundo;
            importado.corFonte = objJSON.corFonte;
            importado.fonteTitulo = objJSON.fonteTitulo;
            importado.fonteTexto = objJSON.fonteTexto;
            return importado;
        };
        _inicializarVariaveis() {
            let h = this._html;
            h.id = this._nome;
            h.style.backgroundColor = this._corFundo;
            h.controlador = this;
            h.dragClickStart = this.pos;
            h.dragClickDelta = new vec2(0, 0);
            h.dragClickEnd = new vec2(0, 0);
        }
        _inicializarClicks() {
            var h = this._html;
            h.onclick = function() {
                var controlador = this.controlador;
                if (this == event.target) {
                    controlador.selecionar = !controlador.selecionar;
                    if (controlador.selecionar == true) {
                        controlador.selecionado()
                    } else {

                    }
                }
            }
            h.onmouseup = function() {
                var controlador = this.controlador;
                let blcTexto = this.querySelector('.texto');
                if (blcTexto == event.target) {
                    controlador.setEscalaHtml();
                    controlador.movendo();
                }
            }
        }
        _inicializarDrang() {
            let h = this._html;
            h.ondragstart = function() {
                let esc = this.controlador.getEscGlobal();
                let clc_x = event.clientX * esc;
                let clc_y = event.clientY * esc;
                let x = this.controlador.pos.x;
                let y = this.controlador.pos.y;
                this.dragClickDelta = new vec2(x - clc_x, y - clc_y)
                this.controlador.movendo();
            }
            h.ondrag = function() {
                (() => {
                    let esc = this.controlador.getEscGlobal();
                    let clc_x = event.clientX * esc;
                    let clc_y = event.clientY * esc;
                    let vecClick = new vec2(clc_x, clc_y);
                    let delt = this.dragClickDelta;
                    let newPos = vec2.somar(vecClick, delt);
                    this.controlador.pos = newPos;
                    this.controlador.movendo();
                })()
            }
            h.ondragend = function() {
                (() => {
                    let esc = this.controlador.getEscGlobal();
                    let clc_x = event.clientX * esc;
                    let clc_y = event.clientY * esc;
                    let vecClick = new vec2(clc_x, clc_y);
                    let delt = this.dragClickDelta;
                    let newPos = vec2.somar(vecClick, delt);
                    this.controlador.pos = newPos;
                    this.controlador.movendo();
                })()
            }
        }
        _iniciarOnInputTitulo() {
            let h = this._html.querySelector('.titulo');
            h.oninput = function() {
                this.parentNode.controlador.titulo = h.value;
            }
        }
        _iniciarOnInputTexto() {
            let h = this._html.querySelector('.texto');
            h.oninput = function() {
                this.parentNode.controlador.texto = h.value;
            }
        }
        _inicializarBloco(){
            this.fonteTitulo = 'FiraSansBlack';
            this.fonteTexto = 'FiraSans';
        }
        inicializarHTML = () => {
            this._inicializarVariaveis();
            this._inicializarClicks();
            this._inicializarDrang();
            this._iniciarOnInputTitulo();
            this._iniciarOnInputTexto();
            this._inicializarBloco();
        }
    }

    static bloco_tema = class {
        constructor(nome = 'bloco') {
            this._nome = nome;
            this._tipo = 'tema';
            this._titulo = 'Título';
            this._pos = new vec2(0, 0);
            this._corFundo = '#88ff38';
            this._corFonte = '#000000';
            this._fonteTitulo = 'FiraSansBlack';
            this._selecionar = false;
            this._onMove = new eventoObj();
            this._onSelecionado = new eventoObj();
            this._html = estruturas.bloco_titulo_html();
            this._html.id = this._nome;
            this.inicializarHTML();
        }
        get html() {
            return this._html;
        }
        set nome(novo_nome) {
            this._nome = novo_nome;
            this._html.id = novo_nome;
        }
        get nome() {
            return this._nome;
        }
        get tipo() {
            return this._tipo;
        }
        set titulo(novo_titulo) {
            this._html.querySelector('.titulo').value = novo_titulo;
            this._titulo = novo_titulo;
        }
        get titulo() {
            return this._titulo;
        }
        set pos(vec) {
            this._pos = vec;
            this._html.style.marginLeft = vec.x + 'px';
            this._html.style.marginTop = vec.y + 'px';
        }
        get pos() {
            return this._pos;
        }
        set corFundo(cor = '#00000000') {
            var estilo = this.html.style;

            this._corFundo = cor;
            estilo.backgroundColor = cor;
        }
        get corFundo() {
            return this._corFundo;
        }
        set corFonte(cor = '') {
            var estilo = this.html.querySelector('.titulo').style;
            this._corFonte = cor;
            estilo.cor = cor;
        }
        get corFonte() {
            return this._corFonte;
        }
        set fonteTitulo(fonte = 'arial') {
            var estilo = this.html.querySelector('.titulo').style;
            this._fonteTitulo = fonte;
            estilo.fontFamily = fonte;
        }
        get fonteTitulo() {
            return this._fonteTitulo;
        }
        set selecionar(estado = false) {
            var estilo = this._html.style
            this._selecionar = estado;
            if (estado == true) {
                estilo.border = `3px #ffaa00 solid`;
            } else {
                estilo.border = `none`;
            }
        }
        set onSelecionado(callback) {
            this._onSelecionado = callback;
        }
        selecionado() {
            this._onSelecionado.gatilho();
        }
        set onMove(callback) {
            this._onMove.onEvent = callback;
        }
        movendo() {
            this._onMove.gatilho();
        }
        get selecionar() {
            return this._selecionar;
        }
        _getEsc() {
            var x = this._html.offsetWidth;
            var y = this._html.offsetHeight;
            return new vec2(x, y);
        }
        getEscGlobal() {
            return esc_global;
        }
        get pos_centro() {
            var centro = vec2.somar(this.pos, this._getEsc().escala(0.5));
            return centro;
        };
        static JSON_export(newBloco) {
            var exportado = {
                nome: newBloco.nome,
                tipo: newBloco.tipo,
                titulo: newBloco.titulo,
                pos: vec2.JSON_export(newBloco.pos),
                corFundo: newBloco.corFundo,
                corFonte: newBloco.corFonte,
                fonteTitulo: newBloco.fonteTitulo,
            }
            return exportado;
        };
        static JSON_import(objJSON) {
            var importado = new bloco.bloco_tema();
            importado.nome = objJSON.nome;
            importado.titulo = objJSON.titulo;
            importado.pos = vec2.JSON_import(objJSON.pos);
            importado.corFundo = objJSON.corFundo;
            importado.corFonte = objJSON.corFonte;
            importado.fonteTitulo = objJSON.fonteTitulo;
            return importado;
        };
        _inicializarVariaveis() {
            let h = this._html;
            h.id = this._nome;
            h.style.backgroundColor = this._corFundo;
            h.controlador = this;
            h.dragClickStart = this.pos;
            h.dragClickDelta = new vec2(0, 0);
            h.dragClickEnd = new vec2(0, 0);
        }
        _inicializarClicks() {
            var h = this._html;
            h.onclick = function() {
                var controlador = this.controlador;
                if (this == event.target) {
                    controlador.selecionar = !controlador.selecionar;
                    if (controlador.selecionar == true) {
                        controlador.selecionado()
                    } else {

                    }
                }
            }
        }
        _inicializarDrang() {
            let h = this._html;
            h.ondragstart = function() {
                let esc = this.controlador.getEscGlobal();
                let clc_x = event.clientX * esc;
                let clc_y = event.clientY * esc;
                let x = this.controlador.pos.x;
                let y = this.controlador.pos.y;
                this.dragClickDelta = new vec2(x - clc_x, y - clc_y)
                this.controlador.movendo();
            }
            h.ondrag = function() {
                (() => {
                    let esc = this.controlador.getEscGlobal();
                    let clc_x = event.clientX*esc;
                    let clc_y = event.clientY*esc;
                    let vecClick = new vec2(clc_x, clc_y);
                    let delt = this.dragClickDelta;
                    let newPos = vec2.somar(vecClick, delt);
                    this.controlador.pos = newPos;
                    this.controlador.movendo();
                })()
            }
            h.ondragend = function() {
                (() => {
                    let esc = this.controlador.getEscGlobal();
                    let clc_x = event.clientX*esc;
                    let clc_y = event.clientY*esc;
                    let vecClick = new vec2(clc_x, clc_y);
                    let delt = this.dragClickDelta;
                    let newPos = vec2.somar(vecClick, delt);
                    this.controlador.pos = newPos;
                    this.controlador.movendo();
                })()
            }
        }
        _iniciarOnInputTitulo() {
            let h = this._html.querySelector('.titulo');
            h.oninput = function() {
                this.parentNode.controlador.titulo = h.value;
            }
        }
        _inicializarBloco(){
            this.fonteTitulo = 'FiraSansBlack';
        }
        inicializarHTML = () => {
            this._inicializarVariaveis();
            this._inicializarClicks();
            this._inicializarDrang();
            this._iniciarOnInputTitulo();
            this._inicializarBloco();
        }
    }
    static set escala(value = 1) {
        esc_global = 1 / value;
    }
    static get escala() {
        return esc_global;
    }
}
export {bloco};