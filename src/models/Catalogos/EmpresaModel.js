export default class Empresa {
    id: number;
    nombre: string;
    activo: boolean;

    constructor(id = 1, nombre = '', activo = true) {
        this.id = id;
        this.nombre = nombre;
        this.activo = activo;
    }

    getRealmObject() {
        return {
            id: this.id,
            nombre: this.nombre,
            activo: this.activo,
        };
    }

    updateObjectInfo(empresa: any) {
        if (!empresa)
            return;
        empresa['nombre'] = this.nombre;
        empresa['activo'] = this.activo;
    }

    clone() {
        return new Empresa(this.id, this.nombre, this.activo);
    }
}

const EmpresaSchema = {
    name: 'Clasificador',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nombre: 'string',
        activo: 'bool',
        productos: 'Producto[]',
        proveedor: 'Proveedor',
        cliente: 'Cliente',
    }
}

Empresa.schema = EmpresaSchema