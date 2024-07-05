const Router = require('express')
const path = require('path');
const Dbconnect = require('../controlers/dbConnetcion');

const router = Router();

// Handling GET request for the root path
router.get('/', async (req, res) => {
    const dbconnect = new Dbconnect();
    try {
        const data = await dbconnect.get_data('SELECT * FROM posts ORDER BY id;');
        console.log(`Datos: ${data}`);
        
        res.render('posts', data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

// Handling GET request for liked posts
router.get('/liked_posts/', async (req, res) => {
    const dbconnect = new Dbconnect();
    try {
        const data = await dbconnect.get_liked('SELECT * FROM liked_posts');
        console.log(`Datos: ${data}`);
        res.render('liked_posts', { data: data });
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

// Exporting the router to be used in the main application
module.exports = router;
