const { sorgu } = require('./sorgu.js');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
////////////////////////////// GET - POST //////////////////////////////
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/post', async (req, res) => {
    let {
        id
    } = req.body;
    if(!id || isNaN(id)) return res.send('<center><h1>Geçersiz ID!</h1></center>');

    const sonuc = await sorgu(id);
    res.render('result', {
        result: sonuc
    });
});

////////////////////////////// GET - POST //////////////////////////////

app.listen(80, () => {
    console.log(`Site başlatıldı! Port: 80`);
});