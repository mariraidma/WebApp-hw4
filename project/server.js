const express = require('express');
const pool = require('./database');
const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.listen(3000, () => {
    console.log("Server is listening to port 3000")
});

app.get('/posts', async(req, res) => {
    try {
        console.log("get posts request has arrived");
        const posts = await pool.query(
            "SELECT * FROM nodetable"
        );
        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/posts/', async(req, res) => {
    try {
        console.log("a post request has arrived");
        const post = req.body;
        const newpost = await pool.query(
            "INSERT INTO nodetable(title, body, urllink) values ($1, $2, $3) RETURNING*", [post.title, post.body, post.urllink]);
        res.json( newpost );
    } catch (err) {
        console.error(err.message);
    }
});

app.put('/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const post = req.body;
        console.log("update request has arrived");
        const updatepost = await pool.query(
            "UPDATE nodetable SET (title, body, urllink) = ($2, $3, $4) WHERE id =$1", [id, post.title, post.body, post.urllink]);
        res.json(post);
    } catch (err) {
        console.error(err.message);
    }
});