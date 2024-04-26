import { isValidUser } from "@/db/auth";
import { getDatabase } from "@/db/mongoConnection";

export default async function handler(req, res) {
    if (req.method !== 'DELETE')
        return res.status(405).send({ message: 'Invalid Method!' });

    const validUser = await isValidUser(req, res);
    if (!validUser)
        return res.status(401).send({ message: "Invalid User" });

    const db = await getDatabase();
    const { email } = req.query;

    const existing = await db.collection('users').findOne({ email });
    if (!existing)
        return res.status(400).send({ message: 'User does not exist!' });

    await db.collection('users').deleteOne({ email });
    const users = await db.collection('users').find().project({ _id: 0 }).toArray();
    return res.status(200).send(users);
}