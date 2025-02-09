const express = require("express")

const app = express()

let data = "Initial Data"

app.get('/', (req,res) => {
  res.sendFile(__dirname +"/index.html")
})

// db calls
app.get('/getData', (req, res) => {
  res.send({
    data
  })
})

app.get('/getUpdatedData', (req, res) => {
  data = "updated data";
  res.send({
    data,
  });
})

const port = process.env.PORT || 5011;
app.listen(port, () => {
  console.log("server running on port", port)
})