const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const isAdmin = (req, res, next) => {
    if (req.body.address === 'admin_address') {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
}

app.post('/add/player',isAdmin, (req, res) => {
    const { firstName, lastName, image, nft_id } = req.body;
    db.Player.create({
        firstName,
        lastName,
        image,
        nft_id
    });

    res.status(200).json({
        firstName,
        lastName,
        image,
        nft_id
    });
});

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});