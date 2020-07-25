const express = require('express');
const app = express();
const routes = require('./routes/routes');

const initDB = require('./server');

// app.use('/', routes);

initDB().then(db => {
    routes(app, db).listen(3000, () => console.log('Server started on port 3000'))
}).catch(() => {
    console.error('Failed to Make DB connection!!!');
    process.exit(1);
});