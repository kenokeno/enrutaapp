import { realm } from './../db';
import Message from './../models/Message';
import messages from './../constants/messages';

// result: boolean
export const createRegistry = (payload) => {
    const { registry, model } = payload;
    let msg = new Message();
    if (!registry) {
        msg.result = false;
        msg.message = messages.REGISTRO_INVALIDO;
        return msg;
    }
    registry.id = generateId(model);
    if (checkIfRegistryExists(registry.id, model)) {
        msg.result = false;
        msg.message = messages.REGISTRO_YA_EXISTE + registry.id;
        return msg;
    }
    try {
        realm.write(() => {
            realm.create(model, registry.getRealmObject());
        });
        msg.result = true;
        msg.message = messages.REGISTRO_GUARDADO;
    } catch (e) {
        msg.result = false;
        msg.message = messages.REGISTRO_ERROR + ': ' + e.message;
    } finally {
        return msg;
    }
}

const generateId = (model) => {
    const payload = {
        model: model,
    }
    let registries = getAllRegistries(payload).result;
    if (registries.length == 0)
        return 1;
    let sortRegistries = registries.sorted('id', true); // sort by heroId descending;
    let firstRegistry = sortRegistries[0];
    return firstRegistry['id'] + 1;
}

// result: realm objects
export const getAllRegistries = (payload) => {
    const { model } = payload;
    let msg = new Message();
    try {
        msg.result = realm.objects(model);
        msg.message = messages.REGISTROS_RECUPERADOS;
    } catch (e) {
        msg.result = [];
        msg.message = messages.REGISTROS_RECUPERADOS_ERROR + ': ' + e.message;
    } finally {
        return msg;
    }
}

// result: realm object
export const getRegistryById = (id: number, model) => {
    let msg = new Message();
    const payload = {
        model: model,
    };
    let registry = getAllRegistries(payload).result;
    let findRegistry = registry.filtered(`id=${id}`); // return collections
    if (findRegistry.length == 0) {
        msg.result = null;
        msg.message = messages.REGISTROS_RECUPERADO_ERROR + id;
    } else {
        msg.result = findRegistry[0];
        msg.message = messages.REGISTROS_RECUPERADO + id;
    }

    return msg;
}

const checkIfRegistryExists = (id: number, model) => {
    let registry = getRegistryById(id, model).result;
    return registry != null;
}

export const updateRegistry = (payload) => {
    const { registry, model } = payload;
    let msg = new Message();
    if (!registry) {
        msg.result = false;
        msg.message = messages.REGISTRO_INVALIDO;
        return msg;
    }

    let findRegistry = getRegistryById(registry.id, model).result;
    if (!findRegistry) {
        msg.result = false;
        msg.message = messages.REGISTROS_RECUPERADO_ERROR + registry.id;
        return msg;
    }

    try {
        realm.write(() => {
            registry.updateObjectInfo(findRegistry);
        });
        msg.result = true;
        msg.message = messages.REGISTRO_ACTUALIZADO + registry.id;
    } catch (e) {
        msg.result = false;
        msg.message = messages.REGISTRO_ERROR + registry.id + ': ' + e.message;
    } finally {
        return msg;
    }
}

export const deleteRegistry = (payload) => {
    const { registry, model } = payload;
    let msg = new Message();
    let id = registry.id;
    if (!registry) {
        msg.result = false;
        msg.message = messages.REGISTRO_INVALIDO;
        return msg;
    }

    let findRegistry = getRegistryById(registry.id, model).result;
    if (!findRegistry) {
        msg.result = false;
        msg.message = messages.REGISTROS_RECUPERADO_ERROR + registry.id;
        return msg;
    }
    try {
        realm.write(() => {
            realm.delete(findRegistry);
        });
        msg.result = true;
        msg.message = messages.REGISTRO_ELIMINADO + id;
    } catch (e) {
        msg.result = false;
        msg.message = messages.REGISTRO_ELIMINADO_ERROR + id + ': ' + e.message;
    } finally {
        return msg;
    }
}

export const saveItem = async (keyName, keyValue) => {
    try {
        await AsyncStorage.setItem(keyName, keyValue);
        return true;
    } catch (e) {
        return false;
    }
}

export const getItem = async (keyName) => {
    try {
        return await AsyncStorage.getItem(keyName);;
    } catch (e) {
        return false;
    }
}

export const clearAll = async () => {
    try {
        return await AsyncStorage.clear();
    } catch (e) {
        return false;
    }
}