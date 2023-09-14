/*
INSERT INTO place (name, description, coordinates, images)
VALUES
    ('Caffe Greco', 'Start your day with a cup of coffee and a pastry...', '{"lat": 30.0553, "lng": 31.2324}', '{"https://cdn.freecodecamp.org/curriculum/cat-photo-app/cats.jpg"}'),
INSERT INTO trips (duration, Destination, Month, activies, places)
VALUES (1, 'Cairo Egypt', 'March', '{"Swimming", "walking", "eating", "museum"}', ARRAY['0','1','2','3','4'] ),


    */

const db = require("../../../connectors/db.js");
const bodyParser = require("body-parser");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post("/insertTrip", async function (req, res) {
    // the req will containt the whole trip with all places.
    // each one of the following is an array of the same length
    const {
      name,
      description,
      coordinates,
      images,
      duration,
      Destination,
      Month,
      activies,
    } = req.body;
    const currUser = res.locals.user;
    console.log(currUser);
    if (!name || !description || !coordinates || !images) {
      return res
        .status(400)
        .send("name, content, country, and images are required fields.");
    }
    let placeIds = [];
    for (let i = 0; i < name.length; i++) {
      const post = {
        name: name[i],
        description: description[i],
        coordinates: coordinates[i],
        images: images[i],
      };
      console.log(post);
      try {
        const addPlace = await db("place").insert(post).returning("*");
        console.log(addPlace);
        addPlace.id = addPlace[0].id;
        console.log(addPlace);
        placeIds.push(addPlace);
      } catch (err) {
        console.error(err.message);
      }
      try {
        const addTrip = await db("trips")
          .insert({
            duration: duration,
            Destination: Destination,
            Month: Month,
            activies: activies,
            places: placeIds,
          })
          .returning("*");
        console.log(addTrip);
        return res.status(200).json("Post added successfully");
      } catch (err) {
        console.error(err.message);
        return res.status(400).send("Error: Could not create your post");
      }
    }
  });
};
