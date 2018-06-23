const express = require("express");
const bodyParser = require('body-parser');
const UrlStorage = require('./module/UrlStorage');
const ShorthandIsNotUnique = require('./exception/ShorthandIsNotUnique');
const Config = require('dotenv-extended').load();
const app = express();

app.use(bodyParser.json());

app.post('/api/create', (req, res) => {
    if (req.body.original_url == null) {
        return res.status(400).json({ 'error': 'original_url is missing from the request body' });
    }

    try {
        const shorthand = req.body.shorthand || null;
        const storedUrls = UrlStorage.store(req.body.original_url, shorthand);
        return res.status(201).json(storedUrls);
    } catch (e) {
        if (e instanceof ShorthandIsNotUnique) {
            return res.status(409).json({ 'error': e.message });
        }
        throw e;
    }
});

app.get('/:shorthand', (req, res) => {
    const shorthand = req.params.shorthand;
    const urls = UrlStorage.getByShorthand(shorthand);
    if (urls == null) {
        return res.status(404).json({ 'error': `URL for: "${shorthand}" not found` });
    }
    res.redirect(urls.original_url);
});

app.listen(Config.PORT, () => console.log(`App listening on port ${Config.PORT}!`))