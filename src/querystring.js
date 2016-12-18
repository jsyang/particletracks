/**
 * @param {Object} obj
 * @returns {string}
 */
function fromDict(obj) {
    var key, keyValuePairs;
    keyValuePairs = [];
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            keyValuePairs.push(key + '=' + obj[key]);
        }
    }
    return encodeURIComponent(keyValuePairs.join('&'));
}

/**
 * @static
 * @param {string} querystring
 * @returns {Object}
 */
function toDict(querystring) {
    var strings, obj;
    //noinspection AssignmentToFunctionParameterJS
    querystring = querystring.replace(/^\?/, '');
    strings     = decodeURIComponent(querystring).split('&');

    if (strings[0]) {
        obj = {};

        strings.forEach(function (v) {
            var query     = v.split('=');
            obj[query[0]] = query[1] || '';
        });

        return obj;

    } else {
        return undefined;
    }
}

module.exports = {
    fromDict : fromDict,
    toDict   : toDict
};