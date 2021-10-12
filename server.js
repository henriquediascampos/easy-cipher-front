const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4200;
const PATH = `${__dirname}/dist/easy-cipher-front`;

app.use(express.static(PATH));

app.get('/*', ( req, res) => {
    res.sendFile(`${PATH}/index.html`)
});

app.listen(PORT, () => {
    console.log(`start server on port ${PORT}`);
})
