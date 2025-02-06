const client = require("./client")

const path = require("path")
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// using the grpc client (server A) we will call grpc server(server B)
// basically client calls, get the data from the browser client  
// details from req, call the client methods mentioned in the sever/index.js files.
// the response recieved from the grpc server send it back to the browser client
app.get('/', (req, res) => {
  client.getUsers(null, (error, data) => {
    if (error) {
      console.error("Error fetching users:", error);
      return res.status(500).send("Internal Server Error");
    }
    res.send(data.customer);
  })
})

app.get("/user", (req, res) => {
  client.get(req.body.id, (error, data) => {
    if (err) throw err;

    console.log("user retrieved", data);
    res.send({ message: "user retrieved successfully" });
  });
});

app.post('/create', (req, res) => {
  let newCustomer = {
    name : req.body.name,
    location : req.body.location
  }

  client.insert(newCustomer, (err, data) => {
    if (err) throw err;

    console.log("customer added",data);
    res.send({ message: "created user successfully" })
  })
})

app.delete('/delete', (req, res) => {
  client.remove(req.body.id, (err, data) => {
    if (err) throw err;

    console.log("customer deleted", data);
    res.send({ message: "created deleted successfully" });
  });
})

app.post('/update', (req, res) => {
  let updateCustomer = {
    id: req.body.id,
    name: req.body.name,
    location: req.body.location,
  };

  client.update(updateCustomer, (err, data) => {
    if (err) throw err;

    console.log("customer updated",data);
    res.send({ message: "updated user successfully" });
  });
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server running on port", PORT)
})