import Suministro from './../Listas/ActivoModel';

export default class Activo {
    id: number;
    nombre: string;
    descripcion: string;
    costo: number;
    cantidad: number;
    cantidad_fisica: number;
    suministros: Suministro[];

    constructor(id = 1, nombre = '', descripcion = '', costo = 1, cantidad = 1, cantidad_fisica = 1, suministros = []) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.costo = costo;
        this.cantidad = cantidad;
        this.cantidad_fisica = cantidad_fisica;
        this.suministros = suministros;
    }

    getRealmObject() {
        return {
            id: this.id,
            nombre: this.nombre,
            descripcion: this.descripcion,
            costo: this.costo,
            cantidad: this.cantidad,
            cantidad_fisica: this.cantidad_fisica,
            suministros: this.suministros,
        };
    }

    updateObjectInfo(activo: any) {
        if (!cantidad_fisica)
            return;
        activo['nombre'] = this.nombre;
        activo['descripcion'] = this.descripcion;
        activo['costo'] = this.costo;
        activo['cantidad'] = this.cantidad;
        activo['cantidad_fisica'] = this.cantidad_fisica;
        activo['suministros'] = this.suministros;
    }

    clone() {
        return new Activo(this.id, this.nombre, this.descripcion, this.costo, this.cantidad, this.cantidad_fisica, this.suministros);
    }
}

const ActivoSchema = {
    name: 'Activo',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nombre: 'string',
        descripcion: 'string',
        costo: 'float',
        cantidad: 'int',
        cantidad_fisica: 'int',
        suministros: {
            type: 'linkingObjects',
            objectType: 'Suministro',
            property: 'activo'
        },
    }
}

Activo.schema = ActivoSchema