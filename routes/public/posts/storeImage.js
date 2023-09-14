const db = require("../../../connectors/db.js");
const bodyParser = require("body-parser");
const multer = require("multer");
const express = require("express");
const path = require("path");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("routes/public/uploads"));
  const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../uploads/"));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        new Date().toISOString().replace(/:/g, "-") + "--" + file.originalname
      ); // After new Date().toISOString() add replace() to change ":" to an accepted character.
      //Windows OS doesn't accept files with a ":"
    },
  });
  app.use(multer({ storage: fileStorageEngine }).single("image"));
  app.post("/uploadPost", async function (req, res) {
    const { user_id, description } = req.body;
    const { filename } = req.file;
    const newPost = {
      user_id,
      description,
      images: [filename],
    };
    const post = await db("posts").insert(newPost).returning("*");
    console.log(post);
    return res.status(200).send("Image uploaded successfully");
  });

  app.get("/api/getPostImage/:postId", async (req, res) => {
    const postId = req.params.postId;
    const imageName = await db("posts")
      .select("images")
      .where("id", postId)
      .first();
    res.sendFile(imageName.images[0], { root: "routes/public/uploads" });
  });

  app.get("/api/getPostDetials/:postId", async (req, res) => {
    const postId = req.params.postId;
    const queryResult = await db("posts").where("id", postId).first();
    const responseData = {
      user_id: queryResult.user_id,
      description: queryResult.description,
    };
    res.status(200).json(responseData);
  });
};
