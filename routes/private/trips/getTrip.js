const db = require("../../../connectors/db.js");
const bodyParser = require("body-parser");
const { isEmpty } = require("lodash");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Define the API endpoint to get trip by ID
  app.get("/trip/:trip_id", async function (req, res) {
    try {
      const { trip_id } = req.params;

      // Fetch the trip by ID
      const trip = await db("trips").where("id", trip_id).first();

      if (!trip) {
        return res.status(404).json({ error: "Trip not found" });
      }

      // Fetch days associated with the trip
      const days = await db("day").where("trip_id", trip_id);
      console.log(days);
      return res.status(200).send({ days });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};
