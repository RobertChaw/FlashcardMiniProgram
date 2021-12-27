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
    return result.getTime();
}

function now() {
    return +new Date
}

function getPixelRatio() {
    let pixelRatio = 0
    wx.getSystemInfo({
        success: function (res) {
            pixelRatio = res.pixelRatio
        },
        fail: function () {
            pixelRatio = 0
        }
    })
    return pixelRatio
}

export default {encodeQueryData, addDays, now, getPixelRatio}
