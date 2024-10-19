import Almacen from './../Catalogos/AlmacenModel';
import Producto from './../Listas/ProductoModel';
import Caja from './../Listas/CajaModel';
import Concepto from './../Catalogos/ConceptoModel';

export default class Inventario {
    id: number;
    fecha: Date;
    folio: number;
    concepto_movimiento: Concepto;
    almacen: Almacen;
    descripcion: string;
    producto: Producto;
    caja: Caja;
    unidades: number;
    unidades_actuales: number;
    comprometidas: number;
    ubicacion: string;

    constructor(
        id = 1,
        fecha = new Date(),
        folio = 1,
        concepto_movimiento = new Concepto(),
        almacen = new Almacen,
        descripcion = '',
        producto = new Producto(),
        caja = new Caja(),
        unidades = 1,
        unidades_actuales = 1,
        comprometidas = 1,
        ubicacion = '',) {
        this.id = id;
        this.fecha = fecha;
        this.folio = folio;
        this.concepto_movimiento = concepto_movimiento;
        this.almacen = almacen;
        this.descripcion = descripcion;
        this.producto = producto;
        this.caja = caja;
        this.unidades = unidades;
        this.unidades_actuales = unidades_actuales;
        this.comprometidas = comprometidas;
        this.ubicacion = ubicacion;
    }

    getRealmObject() {
        return {
            id: this.id,
            fecha: this.fecha,
            folio: this.folio,
            concepto_movimiento: this.concepto_movimiento,
            almacen: this.almacen,
            descripcion: this.descripcion,
            producto: this.producto,
            caja: this.caja,
            unidades: this.unidades,
            comprometidas: this.comprometidas,
            unidades_actuales: this.unidades_actuales,
            ubicacion: this.ubicacion,
        }
    }

    updateObjectInfo(inventario: any) {
        if (!etiqueta)
            return;
        inventario['fecha'] = this.fecha;
        inventario['folio'] = this.folio;
        inventario['concepto_movimiento'] = this.concepto_movimiento;
        inventario['almacen'] = this.almacen;
        inventario['descripcion'] = this.descripcion;
        inventario['producto'] = this.producto;
        inventario['caja'] = this.caja;
        inventario['unidades'] = this.unidades;
        inventario['unidades_actuales'] = this.unidades_actuales;
        inventario['comprometidas'] = this.comprometidas;
        inventario['ubicacion'] = this.ubicacion;
    }

    clone() {
        return new Producto(this.id,
            this.fecha,
            this.folio,
            this.concepto_movimiento,
            this.almacen,
            this.descripcion,
            this.producto,
            this.caja,
            this.unidades,
            this.comprometidas,
            this.unidades_actuales,
            this.ubicacion);
    }
}

const InventarioSchema = {
    name: 'Inventario',
    primaryKey: 'id',
    properties: {
        id: 'int',
        fecha: 'date',
        folio: 'int',
        concepto_movimiento: 'Concepto',
        almacen: 'Almacen',
        descripcion: 'string',
        producto: 'Producto',
        caja: 'Caja',
        unidades: 'int',
        unidades_actuales: 'int',
        comprometidas: 'int',
        ubicacion: 'string',
    }
}

Inventario.schema = InventarioSchema