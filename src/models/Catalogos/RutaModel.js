import CentroDistribucion from './CentroDistribucionModel';
import Repartidor from './../Listas/RepartidorModel';
import Pedido from './../Ruta/PedidoModel';
import Cliente from './../Listas/ClienteModel';

export default class Ruta {
    id: number;
    nombre: string;
    centro_distribucion: CentroDistribucion;
    repartidores: Repartidor[];
    pedidos: Pedido[];
    clientes: Cliente[];

    constructor(id = 1, nombre = '', centro_distribucion = new CentroDistribucion(), repartidores = [], pedidos = [], clientes = []) {
        this.id = id;
        this.nombre = nombre;
        this.centro_distribucion = centro_distribucion;
        this.repartidores = repartidores;
        this.pedidos = pedidos;
        this.clientes = clientes;
    }

    getRealmObject() {
        return {
            id: this.id,
            nombre: this.nombre,
            centro_distribucion: this.centro_distribucion,
            repartidores: this.repartidores,
            pedidos: this.pedidos,
            clientes: this.clientes,
        };
    }

    updateObjectInfo(ruta: any) {
        if (!ruta)
            return;
        ruta['nombre'] = this.nombre;
        ruta['centro_distribucion'] = this.centro_distribucion;
        ruta['repartidores'] = this.repartidores;
        ruta['pedidos'] = this.pedidos;
        ruta['clientes'] = this.clientes;
    }

    clone() {
        return new Ruta(this.id, this.nombre, this.centro_distribucion.clone, this.repartidores, this.pedidos, this.clientes);
    }
}

const RutaSchema = {
    name: 'Ruta',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nombre: 'string',
        centro_distribucion: 'CentroDistribucion',
        repartidores: {
            type: 'linkingObjects',
            objectType: 'Repartidor',
            property: 'ruta'
        },
        pedidos: {
            type: 'linkingObjects',
            objectType: 'Pedido',
            property: 'ruta'
        },
        clientes: {
            type: 'linkingObjects',
            objectType: 'Cliente',
            property: 'ruta'
        },
    }
}

Ruta.schema = RutaSchema