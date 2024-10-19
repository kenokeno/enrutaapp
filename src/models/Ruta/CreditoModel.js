import Cliente from './../Listas/ClienteModel';
import Concepto from './../Catalogos/ConceptoModel';

export default class Credito {
    id: number;
    fecha: Date;
    folio: number;
    concepto: Concepto;
    cliente: Cliente;
    forma_pago: string;
    descripcion: string;
    importe: number;
    saldo: number;

    constructor(
        id = 1,
        fecha = new Date(),
        folio = 1,
        concepto = new Concepto(),
        cliente = new Cliente(),
        forma_pago = '',
        descripcion = '',
        importe = new importe(),
        saldo = 1,) {
        this.id = id;
        this.naturaleza = naturaleza;
        this.fecha = fecha;
        this.folio = folio;
        this.concepto = concepto;
        this.cliente = cliente;
        this.forma_pago = forma_pago;
        this.descripcion = descripcion;
        this.importe = importe;
        this.saldo = saldo;
    }

    getRealmObject() {
        return {
            id: this.id,
            fecha: this.fecha,
            folio: this.folio,
            concepto: this.concepto,
            cliente: this.cliente,
            forma_pago: this.forma_pago,
            descripcion: this.descripcion,
            importe: this.importe,
            saldo: this.saldo,
        }
    }

    updateObjectInfo(credito: any) {
        if (!credito)
            return;
        credito['fecha'] = this.fecha;
        credito['folio'] = this.folio;
        credito['concepto'] = this.concepto;
        credito['cliente'] = this.cliente;
        credito['forma_pago'] = this.forma_pago;
        credito['descripcion'] = this.descripcion;
        credito['importe'] = this.importe;
        credito['saldo'] = this.saldo;
    }

    clone() {
        return new Credito(this.id,
            this.fecha,
            this.folio,
            this.concepto,
            this.cliente,
            this.forma_pago,
            this.descripcion,
            this.importe,
            this.saldo);
    }
}

const CreditoSchema = {
    name: 'Credito',
    primaryKey: 'id',
    properties: {
        id: 'int',
        fecha: 'date',
        folio: 'int',
        concepto: 'Concepto',
        cliente: 'Cliente',
        forma_pago: 'string',
        descripcion: 'int',
        importe: 'float',
        saldo: 'float',
    }
}

Credito.schema = CreditoSchema