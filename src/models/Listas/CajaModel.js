import Proveedor from './ProveedorModel';

export default class Caja {
    id: number;
    proveedor: Proveedor;
    color_caja: string;
    extension_clave: number;
    indice_clave_producto: number;
    indice_peso: number;
    extension_clave_producto: number;
    extension_peso: number;

    constructor(id = 1, proveedor = new Proveedor(), color_caja = '', extension_clave = 1, indice_clave_producto = 1, indice_peso = 1, extension_clave_producto = 1, extension_peso = 1) {
        this.id = id;
        this.extension_clave = extension_clave;
        this.indice_clave_producto = indice_clave_producto;
        this.indice_peso = indice_peso;
        this.extension_clave_producto = extension_clave_producto;
        this.extension_peso = extension_peso;
        this.proveedor = proveedor;
        this.color_caja = color_caja;
    }

    getRealmObject() {
        return {
            id: this.id,
            proveedor: this.proveedor,
            color_caja: this.color_caja,
            extension_clave: this.extension_clave,
            indice_clave_producto: this.indice_clave_producto,
            indice_peso: this.indice_peso,
            extension_clave_producto: this.extension_clave_producto,
            extension_peso: this.extension_peso,
        };
    }

    updateObjectInfo(caja: any) {
        if (!caja)
            return;
        caja['proveedor'] = this.proveedor;
        caja['color_caja'] = this.color_caja;
        caja['extension_clave'] = this.extension_clave;
        caja['indice_clave_producto'] = this.indice_clave_producto;
        caja['indice_peso'] = this.indice_peso;
        caja['extension_clave_producto'] = this.extension_clave_producto;
        caja['extension_peso'] = this.extension_peso;
    }

    clone() {
        return new Caja(this.id,
            this.proveedor,
            this.color_caja,
            this.extension_clave,
            this.activo,
            this.indice_clave_producto,
            this.indice_peso,
            this.extension_clave_producto,
            this.extension_peso);
    }
}

const CajaSchema = {
    name: 'Caja',
    primaryKey: 'id',
    properties: {
        id: 'int',
        proveedor: 'Proveedor',
        color_caja: 'string',
        extension_clave: 'int',
        indice_clave_producto: 'int',
        indice_peso: 'int',
        extension_clave_producto: 'int',
        extension_peso: 'int',
    }
}

Caja.schema = CajaSchema