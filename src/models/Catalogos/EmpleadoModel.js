export default class Empleado {
    id: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    clave: string;

    constructor(id = 1, nombre = '', apellido_paterno = '', apellido_materno = '', clave = true) {
        this.id = id;
        this.nombre = nombre;
        this.apellido_paterno = apellido_paterno;
        this.apellido_materno = apellido_materno;
        this.clave = clave;
    }

    getRealmObject() {
        return {
            id: this.id,
            nombre: this.nombre,
            apellido_paterno: this.apellido_paterno,
            apellido_materno: this.apellido_materno,
            clave: this.clave,
        };
    }

    updateObjectInfo(empleado: any) {
        if (!empleado)
            return;
        empleado['nombre'] = this.nombre;
        empleado['apellido_paterno'] = this.apellido_paterno;
        empleado['apellido_materno'] = this.apellido_materno;
        empleado['clave'] = this.clave;
    }

    clone() {
        return new Empleado(this.id, this.nombre, this.apellido_paterno, this.apellido_materno, this.clave);
    }
}

const EmpleadoSchema = {
    name: 'Empleado',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nombre: 'string',
        apellido_paterno: 'string',
        apellido_materno: 'string',
        clave: 'string',
    }
}

Empleado.schema = EmpleadoSchema