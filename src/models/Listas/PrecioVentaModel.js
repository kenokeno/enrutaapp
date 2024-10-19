import ListaPrecios from '../Catalogos/ListaPreciosModel';
import Producto from '../Listas/ProductoModel';

export default class PrecioVenta {
    lista_precios: ListaPrecios;
    precio_c_impuesto: number;
    precio_s_impuesto: number;

    constructor(lista_precios = new ListaPrecios(), precio_c_impuesto = 1, precio_s_impuesto = 1) {
        this.lista_precios = lista_precios;
        this.precio_c_impuesto = precio_c_impuesto;
        this.precio_s_impuesto = precio_s_impuesto;
    }

    getRealmObject() {
        return {
            lista_precios: this.lista_precios,
            precio_c_impuesto: this.precio_c_impuesto,
            precio_s_impuesto: this.precio_s_impuesto,
        };
    }

    updateObjectInfo(precio: any) {
        if (!precio)
            return;
        precio['lista_precios'] = this.lista_precios;
        precio['precio_c_impuesto'] = this.precio_c_impuesto;
        precio['precio_s_impuesto'] = this.precio_s_impuesto;
    }

    clone() {
        return new PrecioVenta(this.lista_precios, this.precio_c_impuesto, this.precio_s_impuesto);
    }
}

const PrecioVentaSchema = {
    name: 'PrecioVenta',
    embedded: true,
    properties: {
        lista_precios: 'ListaPrecios',
        precio_c_impuesto: 'float',
        precio_s_impuesto: 'float',
    }
}

PrecioVenta.schema = PrecioVentaSchema