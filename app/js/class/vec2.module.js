//Matematica Vetorial 2d básica
/*
    Aqui estaremos Importando uma super feramenta da
    matemática para facilitar, em muito, nossa vida.
    Sim, não poderia ficar de fora nosso amigo vetor
    2d. Elemento muito importante para fisica, principalmente
    quando se trata de ensino médio.
    basicamente, um vetor 2d é uma entidade matemática, capaz
    de armazernar dois valores que tenão a mesma natureza, que
    sejam idependente, e são indisociaveis.
    por exemplo:
        para determinar a posição de uma furmiga sobre a mesa.
    naturalmente, voce tera que falar a que autura e que largura
        a furmiga esta da messa. Dessa forma, largura e altura tem
    a mesma natureza, ou seja, são tipos de comprimentos.
        o fato de a formiga subir, não a impede de andar para o lada
    ou seja, esse valores são independentes. Entretanto, so podemos
    dizer aonde a formiga esta encima da mesa, se falarmos a que
    altura esta, assim como, a que largura.
    Então, iniciemos a reprodução dessa feramenta
*/
class vec2 {
    constructor(objx, objy) {
        //coodernadas do vetor
        this.x;
        this.y;
        if ((typeof objx != 'object') && (objy != 'object')) {
            //esse bloco é executado se os valores passados forem numeros
            this.x = objx;
            this.y = objy;
        } else if (typeof objx == 'object') {
            //esse bloco é executado se o argumento principal for outro vetor
            this.x = objx.x;
            this.y = objx.y;
        } else {
            // caso os argumentos não sejam válidos, criamos o vetor
            // porem, nulo.
            this.x = 0;
            this.y = 0;
            console.log('o valor passado, não é valido: vetor anulado!');
        }
        // apos instaciarmos o vetor, estamos livres para desenvolver suas
        // propiedades.
        //verificar vetor
    }
    static teste_vec2(vector_teste) {
        var teste = new vec2(0, 0);
        if (typeof vector_teste == 'undefined') {
            return false;
        }
        if (!isNaN(vector_teste)) {
            return false;
        } else if (Object.getPrototypeOf(teste) == Object.getPrototypeOf(vector_teste)) {
            return true;
        } else {
            return false;
        }
    };
    //função que retorna o comprimento do vetor
    comprimento = function(ox, oy) {
        if (typeof oy != 'undefined') {
            var x = ox;
            var y = oy;
        } else if (vec2.teste_vec2(ox)) {
            var x = ox.x;
            var y = ox.y;
        } else {
            var x = this.x;
            var y = this.y;
        }
        var r2 = x * x + y * y;
        return Math.sqrt(r2);
    };
    static comprimento(vec) {
        if (vec2.teste_vec2(vec)) {
            var x = vec.x;
            var y = vec.y;
        }
        var r2 = x * x + y * y;
        return Math.sqrt(r2);
    };
    //função que retorna produto interno
    /*
     *	produto interno é uma importante operação vetorial
     *	muito importante para fazer comparação entre vetores.
     *	Uma das varias utilidades desse elemento é descopri
     *	o angulo entre dois vetores.
     *	LEMBREM-SE: vetores são representações matemáticas de
     *	coisas reais.
     */
    somar = (vetor1, vetor2) => {
        if (vec2.teste_vec2(vetor1)) {
            // se o vetor 1 existir
            return new vec2(this.x + vetor1.x, this.y + vetor1.y);
        } else {
            console.error("Err:vec2: Essa função so aceita vetores como parametros.");
        }
    };
    static somar(vetor1, vetor2) {
        if (vec2.teste_vec2(vetor2) && vec2.teste_vec2(vetor1)) {
            // se o vetor 1 e o vetor 2 existirem
            return new vec2(vetor1.x + vetor2.x, vetor1.y + vetor2.y);
        } else {
            console.error("Err:vec2: Essa função so aceita vetores como parametros.");
        }
    };
    subtrair = (vetor1) => {
        if (vec2.teste_vec2(vetor1)) {
            // se o vetor 1 não existir
            return new vec2(this.x - vetor1.x, this.y - vetor1.y);
        } else {
            console.error("Err:vec2: Essa função so aceita vetores como parametros.");
        }
    };
    static subtrair(vetor1, vetor2) {
        if (vec2.teste_vec2(vetor2) && vec2.teste_vec2(vetor1)) {
            // se os dois vetores existirem
            return new vec2(vetor1.x - vetor2.x, vetor1.y - vetor2.y);
        } else {
            console.error("Err:vec2: Essa função so aceita vetores como parametros.");
        }
    };
    escala = function(escala) {
        var _x = this.x * escala;
        var _y = this.y * escala;
        return new vec2(_x, _y);
    };
    static escala(vec, escala) {
        var _x = vec.x * escala;
        var _y = vec.y * escala;
        return new vec2(_x, _y);
    };
    produtoInterno = function(vetor1) {
        if (vec2.teste_vec2(vetor1)) {
            // se o vetor 1 existir
            var x1 = vetor1.x || 0;
            var y1 = vetor1.y || 0;
        } else {
            // se o vetor 1 não existir
            var x1 = 0;
            var y1 = 0;
            console.warn('Para termos um resultado eficiente, é necessario passar como parametro pelomenos um vetor.');
        }
        // se o vetor 2 não existir
        var x2 = this.x;
        var y2 = this.y;

        var r2 = x1 * x2 + y1 * y2;
        return r2;
    };
    static produtoInterno(vetor1, vetor2) {
        if (vec2.teste_vec2(vetor1)) {
            // se o vetor 1 existir
            var x1 = vetor1.x || 0;
            var y1 = vetor1.y || 0;
        } else {
            // se o vetor 1 não existir
            var x1 = 0;
            var y1 = 0;
            console.warn('Para termos um resultado eficiente, é necessario passar como parametro pelomenos um vetor.');
        }
        if (vec2.teste_vec2(vetor2)) {
            // se o vetor 2 existir
            var x2 = vetor2.x || 0;
            var y2 = vetor2.y || 0;
        } else {
            // se o vetor 2 não existir
            var x2 = 0;
            var y2 = 0;
            console.warn('Para termos um resultado eficiente, é necessario passar como parametro pelomenos um vetor.');
        }
        var r2 = x1 * x2 + y1 * y2;
        return r2;
    };
    /*
        Esse vetor será ou o oposto do vetor informado
        ou
        o oposto do vetor instanciado.
    */
    oposto = function() {
        var _x;
        var _y;
        // caso os argumentos não sejam válidos, criamos o vetor
        // porem, nulo.
        _x = -this.x;
        _y = -this.y;
        return new vec2(_x, _y);
    };
    static oposto(vec) {
        var _x;
        var _y;
        if (vec2.teste_vec2(vec)) {
            //esse bloco é executado se o argumento principal for outro vetor
            _x = -vec.x;
            _y = -vec.y;
        } else {
            // caso os argumentos não sejam válidos, criamos o vetor
            // porem, nulo.
            _x = 0;
            _y = 0;
        }
        return new vec2(_x, _y);
    };
    /*
        O ângulo de referência será o angulo que o vetor criado fará com
        com o eixo x.
        Poderiamos escolher ambos os eixos, tantos x como y, entretanto,
        escolhemos o eixo x, devido esse eixo ser mais escolhido como
        convenção matemática
        Esse objeto é muito importante pois pode nos auxiliar como passo
        intermediario em vários calculos.
    */
    static angulo_entre_vetores(vetor1, vetor2) {
        //comprimento do primeiro vetor
        var modulo_v1 = vec2.comprimento(vetor1);
        //comprimento do segundo vetor 
        var modulo_v2 = vec2.comprimento(vetor2);
        //produto escalar entre os vetores (na verdade, essa propriedade e tipo uma comparação entre os vetores).
        var produto = vec2.produtoInterno(vetor1, vetor2);
        //abaixo o cosseno entre os vetores 
        var cos_diretor = produto / (modulo_v1 * modulo_v2);
        return Math.acos(cos_diretor);
    };
    /*
        Vetores Patão:
        Nessa parte de nosso objeto Vetor, Definiremos 4 vetores basicos que servirão de orientação
        para nossos Trabalhos
    */
    static a_cima() {
        //vetor que aponta para cima
        return new vec2(0, 1);
    };
    static a_baixo() {
        //vetor que aponta para baixo
        return new vec2(0, -1);
    };
    static a_direita() {
        //vetor que aponta para direita
        return new vec2(1, 0);
    };
    static a_esquerda() {
        //vetor que aponta para baixo
        return new vec2(-1, 0);
    };
    /*
        Angulo Entre eese vetor e o vetor x
    */
    angulo_com_eixo_x = function() {
        //Angulo entre o eixo x e o vetor escolhido
        //A linha abaixo é nosso Vetor a direita, que deixaremos como padrao para representar o eixo x
        var eixo_x = vec2.a_direita();
        //calcular o produto interno do propio vetor que chamou o metodo
        var Inter = vec2.produtoInterno(this, eixo_x);
        //calcular o cosseno diretor
        var _cos = Inter / (vec2.comprimento(this) * vec2.comprimento(eixo_x));

        return Math.acos(_cos) * 180 / Math.PI;
    };
    static angulo_com_eixo_x(vetor1) {
        //Angulo entre o eixo x e o vetor escolhido
        //A linha abaixo é nosso Vetor a direita, que deixaremos como padrao para representar o eixo x
        var eixo_x = vec2.a_direita();
        //verificação de tipo dos parametros
        //caso tenhamos parametros, ou seja, se vetor1 for de fato um vetor
        if (vec2.teste_vec2(vetor1)) {
            //calcular o produto interno do vetor1
            var Inter = vec2.produtoInterno(vetor1, eixo_x);
            //calcular o cosseno diretor
            var _cos = Inter / (vec2.comprimento(vetor1) * vec2.comprimento(eixo_x));
        } else {
            _cos = 0;
        }
        return Math.acos(_cos) * 180 / Math.PI;
    };
    angulo_com_eixo_y = function() {
        //Angulo entre o eixo y e o vetor escolhido
        //A linha abaixo é nosso Vetor a cima, que deixaremos como padrao para representar o eixo y
        var eixo_y = vec2.a_cima();
        //calcular o produto interno do propio vetor que chamou o metodo
        var Inter = vec2.produtoInterno(this, eixo_y);
        //calcular o cosseno diretor
        var _cos = Inter / (vec2.comprimento(this) * vec2.comprimento(eixo_y));
        return Math.acos(_cos) * 180 / Math.PI;
    };

    static angulo_com_eixo_y(vetor1) {
        //Angulo entre o eixo y e o vetor escolhido
        //A linha abaixo é nosso Vetor a cima, que deixaremos como padrao para representar o eixo y
        var eixo_y = vec2.a_cima();
        //verificação de tipo dos parametros
        //caso tenhamos parametros, ou seja, se vetor1 for de fato um vetor
        if (vec2.teste_vec2(vetor1)) {
            //calcular o produto interno do vetor1
            var Inter = vec2.produtoInterno(vetor1, eixo_y);
            //calcular o cosseno diretor
            var _cos = Inter / (vec2.comprimento(vetor1) * vec2.comprimento(eixo_y));
        } else { //se não ...
            var _cos = 0;
        }
        return Math.acos(_cos) * 180 / Math.PI;
    };
    angulo_tg = (alvo) => {
        // se o vetor 1 não existir
        var deslocamento = vec2.subtrair(alvo, this);
        var teta_x = vec2.angulo_com_eixo_x(deslocamento);
        if (this.y > alvo.y) {
            teta_x = 360 - teta_x;
        }
        return teta_x;
    };
    static angulo_tg(alvo, origem){
        if (vec2.teste_vec2(alvo)) {
            if (vec2.teste_vec2(origem)) {
                // se o vetor 1 existir
                var deslocamento = vec2.subtrair(alvo, origem);
                var teta_x = vec2.angulo_com_eixo_x(deslocamento);
                if (alvo.y > origem.y) {
                    teta_x = 360 - teta_x;
                }
                return teta_x;
            } else {
                return null;
            }
        } else {
            return null;
        }
    };
    vetor_alvo_unitario = (alvo, origem) => {
        var angulo = this.angulo_tg(alvo);
        var unitario_x = Math.cos(angulo * Math.PI / 180);
        var unitario_y = Math.sin(angulo * Math.PI / 180);
        return new vec2(unitario_x, unitario_y);
    };
    static vetor_alvo_unitario(alvo, origem){
        if (vec2.teste_vec2(alvo)) {
            if (vec2.teste_vec2(origem)) {
                var angulo = vec2.angulo_tg(alvo, origem);
                var unitario_x = Math.cos(angulo * Math.PI / 180);
                var unitario_y = Math.sin(angulo * Math.PI / 180);
                return new vec2(unitario_x,unitario_y);
            }
        }
    };
    // Vetor Rotação
    vetor_rotacao = (angulo) => {
        var vector1 = this;
        if (vec2.teste_vec2(vector1)) {
            var cos_angulo =  Math.cos(angulo * Math.PI / 180);
            var sen_angulo =  Math.sin(angulo * Math.PI / 180)
            var x = (vector1.x)*cos_angulo - (vector1.y)*sen_angulo;
            var y = (vector1.x)*sen_angulo + (vector1.y)*cos_angulo;
            return new vec2(x, y);
        } else {
            console.warn('o segundo argumento informado não é um vetor');
        }
    };
    static vetor_rotacao(angulo, vector1){
        if (vec2.teste_vec2(vector1)) {
            var cos_angulo =  Math.cos(angulo * Math.PI / 180);
            var sen_angulo =  Math.sin(angulo * Math.PI / 180)
            var x = (vector1.x)*cos_angulo - (vector1.y)*sen_angulo;
            var y = (vector1.x)*sen_angulo + (vector1.y)*cos_angulo;
            return new vec2(x, y);
        } else {
            console.warn('o segundo argumento informado não é um vetor');
        }
    };
    //informações do vector
    vec_log = function() {
        return `vec(${this.x},${this.y}) ## modulo: ${this.comprimento().toFixed(2)}`;
    };
    clone = function() {
        return new vec2(this.x, this.y);
    };
    JSON_export = () => {
        var exportado = { x: this.x, y: this.y };
        return exportado;
    };
    static JSON_export(vec) {
        if (vec2.teste_vec2(vec)) {
            var exportado = { x: vec.x, y: vec.y };
            return exportado;
        }
    };
    static JSON_import(obj) {
        var importado = new vec2(obj.x, obj.y);
        return importado;
    };
}
export {vec2};