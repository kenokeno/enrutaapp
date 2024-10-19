import CentroDistribucion from './CentroDistribucionModel';
import Empleado from './EmpleadoModel';

export default class Almacen {
    id: number;
    nombre: string;
    nombre_abreviado: string;
    almacenista: Empleado;
    centro_distribucion: CentroDistribucion;
    inventarios: Inventario[];

    constructor(id = 1, nombre = '', nombre_abreviado = '', almacenista = new Empleado(), centro_distribucion = new CentroDistribucion(), inventarios = []) {
        this.id = id;
        this.nombre = nombre;
        this.nombre_abreviado = nombre_abreviado;
        this.almacenista = almacenista;
        this.centro_distribucion = centro_distribucion;
        this.inventarios = inventarios;
    }

    getRealmObject() {
        return {
            id: this.id,
            nombre: this.nombre,
            nombre_abreviado: this.nombre_abreviado,
            almacenista: this.almacenista,
            centro_distribucion: this.centro_distribucion,
            inventarios: this.inventarios,
        };
    }

    updateObjectInfo(almacen: any) {
        if (!almacen)
            return;
        almacen['nombre'] = this.nombre;
        almacen['nombre_abreviado'] = this.nombre_abreviado;
        almacen['almacenista'] = this.almacenista;
        almacen['centro_distribucion'] = this.centro_distribucion;
        almacen['inventarios'] = this.inventarios;
    }

    clone() {
        return new Almacen(this.id, this.nombre, this.nombre_abreviado, this.almacenista, this.centro_distribucion, this.inventarios);
    }
}

const AlmacenSchema = {
    name: 'Almacen',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nombre: 'string',
        nombre_abreviado: 'string',
        almacenista: 'Empleado',
        centro_distribucion: 'CentroDistribucion',
        inventarios: {
            type: 'linkingObjects',
            objectType: 'Inventario',
            property: 'almacen',
        },
    }
}

Almacen.schema = AlmacenSchema;