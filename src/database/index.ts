import * as mongoDB from "mongodb";

const collections: { users?: mongoDB.Collection } = {}


async function init(uri:string,db_name:string,collection_name:string) {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(uri);

    await client.connect();

    const db: mongoDB.Db = client.db(db_name);
    const users_collection: mongoDB.Collection = db.collection(collection_name);

    collections.users = users_collection;  
}

async function insertUserStream(user:any) {

    try {
        const insertUser = await collections.users?.insertOne(user);
        console.log(insertUser)
        return 'ok'
    } catch (error) {
        
    }
    
}

export = {
    collections,
    init
}