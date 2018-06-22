const express = require("express");
const bodyParser = require('body-parser');
const UrlStorage = require('./module/UrlStorage');
const ShorthandIsNotUnique = require('./exception/ShorthandIsNotUnique');
const app = express();

app.use(bodyParser.json());

app.post('/api/create', (req, res) => {
    if (req.body.original_url == null) {
        res.sendStatus(400);
    }

    try {
        const shorthand = req.body.shorthand || null;
        UrlStorage.store(req.body.original_url, shorthand);
    } catch (e) {        
        if (e instanceof ShorthandIsNotUnique) {
            res.sendStatus(409);
        }
        throw e;
    }    

    res.json(UrlStorage.storage);
});

app.listen(3000, () => console.log('App listening on port 3000!'))