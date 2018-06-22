const UrlShortener = require('./UrlShortener');
const ShorthandIsNotUnique = require('../exception/ShorthandIsNotUnique');

let storage = [];

exports.store = function (url, shorthand = null) {    
    if (shorthand) {
        validateShorthand(shorthand);
        storage.push({ original_url: url, shorthand: shorthand });
        return;
    }

    shorthand = UrlShortener.generateUrl();
    storage.push({ original_url: url, shorthand: shorthand });
}

function getByShorthand (shorthand) {
    return storage.find((obj) => {
        return obj.shorthand === shorthand;
    });
} 

function validateShorthand (shorthand) {
    if (getByShorthand(shorthand)) {
        const err = new ShorthandIsNotUnique(`Shorthand: ${shorthand} already exists`);
        throw err;
    }    
}

exports.storage = storage;