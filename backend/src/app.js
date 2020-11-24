const express = require('express');
const router = require('./routes');

require('./database');

const app = express();

app.use('/assets', express.static(`${__dirname}/assets/`));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', router);

app.listen(3000);
