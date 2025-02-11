const express = require("express");

// http server
const app = express();

// inorder to implement sse headers must be sent on the server
app.get("/sse", (req, res) => {
  res.setHeader('Content-type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive')

  // basically fetch the updated data and then send to client
  
  res.write('data: initial data \n\n');

  const intervalId = setInterval(() => {
    res.write(`data: ${new Date()} \n\n`)
  }, 4000)
  
  req.on('close', () => {
    clearInterval(intervalId);
  })
})

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server running on port", port);
});
