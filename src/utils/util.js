function encodeQueryData(data) {
    const result = []
    for (let key in data) {
        result.push(key + '=' + data[key])
    }
    return '?' + result.join('&')
}

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export default {encodeQueryData, addDays}
