import { MongoClient } from "mongodb";

if(!process.env.MONGO_URI) {
    throw new Error("Invalid Or Missing Environnment MONGO_URI variable"); 

}

const uri = process.env.MONGO_URI ; 

const options = {} 

let client 
let clientPromise: Promise<MongoClient>

if(process.env.NODE_ENV==='development') {

    // Application en environnement de developpement 

    let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?:  Promise<MongoClient>
    }

    if(!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options)
        globalWithMongo._mongoClientPromise = client.connect()
    }

    clientPromise = globalWithMongo._mongoClientPromise
} else 
{
    // Application en environnement de production 

    client = new MongoClient(uri, options) ; 

    clientPromise = client.connect() ; 
}


export default clientPromise ; 