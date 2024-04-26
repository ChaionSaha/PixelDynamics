import { isValidUser } from "@/db/auth";
import { getDatabase } from "@/db/mongoConnection";

export default async function handler(req, res) {
    if (req.method !== 'GET')
        return res.status(405).send({ message: 'Invalid Method!' });

    const validUser = isValidUser(req, res);
    if (!validUser)
        return res.status(401).send({ message: "Invalid User" });

    const db = await getDatabase();
    const { email } = req.query;
    let existingUser = await db.collection('users').findOne({ email });
    
    if (!existingUser)
        return res.status(400).send({ message: 'User does not exist!' });

    if (existingUser.isApproved)
        return res.status(400).send({ message: 'User already approved!' });

    await db.collection('users').updateOne({ email }, { $set: { isApproved: true } });

    const result = await db.collection('users').find().project({ _id: 0 }).toArray();
    return res.status(200).send(result);

}