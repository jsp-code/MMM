import {vec2} from './class/vec2.module.js';
import {conexao} from './conexao.module.js';
import {bloco} from './bloco.module.js';

var camada = class {
    constructor() {
        this._blocos = [];
        this._conexoes = []
        this.zoon = 1;
    }
    _setNomes() {
        var blocoIndex = this._blocos.length;
        var allBlocos = this._blocos;
        for (let index = 0; index < blocoIndex.length; index++) {
            allBlocos[index].nome = index;
            allBlocos[index].html.id = index;
        }
    }
    _descelecionar() {
        var allBlocos = this._blocos;
        allBlocos.forEach((ele) => {
            ele.selecionar = false;
        })
    }
    set zoon(val) {
        var fundo = document.querySelector('#fundo');
        var tela = document.querySelector('#tela');
        let larg_inicial = 2000;
        let larg_atual = 2000 * val;
        var tela_sX = larg_atual - tela.offsetWidth;
        var tela_sY = larg_atual - tela.offsetHeight;
        if (val > 0.4 && val < 1.3) {

            fundo.style.transform = `scale(${val})`;
            fundo.style.marginLeft = -(larg_inicial - larg_atual) / 2 + 'px';
            fundo.style.marginTop = -(larg_inicial - larg_atual) / 2 + 'px';
            tela.scroll(tela_sX / 2, tela_sY / 2);

            this._zoon = val;
            bloco.escala = val;
        }
    }
    get zoon() {
        return this._zoon;
    }
    addBloco = (tipo, posInicial) => {
        if (tipo == 'tema') {
            let newBloco = new bloco.bloco_tema();
            let blocoIndex = this._blocos.length;
            let allBlocos = this._blocos;
            let html = document.querySelector('.objetos');

            newBloco.nome = blocoIndex
            newBloco.pos = posInicial;
            newBloco.onMove = () => { this.atualizarConexoes() };
            html.appendChild(newBloco.html);
            allBlocos[blocoIndex] = newBloco;
        } else if (tipo == 'texto') {
            let newBloco = new bloco.bloco_texto();
            let blocoIndex = this._blocos.length;
            let allBlocos = this._blocos;
            let html = document.querySelector('.objetos');

            newBloco.nome = blocoIndex
            newBloco.pos = posInicial;
            newBloco.onMove = () => { this.atualizarConexoes() };
            html.appendChild(newBloco.html);
            allBlocos[blocoIndex] = newBloco;
        }
    }
    importBloco(newBloco){
        if (newBloco.tipo == 'tema') {
            let blocoIndex = this._blocos.length;
            let allBlocos = this._blocos;
            let html = document.querySelector('.objetos');
            newBloco.nome = blocoIndex
            newBloco.onMove = () => { this.atualizarConexoes() };
            html.appendChild(newBloco.html);
            allBlocos[blocoIndex] = newBloco;
        } else if (newBloco.tipo == 'texto') {
            let blocoIndex = this._blocos.length;
            let allBlocos = this._blocos;
            let html = document.querySelector('.objetos');
            newBloco.nome = blocoIndex
            newBloco.onMove = () => { this.atualizarConexoes() };
            html.appendChild(newBloco.html);
            allBlocos[blocoIndex] = newBloco;
        }
    }
    _deletarBloco(blocoIndex) {
        var allBlocos = this._blocos;
        allBlocos[blocoIndex].html.parentNode.removeChild(allBlocos[blocoIndex].html);
        allBlocos.splice(blocoIndex, 1);
    }
    deletarBlocosSelecionados() {
        var blocoIndex = this._blocos.length;
        var allBlocos = this._blocos;
        for (let index = 0; index < blocoIndex; index++) {
            if (allBlocos[index].selecionar == true) {
                this.deletarConexaoBloco(allBlocos[index]);
                this._deletarBloco(index);
                index--;
                blocoIndex--;
            }
        }
        this._setNomes();
        this._descelecionar();
    }
    _addConexao(ob1, ob2) {
        var h = document.querySelector('.objetos');
        var allConexoes = this._conexoes;
        var conectar = new conexao(ob1, ob2);
        conectar.onClick = () => { this.deletarConexao(conectar) }
        h.insertAdjacentElement('afterbegin', conectar._html)
        allConexoes[allConexoes.length] = conectar;
    }
    atualizarConexoes() {
        var allConexoes = this._conexoes;
        allConexoes.forEach((elemento) => {
            elemento.atualizar();
        });
    }
    deletarConexao(conexao){
        var allConexoes = this._conexoes;
        var index = allConexoes.indexOf(conexao);
        var conect = allConexoes[index];
        conect.html.parentNode.removeChild(conect.html)
        allConexoes.splice(index, 1);
    }
    deletarConexaoBloco(blocoConexao) {
        var allConexoes = this._conexoes;
        var numeroDeElementos = allConexoes.length;
        for (let index2 = 0; index2 < numeroDeElementos; index2++) {
            let conct = allConexoes[index2];
            if ((conct._bloco_1.nome == blocoConexao.nome) || (conct._bloco_2.nome == blocoConexao.nome)) {
                conct.html.parentNode.removeChild(conct.html)
                allConexoes.splice(index2, 1);
                index2--;
                numeroDeElementos--;
            }
        }
    }
    _selecionadosConectar() {
        var select_1 = null;
        var select_2 = null;
        var allBlocos = this._blocos;
        var NunBlocos = this._blocos.length;
        var contador = 0;
        for (let index = 0; index < NunBlocos; index++) {
            if (allBlocos[index].selecionar == true) {
                if (contador == 0) {
                    select_1 = allBlocos[index];
                    contador++;
                } else if (contador == 1) {
                    select_2 = allBlocos[index];
                    contador++;
                } else {
                    index += NunBlocos;
                    contador += NunBlocos;
                }
            }
        }
        if (contador >= 3) {
            return null;
        } else {
            return [select_1, select_2];
        }
    }
    _verificarConexaoExiste(ob1, ob2) {
        var verificar = false;
        var allConexoes = this._conexoes;
        var NunConexoes = this._conexoes.length;
        for (let index_1 = 0; index_1 < NunConexoes; index_1++) {
            if (verificar != true) {
                var aux = allConexoes[index_1];
                let cond1 = (aux._bloco_1 == ob1);
                let cond2 = (aux._bloco_2 == ob2);
                let cond3 = (aux._bloco_1 == ob2);
                let cond4 = (aux._bloco_2 == ob1);
                verificar = cond1 && cond2 || cond3 && cond4;
            }
        }
        return verificar;
    }
    addConexaoBlocosSelecionados() {
        var selecionados = this._selecionadosConectar();
        if (selecionados!=null) {
            let existe = this._verificarConexaoExiste(selecionados[0],selecionados[1]);
            if (!existe) {
                this._addConexao(selecionados[0],selecionados[1]);                
            } else {
                alert('Esses elementos já estão conectados');
            }
        }
    }
    JSON_export() {
        this._setNomes();
        var bloc = [];
        var cone = [];
        var exportado = {};
        this._blocos.forEach((elemento, id) => {
            if (elemento.tipo == 'tema') {
                bloc[id] = bloco.bloco_tema.JSON_export(elemento);
            } else if(elemento.tipo == 'texto'){
                bloc[id] = bloco.bloco_texto.JSON_export(elemento);
            }
           
        })
        this._conexoes.forEach((elemento, id) => {
            cone[id] = conexao.JSON_export(elemento);
        })

        exportado.blocos = bloc;
        exportado.conexoes = cone;

        return exportado;
    }
    JSON_import() {

    }
}
export {camada};
