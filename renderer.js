import {vec2} from './app/js/class/vec2.module.js';
import {conexao} from './app/js/conexao.module.js';
import {bloco} from './app/js/bloco.module.js';
import {camada} from './app/js/camada.js'

var fs = require('fs');
var {ipcRenderer}= require('electron');
window.arquivo_atual =null;
var controle = new camada();


document.querySelector('#novo').onclick = function(){
    document.querySelector('.objetos').innerHTML = "";
    controle = new camada();
}
document.querySelector('#salvar').onclick = function(){
    ipcRenderer.send('salve',JSON.stringify(controle.JSON_export()));
}
document.querySelector('#abrir').onclick = function(){
    ipcRenderer.send('load_file',null);
}
ipcRenderer.on('fileData',(event,data)=>{
    carregar(data);
})
ipcRenderer.on('file_endereco',(event,data)=>{
    window.arquivo_atual = data;
})

const carregar = function(file_name) {
    fs.readFile(file_name, 'utf-8', function(err, data) {
        if (err) throw err;
        document.querySelector('.objetos').innerHTML = "";
        var load = JSON.parse(data)
        var blocos = load.blocos;
        var conexoes = load.conexoes;
        var app_load = new camada();

        blocos.forEach((element, id, arr) => {
            if (element.tipo == 'tema') {
                var newBloco = bloco.bloco_tema.JSON_import(element);
                app_load.importBloco(newBloco);
            } else {
                var newBloco =  bloco.bloco_texto.JSON_import(element);
                app_load.importBloco(newBloco);
            }
        });

        conexoes.forEach((element, id, arr) => {
            var obj1 = app_load._blocos[element.bloco_1];
            var obj2 = app_load._blocos[element.bloco_2];
            app_load._addConexao(obj1,obj2);
        });
        app_load._setNomes();
        controle = app_load;
    });
};

document.querySelector('#molde_null').addEventListener("click", function() {
    document.querySelector('#fundo').onclick = function() {
        if (this == event.target) {
            controle._descelecionar();
        }

    }
});

document.querySelector('#molde_bloco_tema').addEventListener("click", function() {
    document.querySelector('#fundo').onclick = function() {
        if (this == event.target) {
            var scrX = document.querySelector('#tela').scrollLeft;
            var scrY = document.querySelector('#tela').scrollTop;
            var escala = bloco.escala;
            var desloca_x = document.querySelector('#fundo').offsetLeft;
            var desloca_y = document.querySelector('#fundo').offsetTop;
            var x = (event.clientX - 1000 + scrX - desloca_x) * escala;
            var y = (event.clientY - 1000 + scrY - desloca_y) * escala
            var posInicial = new vec2(x, y);
            controle.addBloco('tema', posInicial);
        }
    }
});

document.querySelector('#molde_bloco_texto').addEventListener("click", function() {
    document.querySelector('#fundo').onclick = function() {
        if (this == event.target) {
            var scrX = document.querySelector('#tela').scrollLeft;
            var scrY = document.querySelector('#tela').scrollTop;
            var escala = bloco.escala;
            var desloca_x = document.querySelector('#fundo').offsetLeft;
            var desloca_y = document.querySelector('#fundo').offsetTop;
            var x = (event.clientX - 1000 + scrX - desloca_x) * escala;
            var y = (event.clientY - 1000 + scrY - desloca_y) * escala
            var posInicial = new vec2(x, y);
            controle.addBloco('texto', posInicial);
        }
    }

});
document.querySelector('#deletar').addEventListener("mouseup", function() {
    if (this == event.target) {
        controle.deletarBlocosSelecionados();
    }
});
document.querySelector('#conectar').addEventListener("mouseup", function() {
    if (this == event.target) {
        controle.addConexaoBlocosSelecionados();
    }
});
var zoom = 1;
document.querySelector('body').addEventListener("keydown", function() {
    console.log(event);
    if (event.key == '+' && event.ctrlKey) {
        if (zoom < 1.3) zoom += 0.1;
        controle.zoon = zoom;
    }
    if (event.key == '-' && event.ctrlKey) {
        if (zoom > 0.7) zoom -= 0.1;
        controle.zoon = zoom;
    }
    if (event.key == 's' && event.ctrlKey){
        if (window.arquivo_atual == null) {
            ipcRenderer.send('salve',JSON.stringify(controle.JSON_export()));
        } else {
            ipcRenderer.send('salve_fast',window.arquivo_atual,JSON.stringify(controle.JSON_export()));
            console.log('salvo com sucesso!');
        }
    }
    if (event.key == 'Delete'){
        controle.deletarBlocosSelecionados();
    }
})