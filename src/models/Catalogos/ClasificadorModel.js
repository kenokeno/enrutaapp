import ValorClasificador from './ValorClasificadorModel';
export default class Clasificador {
    id: number;
    nombre: string;
    nombre_abreviado: string;
    descripcion: string;
    valores: ValorClasificador[];

    constructor(id = 1, nombre = '', nombre_abreviado = '', descripcion = '', valores = []) {
        this.id = id;
        this.nombre = nombre;
        this.nombre_abreviado = nombre_abreviado;
        this.descripcion = descripcion;
        this.valores = valores;
    }

    getRealmObject() {
        return {
            id: this.id,
            nombre: this.nombre,
            nombre_abreviado: this.nombre_abreviado,
            descripcion: this.descripcion,
            valores: this.valores,
        };
    }

    updateObjectInfo(clasificador: any) {
        if (!clasificador)
            return;
        clasificador['nombre'] = this.nombre;
        clasificador['nombre_abreviado'] = this.nombre_abreviado;
        clasificador['descripcion'] = this.descripcion;
        clasificador['valores'] = this.valores;
    }

    clone() {
        return new Clasificador(this.id, this.nombre, this.nombre_abreviado, this.descripcion, this.valores);
    }
}

const ClasificadorSchema = {
    name: 'Clasificador',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nombre: 'string',
        nombre_abreviado: 'string',
        descripcion: 'string',
        valores: { type: "list", objectType: "ValorClasificador" }
    }
}

Clasificador.schema = ClasificadorSchema