const { response } = require("express");
const express = require("express");
const app = express();
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

app.get("/", function (req, response) {
  response.send(__dirname + "/index.html");
});

app.get("/messages", function (req, response) {
  response.send(messages);
});

app.get("/messages/:id", function (req, res) {
  let id = parseInt(req.params.id);

  let messageFind = messages.find((i) => i.id === id);
  if (messageFind) {
    res.send(messageFind);
  } else {
    res.sendStatus(400);
  }
});

// // Post

app.post("/messages", function (req, res) {
  let mesagePost = req.body;
  console.log(mesagePost);
  mesagePost.id = Math.max(...messages.map((j) => j.id)) + 1;
  messages.push(mesagePost);
  res.status(201).json(mesagePost);
});

// put
app.put("/messages/:id", function (req, res) {
  let id = parseInt(req.params.id);
  let body = req.body;
  let messageFind = messages.find((i) => i.id == id);
  messageFind.from = body.from;
  messageFind.text = body.text;

  res.status(400).json(messageFind);
});

app.delete("/messages/:id", function (req, res) {
  let id = parseInt(req.params.id);

  let messageFinde = messages.findIndex((o) => o.id === id);
  if (messageFinde !== -1) {
    messages.splice(messageFinde, 1);
    res.sendStatus(messageFinde);
  } else {
    res.sendStatus(200);
  }
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
