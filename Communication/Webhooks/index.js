const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

//webhook endpoint
app.post("/webhook", (req,res) => {
  const payload = req.body
  // authentication 
  
  console.log("received webhook payload", payload);

  res.status(200).send("webhook received successfully")
})

app.listen(port, () => {
  console.log("server running on port", port);
}); 