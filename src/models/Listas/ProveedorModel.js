import Producto from './ProductoModel';
import Caja from './CajaModel';

export default class Proveedor {
    id: number;
    nombre: string;
    nombre_corto: string;
    activo: boolean;
    productos: Producto[];
    cajas: Caja[];

    constructor(id = 1, nombre = '', nombre_corto = '', activo = true, productos = [], cajas = []) {
        this.id = id;
        this.nombre = nombre;
        this.nombre_corto = nombre_corto;
        this.activo = activo;
        this.productos = productos;
        this.cajas = cajas;
    }

    getRealmObject() {
        return {
            id: this.id,
            nombre: this.nombre,
            nombre_corto: this.nombre_corto,
            activo: this.activo,
            productos: this.productos,
            cajas: this.cajas,
        };
    }

    updateObjectInfo(proveedor: any) {
        if (!proveedor)
            return;
        proveedor['nombre'] = this.nombre;
        proveedor['nombre_corto'] = this.nombre_corto;
        proveedor['productos'] = this.productos;
        proveedor['cajas'] = this.cajas;
    }

    clone() {
        return new Proveedor(this.id, this.nombre, this.nombre_corto, this.activo, this.productos, this.cajas);
    }
}

const ProveedorSchema = {
    name: 'Proveedor',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nombre: 'string',
        nombre_corto: 'string',
        activo: 'bool',
        productos: {
            type: 'linkingObjects',
            objectType: 'Producto',
            property: 'proveedor'
        },
        cajas: {
            type: 'linkingObjects',
            objectType: 'Caja',
            property: 'proveedor'
        },
    }
}

Proveedor.schema = ProveedorSchema