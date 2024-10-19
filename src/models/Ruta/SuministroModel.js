import Activo from '../Listas/ActivoModel';
import Cliente from '../Listas/ClienteModel';

export default class Suministro {
    id: number;
    activo: Activo;
    cliente: Cliente;
    fecha: Date;
    tipo_operacion: string;
    cantidad: number;
    cantidad_adeudada: number;

    constructor(id = 1, activo = new Activo(), cliente = new Cliente(), fecha = new Date(), tipo_operacion = '', cantidad = 1, cantidad_adeudada = 1) {
        this.id = id;
        this.activo = activo;
        this.cliente = cliente;
        this.fecha = fecha;
        this.tipo_operacion = tipo_operacion;
        this.cantidad = cantidad;
        this.cantidad_adeudada = cantidad_adeudada;
    }

    getRealmObject() {
        return {
            id: this.id,
            activo: this.activo,
            cliente: this.cliente,
            fecha: this.fecha,
            tipo_operacion: this.tipo_operacion,
            cantidad: this.cantidad,
            cantidad_adeudada: this.cantidad_adeudada,
        };
    }

    updateObjectInfo(suministro: any) {
        if (!almacen)
            return;
        suministro['activo'] = this.activo;
        suministro['cliente'] = this.cliente;
        suministro['fecha'] = this.fecha;
        suministro['tipo_operacion'] = this.tipo_operacion;
        suministro['cantidad'] = this.cantidad;
        suministro['cantidad_adeudada'] = this.cantidad_adeudada;
    }

    clone() {
        return new Suministro(this.id, this.activo, this.cliente, this.fecha, this.tipo_operacion, this.cantidad, this.cantidad_adeudada);
    }
}

const SuministroSchema = {
    name: 'Suministro',
    primaryKey: 'id',
    properties: {
        id: 'int',
        activo: 'Activo',
        cliente: 'Cliente',
        fecha: 'string',
        tipo_operacion: 'string',
        cantidad: 'int',
        cantidad_adeudada: 'int'
    }
}

Suministro.schema = SuministroSchema