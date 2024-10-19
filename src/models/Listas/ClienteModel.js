import Ruta from './../Catalogos/RutaModel';
import Suministro from '../Ruta/SuministroModel';

export default class Cliente {
    id: number;
    numero: number;
    nombre: string;
    municipio: string;
    asentamiento: string;
    latitud: number;
    longitud: number;
    activo: boolean;
    ruta: Ruta;

    constructor(id = 1, numero = 1, nombre = '', municipio = '', asentamiento = '', latitud = 1, longitud = 1, activo = true, ruta = new Ruta()) {
        this.id = id;
        this.numero = numero;
        this.nombre = nombre;
        this.municipio = municipio;
        this.asentamiento = asentamiento;
        this.longitud = longitud;
        this.latitud = latitud;
        this.activo = activo;
        this.ruta = ruta;
    }

    getRealmObject() {
        return {
            id: this.id,
            numero: this.numero,
            nombre: this.nombre,
            municipio: this.municipio,
            asentamiento: this.asentamiento,
            latitud: this.latitud,
            longitud: this.longitud,
            activo: this.activo,
            ruta: this.ruta,
        };
    }

    updateObjectInfo(cliente: any) {
        if (!cliente)
            return;
        cliente['numero'] = this.numero;
        cliente['nombre'] = this.nombre;
        cliente['municipio'] = this.municipio;
        cliente['asentamiento'] = this.asentamiento;
        cliente['latitud'] = this.latitud;
        cliente['longitud'] = this.longitud;
        cliente['activo'] = this.activo;
        cliente['ruta'] = this.ruta;
    }

    clone() {
        return new Cliente(this.id, this.numero, this.nombre, this.municipio, this.asentamiento, this.latitud, this.longitud, this.activo, this.ruta);
    }
}

const ClienteSchema = {
    name: 'Cliente',
    primaryKey: 'id',
    properties: {
        id: 'int',
        numero: 'int',
        nombre: 'string',
        municipio: 'string',
        asentamiento: 'string',
        latitud: 'double',
        longitud: 'double',
        activo: 'bool',
        ruta: 'Ruta',
        pedidos: {
            type: 'linkingObjects',
            objectType: 'Pedido',
            property: 'cliente'
        },
        visitas: {
            type: 'linkingObjects',
            objectType: 'Visita',
            property: 'cliente'
        },
        creditos: {
            type: 'linkingObjects',
            objectType: 'Credito',
            property: 'cliente'
        },
        suministros: {
            type: 'linkingObjects',
            objectType: 'Suministro',
            property: 'cliente'
        },
    }
}

Cliente.schema = ClienteSchema