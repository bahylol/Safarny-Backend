const db = require("../../../connectors/db.js");
const bodyParser = require("body-parser");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Define the API endpoint to get trip by ID
  app.post("/saveTrip", async function (req, res) {
    try {
      console.log("saveTrip");
      //   const { trip_id } = req.params;
      const { trip_id } = req.body;
      // Fetch the trip by ID
      const currentUser = res.locals.user.id;
      console.log(currentUser);
      //check if the user has the trip in his table
      const usertrip = await db("usertrips")
        .where("user_id", currentUser)
        .andWhere("trip_id", trip_id)
        .first();
    //   console.log(usertrip);
    console.log("jreeeeee");
      if (usertrip) {
        return res.status(404).json({ error: "Trip already saved" });
      }

      // insert it in usertrip table

      usertrip = await db("usertrips").insert({
        user_id: currentUser,
        trip_id: trip_id,
        name: `trip${trip_id} of user ${currentUser}`,
      });
      console.log(usertrip);
      return res.status(200).send({ usertrip });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};
