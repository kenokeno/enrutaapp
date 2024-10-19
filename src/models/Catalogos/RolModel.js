export default class Rol {
    id: number;
    nombre: string;

    constructor(id = 1, nombre = '') {
        this.id = id;
        this.nombre = nombre;
    }

    getRealmObject() {
        return {
            id: this.id,
            nombre: this.nombre,
        };
    }

    updateObjectInfo(rol: any) {
        if (!rol)
            return;
        rol['nombre'] = this.nombre;
    }

    clone() {
        return new Rol(this.id, this.nombre);
    }
}

const RolSchema = {
    name: 'Rol',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nombre: 'string',
    }
}

Rol.schema = RolSchema