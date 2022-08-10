const express = require('express');
const cors = require('cors');
const db = require('./models');
const fileupload = require("express-fileupload");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(fileupload());
app.use(express.urlencoded());
app.use(cors());
app.use(express.static(__dirname + '/public'));

const isAdmin = (req, res, next) => {
    if (req.body.owner === '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266') {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
}

app.post('/add/player', isAdmin, (req, res) => {
    const file = req.files.image;
    const fileName = new Date().getTime() + file.name;
    file.mv(__dirname + `/public/${ fileName }`, err => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });

    const { firstName, lastName, price, owner } = req.body;
    db.Player.create({
        firstName,
        lastName,
        fileName,
        price,
        owner,
        image: fileName
    });

    res.status(200).json({
        message: 'Success',
        status: 'success'
    });
});

app.get('/image/:fileName', (req, res) => {
    res.sendFile(__dirname + `/public/${ req.params.fileName }`);
});

app.get('/players', async (req, res) => {
    const players = await db.Player.findAll()
    res.status(200).json(players);
});

app.get('/set/owner', async (req, res) => {
    res.status(200).json({
        owner: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
    });
})


app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});
