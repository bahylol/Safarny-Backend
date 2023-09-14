const db = require("../../../connectors/db.js");
const bodyParser = require("body-parser");
const { v4 } = require('uuid');

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // 
  app.post("/company-requests/:requestId", async function (req, res) {
    const requestId = req.params.requestId;
    const { status } = req.body;
    const newToken=v4();
    try {
      // Check if the request exists and is pending
      const existingRequest = await db("companyrequest")
        .select("*")
        .where("companyrequest_id", requestId)
        .first();

      if (!existingRequest) {
        return res.status(404).send("Company request not found");
      }

      if (existingRequest.status !== "Pending") {
        return res.status(400).send("The company request is not pending");
      }

      if (status === "Accepted") {
        // Update the company request status and company ID
        await db("companyrequest")
          .where("companyrequest_id", requestId)
          .update({
            status: "Accepted",
          });
      } else if (status === "Rejected") {
        // Update the company request status
        await db("companyrequest")
          .where("companyrequest_id", requestId)
          .update({ status: "Rejected" });
      } else {
        return res.status(400).send("Invalid status specified");
      }

      return res
        .status(200)
        .json({ message: "Company request processed successfully" });
    } catch (err) {
      console.error(err.message);
      return res
        .status(400)
        .send("An error occurred. Could not process the company request");
    }
  });
};
