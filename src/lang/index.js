const IT = require("./it/data.json");
const EN = require("./en/data.json");
const ES = require("./es/data.json");
const DE = require("./de/data.json");
const FR = require("./fr/data.json");

function Language(arg) {
    // console.log(typeof arg);
    if (typeof arg === 'object') {
        return arg;
    }
    switch (arg.trim().toLowerCase()) {
        case 'it':
            return IT;
        case 'es':
            return ES;
        case 'de':
            return DE;
        case 'fr':
            return FR;
        case 'en':
        default:
            return EN;
    }
}

module.exports = Language;
