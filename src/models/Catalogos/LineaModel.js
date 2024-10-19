import GrupoLineas from './GrupoLineasModel';

export default class Linea {
    id: number;
    nombre: string;
    activo: boolean;
    grupo_lineas: GrupoLineas;

    constructor(id = 1, nombre = '', activo = true, grupo_lineas = new GrupoLineas()) {
        this.id = id;
        this.nombre = nombre;
        this.activo = activo;
        this.grupo_lineas = grupo_lineas;
    }

    getRealmObject() {
        return {
            id: this.id,
            nombre: this.nombre,
            activo: this.activo,
            grupo_lineas: this.grupo_lineas,
        };
    }

    updateObjectInfo(linea: any) {
        if (!linea)
            return;
        linea['nombre'] = this.nombre;
        linea['activo'] = this.activo;
        linea['grupo_lineas'] = this.grupo_lineas;
    }

    clone() {
        return new Linea(this.id, this.nombre, this.activo, this.grupo_lineas);
    }
}

const LineaSchema = {
    name: 'Linea',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nombre: 'string',
        activo: 'bool',
        grupo_lineas: 'GrupoLineas',
    }
}

Linea.schema = LineaSchema