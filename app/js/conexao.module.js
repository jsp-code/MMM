import {vec2} from './class/vec2.module.js';
import { eventoObj} from './class/eventoObj.module.js';
import { html_estruturas } from './estruturas/html_estruturas.module.js';

class conexao {
    constructor(bloco_1, bloco_2) {
        this._bloco_1 = bloco_1;
        this._bloco_2 = bloco_2;
        this._onClick = new eventoObj();
        this._html = html_estruturas.linha_conexao();
        this.inicializar();
    }
    get html(){
       return this._html;
    }
    set onClick(callBack){
        this._onClick.onEvent =callBack;
    }
    clicando(){
        this._onClick.gatilho();
    }
    _posGlobal = ()=>{
        var r1 = this._bloco_1.pos_centro;
        var r2 = this._bloco_2.pos_centro;
        var rl = vec2.somar(r1,r2).escala(0.5);
        return rl;
    }
    largura = ()=>{
        var r1 = this._bloco_1.pos_centro;
        var r2 = this._bloco_2.pos_centro;
        var largura = vec2.subtrair(r1,r2).comprimento();
        return largura;
    }
    posLocal = ()=>{
        var vec_larg = new vec2(this.largura(), 0);
        var p = vec2.subtrair(this._posGlobal(), vec_larg.escala(0.5));
        return p;
    }
    angulo = () =>{
        var r1 = this._bloco_1.pos_centro;
        var r2 = this._bloco_2.pos_centro;
        return -vec2.angulo_tg(r1,r2);
    }
    atualizar = ()=>{
        this._html.style.width = `${this.largura()}px`;
        this._html.style.marginLeft = `${this.posLocal().x}px`;
        this._html.style.marginTop = `${this.posLocal().y}px`;
        this._html.style.transform = `rotate(${this.angulo()}deg)`;
    }
    static JSON_export = (conrct) => {
        var exportado = {
            bloco_1: `${conrct._bloco_1.nome}`, bloco_2: `${conrct._bloco_2.nome}`
        };
        return exportado;
    };
    _inicializarMouse(){
        var h = this._html;
        h.controlador = this;
        h.onmouseover = function(){
            this.style.border ='solid #ff8800 3px';
        }
        h.onmouseout = function(){
            this.style.border ='solid #c80000 1px'
        }
        h.onclick = function(){
            h.controlador.clicando();
        }
    }
    inicializar(){
        this._inicializarMouse(); 
        this.atualizar();
    }
}
export {conexao};