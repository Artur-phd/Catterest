const express = require('express');
const Dbconnect = require('../controlers/dbConnetcion');
const router = express.Router();

// Handling POST request for liking a post
router.post('/post/:code', async (req, res) => {
    try {
        const dbconnect = new Dbconnect();
        const link = `https://http.cat/${req.params.code}`;

        const data = await dbconnect.get_data("SELECT * FROM posts WHERE url_to = $1;", [link]);
        const likes = data["post_1"][1];

        res.send({likes: likes})
        // Updating the likes count in the database
        await dbconnect.post_data("UPDATE posts SET likes = $1 WHERE url_to = $2", [(likes + 1), link]);
        // Inserting the post URL into the likedposts table
        await dbconnect.post_data("INSERT INTO liked_posts (url_to) VALUES ($1)", [link]);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

module.exports = router; // Exporting the router to be used in the main application
