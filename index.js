const express = require('express');

const app = express();
require('./startup/db')();
require('./startup/routes')(app);

const port = process.env.PORT || 4040;

app.get('/', (req, res) => {
    res.send('Hi');
});

app.listen(port, () => console.log(`connected the port : ${port}`));
