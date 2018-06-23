const shortid = require('shortid');
const Config = require('dotenv-extended').load();

exports.generateUrl = function () {
    return `${Config.DOMAIN}:${Config.PORT}/` + shortid.generate();
}