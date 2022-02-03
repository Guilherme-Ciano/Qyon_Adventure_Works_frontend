export default class Pista {
    constructor (Nome, Descricao,){
        this.Nome = Nome;
        this.Descricao = Descricao;
    }

    getNome() {
        return this.Nome;
    }

    getDescricao() {
        return this.Descricao;
    }
}