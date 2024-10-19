import Pedido from './PedidoModel';
import Repartidor from './../Listas/RepartidorModel';

export default class Venta {
    id: number;
    fecha: Date;
    folio: string;
    pedido: Pedido;
    vendedor: Repartidor;
    hora: Date;
    estatus: String;

    constructor(id = 1, fecha = new Date(), folio = '', pedido = new Pedido(), vendedor = new Repartidor(), hora = new Time(), estatus = '') {
        this.id = id;
        this.fecha = fecha;
        this.folio = folio;
        this.pedido = pedido;
        this.vendedor = vendedor;
        this.hora = hora;
        this.estatus = estatus;
    }

    getRealmObject() {
        return {
            id: this.id,
            fecha: this.fecha,
            folio: this.folio,
            pedido: this.pedido,
            vendedor: this.vendedor,
            hora: this.hora,
            estatus: this.estatus,
        };
    }

    updateObjectInfo(venta: any) {
        if (!venta)
            return;
        venta['fecha'] = this.fecha;
        venta['folio'] = this.folio;
        venta['pedido'] = this.pedido;
        venta['vendedor'] = this.vendedor;
        venta['hora'] = this.hora;
        venta['estatus'] = this.estatus;
    }

    clone() {
        return new Venta(this.id, this.fecha, this.folio, this.pedido, this.vendedor, this.hora, this.estatus);
    }
}

const VentaSchema = {
    name: 'Venta',
    primaryKey: 'id',
    properties: {
        id: 'int',
        fecha: 'date',
        folio: 'int',
        pedido: 'Pedido',
        vendedor: 'Repartidor',
        hora: 'date',
        estatus: 'string',
    }
}

Venta.schema = VentaSchema