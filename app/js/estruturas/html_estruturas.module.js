class html_estruturas {
    static _blocoBase(){
        let alfa = document.createElement('div');
        alfa.classList.add('bloco');
        alfa.draggable = 'false';
        alfa.style.display = 'flex';
        alfa.style.flexDirection = 'column';
        alfa.style.backgroundColor = '#88ff55';
        alfa.style.minWidth = '50px';
        alfa.style.minheight = '20px';
        alfa.style.width = 'auto';
        alfa.style.height = 'auto';
        alfa.style.position = 'absolute';
        alfa.style.overflow = 'hidden';
        alfa.style.padding = '10px';
        alfa.style.borderRadius = '10px 10px 10px 10px';
        alfa.style.boxShadow = '2px 2px 3px rgba(0,0,0,0.9)';
        alfa.style.zIndex = '1';

        return alfa;

    }
    static _titulo(){
        let beta = document.createElement('input');
        beta.classList.add('titulo');
        beta.style.width = 'auto';
        beta.style.height = '30px';
        beta.style.backgroundColor = '#00000000';
        beta.style.border = 'none';
        beta.style.textAlign = 'center';
        beta.value = 'Título';

        return beta;

    }
    static _texto(){
        let gama = document.createElement('textarea');
        gama.classList.add('texto');
        gama.cols = '20';
        gama.rows = '5';
        gama.style.padding = '5px';
        gama.style.width = '200px';
        gama.style.minWidth = '170px';
        gama.style.width = 'auto';
        gama.style.height = '40px';
        gama.style.textIndent = '20px';
        gama.style.textAlign = 'justify';

        return gama;

    }
    static bloco_titulo_html() {
        let base = html_estruturas._blocoBase();
        let titulo = html_estruturas._titulo();
        base.appendChild(titulo);
        return base;

    }
    static bloco_texto_html() {
        let base = html_estruturas._blocoBase();
        let titulo = html_estruturas._titulo();
        let texto = html_estruturas._texto();
        base.appendChild(titulo);
        base.appendChild(texto);

        return base;

    };
    static linha_conexao = function() {
        let alfa = document.createElement('hr');
        alfa.style.position = 'absolute';
        alfa.style.border = 'solid #c80000 1px';
        alfa.style.zIndex = '0';
        alfa.classList.add(`div_linha`);

        return alfa;

    };

}
export {html_estruturas};