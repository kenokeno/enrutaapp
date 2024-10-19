export default class Concepto {
    id: number;
    nombre: string; //merma
    nombre_abreviado: string; //merma
    naturaleza: string; //entrada - salida - cargo - credito
    tipo: string; // venta - devolucion - otra - 

    constructor(id = 1, nombre = '', nombre_abreviado = '', naturaleza = '', tipo = '') {
        this.id = id;
        this.nombre = nombre;
        this.nombre_abreviado = nombre_abreviado;
        this.naturaleza = naturaleza;
        this.tipo = tipo;
    }

    getRealmObject() {
        return {
            id: this.id,
            nombre: this.nombre,
            nombre_abreviado: this.nombre_abreviado,
            naturaleza: this.naturaleza,
            tipo: this.tipo,
        };
    }

    updateObjectInfo(concepto: any) {
        if (!concepto)
            return;
        concepto['nombre'] = this.nombre;
        concepto['nombre_abreviado'] = this.nombre_abreviado;
        concepto['naturaleza'] = this.naturaleza;
        concepto['tipo'] = this.tipo;
    }

    clone() {
        return new Concepto(this.id, this.nombre, this.nombre_abreviado, this.naturaleza, this.tipo);
    }
}

const ConceptoSchema = {
    name: 'Concepto',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nombre: 'string',
        nombre_abreviado: 'string',
        naturaleza: 'string',
        tipo: 'string',
    }
}

Concepto.schema = ConceptoSchema