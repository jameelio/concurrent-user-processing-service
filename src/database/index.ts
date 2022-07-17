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
    return await collections.users?.insertOne(user);      
}

async function findUserStream(user:string) {
    return await collections.users?.findOne({user: user})
}

async function updateUserStream(user:string,device:any) {
    return await collections.users?.findOneAndUpdate({user: user},{$set:{"active_devices": device}})
    
}

export = {
    collections,
    init,
    insertUserStream,
    findUserStream,
    updateUserStream
}