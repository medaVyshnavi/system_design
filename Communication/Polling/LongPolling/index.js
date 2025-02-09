const express = require("express");

const app = express();

let data = "Initial Data";
let waitingClientList = []

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// db calls
app.get("/getData", (req, res) => {
  if (data !== req.query.data) {
    res.json({data})
  } else {
    waitingClientList.push(res)
  }
});

app.get("/getUpdatedData", (req, res) => {
  data = req.query.data;
  while (waitingClientList.length > 0) {
    const client = waitingClientList.pop();
    client.json({ data })
   
  }
   res.send({success:"data sent succesfully"})
});

const port = process.env.PORT || 5011;
app.listen(port, () => {
  console.log("server running on port", port);
});
