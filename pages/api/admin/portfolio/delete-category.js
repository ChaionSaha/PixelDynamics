import {isValidUser} from "@/db/auth";
import {getDatabase} from "@/db/mongoConnection";

export default async function handler(req, res) {
    if (req.method !== 'DELETE')
        return

    const validUser = await isValidUser(req, res);
    if (!validUser) {
        res.status(401).send({message: 'Invalid User!'});
        return
    }

    const {id} = req.query;

    const db = await getDatabase();
    const existingCat = await db.collection('category').findOne({cid: id});
    if (!existingCat) {
        res.status(400).send({message: 'Don\'t Exist!'});
        return;
    }

    await db.collection('category').deleteOne({cid: id});
    const result = await db.collection('category').find().toArray();
    res.status(200).send(result);
}