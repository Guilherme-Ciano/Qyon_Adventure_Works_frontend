export default class Competidor {
    constructor(Nome, Sexo, TemperaturaMediaCorpo, Peso, Altura, Id) {
        this.Nome = Nome;
        this.TemperaturaMediaCorpo = TemperaturaMediaCorpo;
        this.Sexo = Sexo;
        this.Peso = Peso;
        this.Altura = Altura;
        this.Id = Id;
    }

    getNome() {
        return this.Nome;
    }

    getTemperaturaMediaCorpo() {
        return this.TemperaturaMediaCorpo;
    }

    getSexo() {
        return this.Sexo;
    }

    getPeso() {
        return this.Peso;
    }

    getAltura() {
        return this.Altura;
    }

    getId() {
        return this.Id;
    }

}