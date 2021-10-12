const express = require('express');
const app = express();
const PORT = process.env.PORT || 4200;
const PATH = `${__dirname}/dist/easy-cipher-front`;
const $URL_API = process.env.URL_API;

app.use(express.static(PATH));

app.get('/*', ( req, res) => {
    if(/^\/api\/.*$/.test(req.url)) {
        console.log(`redirecionando para ${$URL_API}${req.url}`);
        res.redirect(`${$URL_API}${req.url}`);
    } else {
        res.sendFile(`${PATH}/index.html`)
    }
});

app.listen(PORT, () => {
    console.log(`start server on port ${PORT} ${$URL_API}`);
})
