import express from 'express';
import cors from 'cors';
import { Low , JSONFile} from 'lowdb';
import { join , dirname} from 'path';
import { fileURLToPath } from 'url'

//LowDb config
const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

db.data ||= {users : []}

//Fill in the database 
db.data.users.push({ name :" Harry" , color : "red"})
db.data.users.push({ name :" Billy" , color : "blue"})
db.data.users.push({ name :" Liam" , color : "green"})
db.data.users.push({ name :" James" , color : "orange"})
db.data.users.push({ name :" Mark" , color : "#333"})


// App config
const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//Basic get request

app.get('/users' , (req , res)=> {
    res.status(200).json({
        data: db.data.users
    })
})

//Starting the app
const port = 8020;

app.listen(port , ()=> console.log(`Listening on port ${port}`))