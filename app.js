const express = require('express');
const app = express();
const mainRouters = require('./routers/routers.main');
const likeRouters = require('./routers/routers.like');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/', mainRouters);
app.use('/like', likeRouters);

const HOST = 'localhost';
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running: http://${HOST}:${PORT}`);
});
