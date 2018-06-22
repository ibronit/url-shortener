const shortid = require('shortid');

const domain = 'https://short-url/';

exports.generateUrl = function () {        
    return domain + shortid.generate();    
}