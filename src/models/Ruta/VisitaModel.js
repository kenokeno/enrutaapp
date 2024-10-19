import Pedido from './PedidoModel';
import Cliente from './../Listas/ClienteModel';

export default class Visita {
    id: number;
    fecha: Date;
    cliente: Cliente;
    pedido: Pedido;
    estatus: string;
    observaciones: string;

    constructor(id = 1, cliente = new Cliente(), fecha = new Date(), pedido = new Pedido(), estatus = '', observaciones = '') {
        this.id = id;
        this.fecha = fecha;
        this.cliente = cliente;
        this.pedido = pedido;
        this.estatus = estatus;
        this.observaciones = observaciones;
    }

    getRealmObject() {
        return {
            id: this.id,
            activo: this.activo,
            cliente: this.cliente,
            fecha: this.fecha,
            pedido: this.pedido,
            estatus: this.estatus,
            observaciones: this.observaciones,
        };
    }

    updateObjectInfo(visita: any) {
        if (!almacen)
            return;
        visita['fecha'] = this.fecha;
        visita['cliente'] = this.cliente;
        visita['pedido'] = this.pedido;
        visita['estatus'] = this.estatus;
        visita['observaciones'] = this.observaciones;
    }

    clone() {
        return new Suministro(this.id, this.fecha, this.cliente, this.pedido, this.estatus, this.observaciones);
    }
}

const VisitaSchema = {
    name: 'Visita',
    primaryKey: 'id',
    properties: {
        id: 'int',
        fecha: 'date',
        cliente: 'Cliente',
        pedido: 'Pedido',
        estatus: 'string',
        observaciones: 'string',
    }
}

Visita.schema = VisitaSchema
