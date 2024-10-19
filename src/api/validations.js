export function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function isNumberFormatValidate(num) {
    //const re = /^[0-9]*(\.?)[0-9]+$/;
    if (+num === +num) {
        return true;
    }
    return false;
}