import { size, isEmpty, isUndefined, forEach, isEqual, mapValues } from 'lodash';

const validateFieldRequired = (campo, value) => {
    var errores = [];
    if (isEqual(value, "")) errores.push(`El ${campo} nombre es obligatorio`);
    return errores;
};

const validateFieldSize = (errores, campo, value, size) => {
    if (size(value) < size) errores.push(`El campo ${campo} debe ser mayor a ${size} caracteres`);
};
