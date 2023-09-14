const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/posts', async function (req, res) {
        const { title, images, description, country, city, tags } = req.body;
        const currUser = res.locals.user;

        if (!title || !description || !country || !city) {
            return res.status(400).send('Title, content, country, and city are required fields.');
          }
          
        if (description.length > 1000) {
            return res.status(400).send('Error: Description is longer than 1000 characters');
        }

        let addImages = ""
        if (images !== undefined) {
            addImages = images.split(',');
        } else {
            addImages = null
        }

        let addTags = ""
        if (tags !== undefined) {
            addTags = tags.split(',');
        } else {
            addTags = null
        }

        const post = {
            title,
            country,
            city,
            images: addImages,
            tags: addTags,
            description,
            postdate: new Date(),
            user_id: currUser.id
        };

        try {
            const addPost = await db('posts').insert(post).returning('*');
            return res.status(200).json('Post added successfully');
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('Error: Could not create your post');
        }
    });
};
