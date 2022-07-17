import 'dotenv/config';
import app from "./app";
import db from "./database"

const mongodb_uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const collection = process.env.COLLECTION || 'users';
const database_name = process.env.DB_NAME || 'default';
const port = process.env.NODE_PORT || 3000;

db.init(mongodb_uri,database_name,collection);

app.listen(port , () => {
    return console.log(`Express Listening: http://localhost:${port}`)
})