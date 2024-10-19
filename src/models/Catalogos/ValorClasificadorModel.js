import Clasificador from './ClasificadorModel';

export default class ValorClasificador {
    valor: string;

    constructor(valor = '') {
        this.valor = valor;
    }

    getRealmObject() {
        return {
            valor: this.valor,
        };
    }

    updateObjectInfo(clasificador: any) {
        if (!clasificador)
            return;
        clasificador['valor'] = this.valor;
    }

    clone() {
        return new ValorClasificador(this.valor);
    }
}

const ValorClasificadorSchema = {
    name: 'ValorClasificador',
    embedded: true, // default: false
    properties: {
        valor: 'string',
    }
}

ValorClasificador.schema = ValorClasificadorSchema