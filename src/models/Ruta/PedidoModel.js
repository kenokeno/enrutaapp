import Ruta from './../Catalogos/RutaModel';
import Repartidor from './../Listas/RepartidorModel';
import Cliente from './../Listas/ClienteModel';
import DescripcionPedido from './DescripcionPedidoModel';

export default class Pedido {
    id: number;
    fecha: Date;
    fecha_entrega: Date;
    tipo_orden: string;
    descripcion_pedidos: DescripcionPedido[];
    ruta: Ruta;
    vendedor: Repartidor;
    cliente: Cliente;
    subtotal: number;
    total: number;

    constructor(
        id = 1,
        fecha = new Date(),
        fecha_entrega = new Date(),
        tipo_orden = '',
        descripcion_pedidos = [],
        ruta = new Ruta(),
        vendedor = new Repartidor(),
        cliente = new Cliente(),
        subtotal = 1,
        total = 1,) {
        this.id = id;
        this.fecha = fecha;
        this.fecha_entrega = fecha_entrega;
        this.tipo_orden = tipo_orden;
        this.descripcion_pedidos = descripcion_pedidos;
        this.ruta = ruta;
        this.vendedor = vendedor;
        this.cliente = cliente;
        this.subtotal = subtotal;
        this.total = total;
    }

    getRealmObject() {
        return {
            id: this.id,
            fecha: this.fecha,
            fecha_entrega: this.fecha_entrega,
            tipo_orden: this.tipo_orden,
            descripcion_pedidos: this.descripcion_pedidos,
            ruta: this.ruta,
            vendedor: this.vendedor,
            cliente: this.cliente,
            subtotal: this.subtotal,
            total: this.total,
        }
    }

    updateObjectInfo(inventario: any) {
        if (!etiqueta)
            return;
        inventario['fecha'] = this.fecha;
        inventario['fecha_entrega'] = this.fecha_entrega;
        inventario['tipo_orden'] = this.tipo_orden;
        inventario['descripcion_pedidos'] = this.descripcion_pedidos;
        inventario['ruta'] = this.ruta;
        inventario['vendedor'] = this.vendedor;
        inventario['cliente'] = this.cliente;
        inventario['subtotal'] = this.subtotal;
        inventario['total'] = this.total;
    }

    clone() {
        return new cliente(this.id,
            this.fecha,
            this.fecha_entrega,
            this.tipo_orden,
            this.descripcion_pedidos,
            this.ruta,
            this.vendedor,
            this.cliente,
            this.subtotal,
            this.total);
    }
}

const PedidoSchema = {
    name: 'Pedido',
    primaryKey: 'id',
    properties: {
        id: 'int',
        fecha: 'date',
        fecha_entrega: 'date',
        tipo_orden: 'string',
        descripcion_pedidos: {
            type: 'linkingObjects',
            objectType: 'DescripcionPedido',
            property: 'pedido'
        },
        ruta: 'Ruta',
        vendedor: 'Repartidor',
        cliente: 'Cliente',
        subtotal: 'float',
        total: 'float',
    }
}

Pedido.schema = PedidoSchema