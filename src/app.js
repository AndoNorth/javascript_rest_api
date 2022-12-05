const Joi = require("joi"); // npm i joi@13.1.0
const express = require("express"); // npm i express
const bodyParser = require("body-parser"); // npm i body-parser

const app = express();
const jsonParser = bodyParser.json();
app.use(jsonParser);
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

const videos = [
  //   { id: 1, likes: 10, name: "ando's funny video", views: 121 },
  //   { id: 2, likes: 1420, name: "how to make paper planes", views: 42000 },
  //   { id: 3, likes: 23099, name: "awesome flip", views: 929299 },
];
const endPoint = "/videos/:id(\\d+)";
// get videos
app.get("/videos", (req, res) => {
  res.send(videos);
});
app.get(endPoint, (req, res) => {
  const video = videos.find((v) => v.id === parseInt(req.params.id));
  if (!video) {
    return res.status(404, "The video id was not found");
  }
  res.send(video);
});
// add video
app.post(endPoint, (req, res) => {
  const schema = {
    name: Joi.string().required(),
    likes: Joi.number().required(),
    views: Joi.number().required(),
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message); // can loop through all errors
  }

  const video = {
    id: parseInt(req.params.id),
    name: req.body.name,
    likes: parseInt(req.body.likes),
    views: parseInt(req.body.views),
  };

  videos.push(video);
  res.send(video);
});
// update video
app.put(endPoint, (req, res) => {
  const video = videos.find((v) => v.id === parseInt(req.params.id));
  if (!video) {
    return res.status(404, "The video id was not found");
  }

  const schema = {
    name: Joi.string(),
    likes: Joi.number(),
    views: Joi.number(),
  };
  const result = Joi.validate(req.body, schema);

  if (result.value.name) {
    video.name = result.value.name;
  }
  if (result.value.likes) {
    video.likes = result.value.likes;
  }
  if (result.value.views) {
    video.views = result.value.views;
  }

  res.send(video);
});
// delete video
app.delete(endPoint, (req, res) => {
  const video = videos.find((v) => v.id === parseInt(req.params.id));
  if (!video) {
    return res.status(404, "The video id was not found");
  }

  const index = videos.indexOf(video);
  videos.splice(index, 1);
  res.send(video);
});
// HTTP Server endpoint
const defaultPort = 5000;
const portNo = process.env.PORT || defaultPort;
app.listen(portNo, () => {
  console.log(`Listening on port ${portNo}`);
});
