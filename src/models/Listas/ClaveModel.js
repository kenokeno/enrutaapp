import Rol from './../Catalogos/RolModel';
import Producto from './ProductoModel';
export default class Clave {
    codigo: string;
    rol: Rol;

    constructor(codigo = '', rol = new Rol()) {
        this.codigo = codigo;
        this.rol = rol;
    }

    getRealmObject() {
        return {
            codigo: this.codigo,
            rol: this.rol,
        };
    }

    updateObjectInfo(clave: any) {
        if (!clave)
            return;
        clave['codigo'] = this.codigo;
        clave['rol'] = this.rol;
    }

    clone() {
        return new classPrivateMethod(this.codigo, this.rol);
    }
}

const ClaveSchema = {
    name: 'Clave',
    embedded: true,
    properties: {
        codigo: 'string',
        rol: 'Rol',
    }
}

Clave.schema = ClaveSchema