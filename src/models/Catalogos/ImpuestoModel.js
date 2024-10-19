export default class Impuesto {
    id: number;
    nombre: string;
    porcentaje: number;

    constructor(id = 1, nombre = '', porcentaje = 16) {
        this.id = id;
        this.nombre = nombre;
        this.porcentaje = porcentaje;
    }

    getRealmObject() {
        return {
            id: this.id,
            nombre: this.nombre,
            porcentaje: this.porcentaje,
        };
    }

    updateObjectInfo(impuesto: any) {
        if (!impuesto)
            return;
        impuesto['nombre'] = this.nombre;
        impuesto['porcentaje'] = this.porcentaje;
    }

    clone() {
        return new Impuesto(this.id, this.nombre, this.porcentaje);
    }
}

const ImpuestoSchema = {
    name: 'Impuesto',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nombre: 'string',
        porcentaje: 'float',
    }
}

Impuesto.schema = ImpuestoSchema