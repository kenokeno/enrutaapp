import Pedido from './PedidoModel';
import Producto from './../Listas/ProductoModel';

export default class DescripcionPedido {
    id: number;
    pedido: Pedido;
    producto: Producto;
    unidades: number;
    precio: number;
    descuento: number;
    subtotal: number;
    total: number;

    constructor(
        id = 1,
        pedido = new Pedido(),
        producto = new Producto(),
        precio = 1,
        unidades = 1,
        descuento = 1,
        subtotal = 1,
        total = 1,) {
        this.id = id;
        this.pedido = pedido;
        this.producto = producto;
        this.precio = precio;
        this.unidades = unidades;
        this.descuento = descuento;
        this.subtotal = subtotal;
        this.total = total;
    }

    getRealmObject() {
        return {
            id: this.id,
            pedido: this.pedido,
            producto: this.producto,
            precio: this.precio,
            unidades: this.unidades,
            subtotal: this.subtotal,
            descuento: this.descuento,
            total: this.total,
        }
    }

    updateObjectInfo(inventario: any) {
        if (!etiqueta)
            return;
        inventario['pedido'] = this.pedido;
        inventario['producto'] = this.producto;
        inventario['precio'] = this.precio;
        inventario['unidades'] = this.unidades;
        inventario['descuento'] = this.descuento;
        inventario['subtotal'] = this.subtotal;
        inventario['total'] = this.total;
    }

    clone() {
        return new Producto(this.id,
            this.pedido,
            this.producto,
            this.precio,
            this.unidades,
            this.subtotal,
            this.descuento,
            this.total);
    }
}

const DescripcionPedidoSchema = {
    name: 'DescripcionPedido',
    primaryKey: 'id',
    properties: {
        id: 'int',
        pedido: 'Pedido',
        producto: 'Producto',
        precio: 'float',
        unidades: 'int',
        descuento: 'float',
        subtotal: 'float',
        total: 'float',
    }
}

DescripcionPedido.schema = DescripcionPedidoSchema