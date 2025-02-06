import express from "express"
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json())

const PORT = 5101;

app.all('/', (req, res) => {
  // console.log(res)
  // console.log(req);
  res.send('I am up and running for you!')
}) 

const todos = [
  {
    id: "1",
    title: "learn system design",
    completed: false,
  },
  {
    id: "2",
    title: "eat healthy",
    completed: false,
  }
];

app.get('/todos', (req, res) => {
  res.json(todos)
})

app.post('/todos', (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo)
  res.status(201).json({
    message: 'Created new Todo'
  });
});

app.put('/todos/:id', (req, res) => {
  const updatedTodo = req.body;

  const index = todos.findIndex(todo => todo.id === req.params.id)
  if (index !== -1) {
    todos.splice(index,1,{id:req.params.id,...updatedTodo})
  }

  res.json({message : 'todo updated succesfully'})
})

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
  }
  res.json({ message:"deleted succesfully"})
})

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`)
})