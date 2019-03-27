const express = require('express');
const app = express();

require('./app/startup/db')();
require('./app/startup/routes')(app);

const port = process.env.PORT || 4040;

app.listen(port, () => console.log(`connected the port : ${port}`));
