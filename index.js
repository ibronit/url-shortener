const express = require("express");
const bodyParser = require('body-parser');
const UrlStorage = require('./module/UrlStorage');
const ShorthandIsNotUnique = require('./exception/ShorthandIsNotUnique');
const app = express();

app.use(bodyParser.json());

app.post('/api/create', (req, res) => {
    if (req.body.original_url == null) {
        res.status(400).json({'error': 'original_url is missing from the request body'});
    }

    try {
        const shorthand = req.body.shorthand || null;
        const storedUrls = UrlStorage.store(req.body.original_url, shorthand);
        res.status(201).json(storedUrls);
    } catch (e) {        
        if (e instanceof ShorthandIsNotUnique) {            
            res.status(409).json({'error': e.message});
        }
        throw e;
    }    
});

app.listen(3000, () => console.log('App listening on port 3000!'))