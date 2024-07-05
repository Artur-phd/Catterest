
-- CONFIG DATABASE

-- Create table for posts
CREATE TABLE posts (
    id INTEGER PRIMARY KEY,       -- Unique identifier for each post
    title VARCHAR(100),           -- Title of the post
    url_to VARCHAR(100),          -- URL associated with the post
    likes INTEGER                 -- Number of likes for the post
);

-- Create table for liked posts
CREATE TABLE likedposts (
    url_to VARCHAR(100)           -- URL of the liked post
);

-- Insert initial data into posts table
INSERT INTO posts (id, title, url_to, likes)
VALUES 
    (1, 'Cat', 'https://http.cat/201', 0),
    (2, 'Cat', 'https://http.cat/205', 0),
    (3, 'Cat', 'https://http.cat/200', 0),
    (4, 'Cat', 'https://http.cat/404', 0);
