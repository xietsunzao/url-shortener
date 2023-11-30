require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', function (req, res) {
    const { url } = req.body;
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(url)) {
        res.json({ error: 'invalid url' });
    }

    const shortUrl = Math.floor(Math.random() * 100000).toString();

    res.json({ original_url: url, short_url: shortUrl });
});

app.listen(port, function () {
    console.log(`Listening on port http://localhost:${port}`);
});
