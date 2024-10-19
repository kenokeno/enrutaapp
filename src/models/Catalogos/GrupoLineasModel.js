import Linea from './LineaModel';
export default class GrupoLineas {
    id: number;
    nombre: string;
    activo: boolean;
    lineas: Linea[];

    constructor(id = 1, nombre = '', activo = true, lineas = []) {
        this.id = id;
        this.nombre = nombre;
        this.activo = activo;
        this.lineas = lineas;
    }

    getRealmObject() {
        return {
            id: this.id,
            nombre: this.nombre,
            activo: this.activo,
            lineas: this.lineas,
        };
    }

    updateObjectInfo(grupo_lineas: any) {
        if (!grupo_lineas)
            return;
        grupo_lineas['nombre'] = this.nombre;
        grupo_lineas['activo'] = this.activo;
        grupo_lineas['lineas'] = this.lineas;
    }

    clone() {
        return new GrupoLineas(this.id, this.nombre, this.activo, this.lineas);
    }
}

const GrupoLineasSchema = {
    name: 'GrupoLineas',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nombre: 'string',
        activo: 'bool',
        lineas: {
            type: 'linkingObjects',
            objectType: 'Linea',
            property: 'grupo_lineas'
        },
    }
}

GrupoLineas.schema = GrupoLineasSchema