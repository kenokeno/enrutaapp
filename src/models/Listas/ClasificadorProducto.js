import ValorClasificador from './../Catalogos/ValorClasificadorModel';

export default class ClasificadorProducto {
    id: number;
    clasificadores: ValorClasificador[];

    constructor(id = 1, clasificadores = []) {
        this.id = id;
        this.clasificadores = clasificadores;
    }

    getRealmObject() {
        return {
            id: this.id,
            clasificadores: this.clasificadores,
        };
    }

    updateObjectInfo(clasificadores_producto: any) {
        if (!proveedor)
            return;
        clasificadores_producto['clasificadores'] = this.clasificadores;
    }

    clone() {
        return new ClasificadorProducto(this.id, this.clasificadores);
    }
}

const ClasificadorProductoSchema = {
    name: 'ClasificadorProducto',
    embedded: true,
    properties: {
        clasificadores: 'ValorClasificador[]',
    }
}

ClasificadorProducto.schema = ClasificadorProductoSchema