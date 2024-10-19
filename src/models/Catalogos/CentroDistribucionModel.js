import Empleado from './EmpleadoModel';

export default class CentroDistribucion {
    id: number;
    nombre: string;
    ciudad: string;
    direccion: string;
    rutas: Ruta[];
    almacenes: Almacen[];
    auditores: Empleado[];

    constructor(id = 1, nombre = '', ciudad = '', direccion = '', auditores = [], rutas = [], almacenes = []) {
        this.id = id;
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.auditores = auditores;
        this.rutas = rutas;
        this.almacenes = almacenes;
    }

    getRealmObject() {
        return {
            id: this.id,
            nombre: this.nombre,
            ciudad: this.ciudad,
            direccion: this.direccion,
            auditores: this.auditores,
            rutas: this.rutas,
            almacenes: this.almacenes,
        };
    }

    updateObjectInfo(ceDist: any) {
        if (!ceDist)
            return;
        ceDist['nombre'] = this.nombre;
        ceDist['ciudad'] = this.ciudad;
        ceDist['direccion'] = this.direccion;
        ceDist['auditores'] = this.auditores;
        ceDist['rutas'] = this.rutas;
        ceDist['almacenes'] = this.almacenes;
    }

    clone() {
        return new CentroDistribucion(this.id, this.nombre, this.ciudad, this.direccion, this.auditores, this.rutas, this.almacenes);
    }
}

const CentroDistribucionSchema = {
    name: 'CentroDistribucion',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nombre: 'string',
        ciudad: 'string',
        direccion: 'string',
        almacenes: {
            type: 'linkingObjects',
            objectType: 'Almacen',
            property: 'centro_distribucion',
        },
        rutas: {
            type: 'linkingObjects',
            objectType: 'Ruta',
            property: 'centro_distribucion',
        },
        auditores: 'Empleado[]',
    }
}

CentroDistribucion.schema = CentroDistribucionSchema