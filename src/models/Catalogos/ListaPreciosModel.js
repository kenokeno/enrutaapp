export default class ListaPrecios {
    id: number;
    nombre: string;
    activo: boolean;

    constructor(id = 1, nombre = '', activo = true) {
        this.id = id;
        this.nombre = nombre;
        this.activo = activo;
    }

    getRealmObject() {
        return {
            id: this.id,
            nombre: this.nombre,
            activo: this.activo,
        };
    }

    updateObjectInfo(lista_precios: any) {
        if (!lista_precios)
            return;
        lista_precios['nombre'] = this.nombre;
        lista_precios['activo'] = this.activo;
    }

    clone() {
        return new ListaPrecios(this.id, this.nombre, this.activo);
    }
}

const ListaPreciosSchema = {
    name: 'ListaPrecios',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nombre: 'string',
        activo: 'bool',
    }
}

ListaPrecios.schema = ListaPreciosSchema