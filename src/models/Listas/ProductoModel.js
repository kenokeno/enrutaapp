import Linea from './../Catalogos/LineaModel';
import Clave from './ClaveModel';
import ClasificadorProducto from './ClasificadorProducto';
import Proveedor from './ProveedorModel';
import Impuesto from './../Catalogos/ImpuestoModel';
import PrecioVenta from './PrecioVentaModel';

export default class Producto {
    id: number;
    nombre: number;
    imagen: string;
    linea: Linea;
    unidad_medida: string;
    unidad_compra: String;
    contenido: number;
    precios_venta: PrecioVenta[];
    claves: Clave[];
    clasificadores: ClasificadorProducto;
    proveedor: Proveedor;
    impuestos: Impuesto[];
    notas: string;
    activo: boolean;

    constructor(
        id = 0,
        nombre = '',
        imagen = '',
        linea = new Linea(),
        unidad_medida = '',
        unidad_compra = '',
        contenido = 0,
        precios_venta = [],
        claves = [],
        clasificadores = new ClasificadorProducto(),
        proveedor = new Proveedor(),
        impuestos = [],
        notas = '',
        activo = true,) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.linea = linea;
        this.unidad_medida = unidad_medida;
        this.unidad_compra = unidad_compra;
        this.contenido = contenido;
        this.precios_venta = precios_venta;
        this.claves = claves;
        this.clasificadores = clasificadores;
        this.impuestos = impuestos;
        this.proveedor = proveedor;
        this.notas = notas;
        this.activo = activo;
    }

    getRealmObject() {
        return {
            id: this.id,
            nombre: this.nombre,
            imagen: this.imagen,
            linea: this.linea,
            unidad_medida: this.unidad_medida,
            unidad_compra: this.unidad_compra,
            contenido: this.contenido,
            precios_venta: this.precios_venta,
            claves: this.claves,
            clasificadores: this.clasificadores,
            impuestos: this.impuestos,
            proveedor: this.proveedor,
            notas: this.notas,
            activo: this.activo,
        };
    }

    updateObjectInfo(producto: any) {
        if (!producto)
            return;
        producto['nombre'] = this.nombre;
        producto['imagen'] = this.imagen;
        producto['linea'] = this.linea;
        producto['unidad_medida'] = this.unidad_medida;
        producto['unidad_compra'] = this.unidad_compra;
        producto['contenido'] = this.contenido;
        producto['precios_venta'] = this.precios_venta;
        producto['claves'] = this.claves;
        producto['clasificadores'] = this.clasificadores;
        producto['impuestos'] = this.impuestos;
        producto['proveedor'] = this.proveedor;
        producto['notas'] = this.notas;
        producto['activo'] = this.activo;
    }

    clone() {
        return new Producto(this.id,
            this.nombre,
            this.imagen,
            this.linea,
            this.unidad_medida,
            this.unidad_compra,
            this.contenido,
            this.precios_venta,
            this.claves,
            this.clasificadores,
            this.impuestos,
            this.proveedor,
            this.notas,
            this.activo);
    }
}

const ProductoSchema = {
    name: 'Producto',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nombre: 'string',
        imagen: 'string?',
        linea: 'Linea',
        unidad_medida: 'string',
        unidad_compra: 'string',
        contenido: 'int',
        precios_venta: { type: "list", objectType: "PrecioVenta" },
        claves: { type: "list", objectType: "Clave" },
        clasificadores: 'ClasificadorProducto?',
        proveedor: 'Proveedor',
        impuestos: 'Impuesto[]',
        notas: 'string?',
        activo: 'bool',
    }
}

Producto.schema = ProductoSchema