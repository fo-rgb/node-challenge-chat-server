const { response } = require("express");
const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.send(messages);
});

// Post

app.post("/messages", function (req, res) {
  let mesagePost = req.body;
  console.log(mesagePost);
  mesagePost.id = Math.max(...messages.map((j) => j.id)) + 1;
  messages.push(mesagePost);
  res.status(201).json(mesagePost);
});

// put
app.put("/messages/id", function (req, res) {
  let id = parseInt(req.params.id);
  let body = req.body;
  let messageFind = quotes.find((i) => i.id == id);
  messageFind.from = body.from;
  messageFind.text = body.text;
  messageFind.id = body.id;

  res.status(200).json(messageFind);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
