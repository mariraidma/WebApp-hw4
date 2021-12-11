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