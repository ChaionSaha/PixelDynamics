import { MongoClient, ServerApiVersion } from 'mongodb';

let cachedClient = null;

async function connectToDatabase(uri) {
    if (cachedClient) {
        return cachedClient;
    }

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    })
    await client.connect();
    console.log('Mongodb connected!');
    cachedClient = client;
    return client;
}

export async function getDatabase() {
    const client = await connectToDatabase(process.env.MONGODB_URI);
    const db = await client.db(process.env.MONGODB_DB);
    return db;
}
