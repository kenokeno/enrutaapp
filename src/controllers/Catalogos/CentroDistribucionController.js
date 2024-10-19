import CentroDistribucion from './../../models/Catalogos/CentroDistribucionModel';
import Message from './../../models/Message';
import { isEmpty } from 'lodash';

import Almacen from './../../models/Catalogos/AlmacenModel';
import Empleado from './../../models/Catalogos/EmpleadoModel';

let Realm = require('realm')
let realm = new Realm({ path: 'db.realm', schema: [CentroDistribucion.schema, Almacen.schema, Empleado.schema], schemaVersion: 4 })

// result: boolean
export const createCentroDistribucionCO = (ceDist: CentroDistribucion) => {
    let msg = new Message();
    if (!ceDist) {
        msg.result = false;
        msg.message = 'Centro de Distribucion Inválido';
        return msg;
    }

    ceDist.id = generateId();
    if (checkIfCentroDistribucionExists(ceDist.id)) {
        msg.result = false;
        msg.message = `Centro de Distribucion con id=${ceDist.id} ya existe`;
        return msg;
    }

    try {
        realm.write(() => {
            realm.create('CentroDistribucion', ceDist.getRealmObject());
        });
        msg.result = true;
        msg.message = 'Centro de Distribución guardado correctamente!';
    } catch (e) {
        msg.result = false;
        msg.message = `${e.message}`;
    } finally {
        return msg;
    }
}

const generateId = () => {
    let centrosDist = getAllCentroDistribucion().result;
    if (centrosDist.length == 0)
        return 1;

    let sortedCentrosDist = centrosDist.sorted('id', true); // sort by heroId descending;
    let firstCeDist = sortedCentrosDist[0];
    return firstCeDist['id'] + 1;
}

// result: realm objects
export const getAllCentroDistribucion = () => {
    let msg = new Message();
    try {
        msg.result = realm.objects('CentroDistribucion');
        msg.message = 'Se completo la obtención de todos los centros de distribución!';
    } catch (e) {
        msg.result = [];
        msg.message = 'No se pudo obtener los centros de distribución!';
    } finally {
        return msg;
    }
}

// result: realm object
export const getCentroDistribucionById = (id: number) => {
    let msg = new Message();
    let cdDist = getAllCentroDistribucion().result;
    //if (isEmpty(cdDist))

    let findCeDist = cdDist.filtered(`id=${id}`); // return collections
    if (findCeDist.length == 0) {
        msg.result = null;
        msg.message = `Centro de distribución con id=${id} no encontrado`;
    } else {
        msg.result = findCeDist[0];
        msg.message = `Se encontró el centro de distribución con id=${id}`;
    }

    return msg;
}

const checkIfCentroDistribucionExists = (id: number) => {
    let ceDist = getCentroDistribucionById(id).result;
    return ceDist != null;
}

export const updateCentroDistribucionCO = (ceDist: CentroDistribucion) => {
    let msg = new Message();
    if (!ceDist) {
        msg.result = false;
        msg.message = 'Centro de Distribucion Inválido';
        return msg;
    }

    let findCeDist = getCentroDistribucionById(ceDist.id).result;
    if (!findCeDist) {
        msg.result = false;
        msg.message = `Centro de distribución con id=${ceDist.id} no encontrado`;
        return msg;
    }

    try {
        realm.write(() => {
            ceDist.updateObjectInfo(findCeDist);
        });
        msg.result = true;
        msg.message = `Se actualizó el centro de distribución con id=${ceDist.id} correctamente`;
    } catch (e) {
        msg.result = false;
        msg.message = `No se pudo actualizar el centro de distribución con id=${ceDist.id}: ${e.message}`;
    } finally {
        return msg;
    }
}

export const deleteCentroDistribucionCO = (ceDist: CentroDistribucion) => {
    let msg = new Message();
    let id = ceDist.id;
    if (!ceDist) {
        msg.result = false;
        msg.message = 'Centro de Distribucion Inválido';
        return msg;
    }

    let findCeDist = getCentroDistribucionById(ceDist.id).result;
    if (!findCeDist) {
        msg.result = false;
        msg.message = `Centro de distribución con id=${ceDist.id} no encontrado`;
        return msg;
    }
    try {
        realm.write(() => {
            realm.delete(findCeDist);
        });
        msg.result = true;
        msg.message = `Se eliminó el centro de distribución con id=${id} correctamente`;
    } catch (e) {
        console.log('Ya no entra al error');
        msg.result = false;
        msg.message = `No se pudo eliminar el centro de distribución con id=${id}: ${e.message}`;
    } finally {
        return msg;
    }
}