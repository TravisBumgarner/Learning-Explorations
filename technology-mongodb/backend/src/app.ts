import express from 'express';
import { MongoClient, ObjectId } from "mongodb";
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

app.use(cors({origin: '*'}));

app.use(bodyParser.json())

const uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/?authMechanism=DEFAULT`
const client = new MongoClient(uri);

const getTodos = async () => {
    const database = client.db(process.env.MONGO_DATABASE);
    const todos = database.collection("todos");
    const data = await todos.find().toArray()
    return data
}

const addTodo = async (text: string) => {
  const database = client.db(process.env.MONGO_DATABASE);
  const todos = database.collection("todos")
  const newItem = await todos.insertOne({text})
  return newItem
}

const deleteTodo = async (_id: string) => {
  const database = client.db(process.env.MONGO_DATABASE);
  const todos = database.collection("todos")
  const result = await todos.deleteOne({_id: new ObjectId(_id)})
  return result
}

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('pong!')
})

app.get('/all', async (req: express.Request, res: express.Response) => {
  const todoItems = await getTodos()
  res.send(todoItems)
})

app.post('/add', async (req: express.Request, res: express.Response) => {
  const newItem = await addTodo(req.body.text)
  res.send(newItem)
})

app.post('/delete', async (req: express.Request, res: express.Response) => {
  const result = await deleteTodo(req.body._id)
  res.send(result)
})


export default app