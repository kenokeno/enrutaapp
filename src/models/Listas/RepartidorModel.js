import Ruta from '../Catalogos/RutaModel';

export default class Repartidor {
    id: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    ruta: Ruta;
    password: string;
    activo: boolean;

    constructor(id = 1, nombre = '', apellido_paterno = '', apellido_materno = '', password = '', activo = true, ruta = new Ruta()) {
        this.id = id;
        this.nombre = nombre;
        this.apellido_paterno = apellido_paterno;
        this.apellido_materno = apellido_materno;
        this.password = password;
        this.activo = activo;
        this.ruta = ruta;
    }

    getRealmObject() {
        return {
            id: this.id,
            nombre: this.nombre,
            apellido_paterno: this.apellido_paterno,
            apellido_materno: this.apellido_materno,
            password: this.password,
            activo: this.activo,
            ruta: this.ruta,
        };
    }

    updateObjectInfo(repartidor: any) {
        if (!repartidor)
            return;
        repartidor['nombre'] = this.nombre;
        repartidor['apellido_paterno'] = this.apellido_paterno;
        repartidor['apellido_materno'] = this.apellido_materno;
        repartidor['password'] = this.password;
        repartidor['activo'] = this.activo;
        repartidor['ruta'] = this.ruta;
    }

    clone() {
        return new Repartidor(this.id, this.nombre, this.apellido_paterno, this.apellido_materno, this.password, this.activo, this.ruta);
    }
}

const RepartidorSchema = {
    name: 'Repartidor',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nombre: 'string',
        apellido_paterno: 'string',
        apellido_materno: 'string',
        password: 'string',
        activo: 'bool',
        ruta: 'Ruta',
        pedidos: {
            type: 'linkingObjects',
            objectType: 'Pedido',
            property: 'vendedor'
        },
        ventas: {
            type: 'linkingObjects',
            objectType: 'Venta',
            property: 'vendedor'
        },
    }
}

Repartidor.schema = RepartidorSchema