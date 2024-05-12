import { getDatabase } from "@/db/mongoConnection";

export default async function handler(req, res) {
    if (req.method !== 'GET')
        return res.status(405).send({ message: 'Invalid Method!' });

    const db = await getDatabase();
    const termsPages = await db.collection('terms').find().project({ _id: 0, tpid: 1, pageName: 1, pageLink: 1 }).toArray();
    
    return res.status(200).send(termsPages);
}