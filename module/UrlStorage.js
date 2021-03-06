const shortid = require('shortid');
const ShorthandIsNotUnique = require('../exception/ShorthandIsNotUnique');

let storage = [];

exports.store = function (url, shorthand = null) {
    if (shorthand) {
        validateShorthand(shorthand);
        const urls = { original_url: url, shorthand: shorthand };
        storage.push(urls);
        return urls;
    }

    shorthand = { shorthand: shortid.generate() };
    storage.push({ original_url: url, ...shorthand });
    return shorthand;
}

function getByShorthand(shorthand) {
    return storage.find((obj) => {
        return obj.shorthand === shorthand;
    });
}

function validateShorthand(shorthand) {
    if (getByShorthand(shorthand)) {
        const err = new ShorthandIsNotUnique(`Shorthand: "${shorthand}" already exists`);
        throw err;
    }
}

exports.getByShorthand = getByShorthand;