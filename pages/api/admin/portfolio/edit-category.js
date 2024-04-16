import {isValidUser} from "@/db/auth";
import {getDatabase} from "@/db/mongoConnection";

export default async function handler(req, res) {
    if (req.method !== 'POST')
        return

    const validUser = await isValidUser(req, res);
    if (!validUser) {
        res.status(401).send({message: 'Invalid User!'});
        return
    }

    const {id, updateCategory} = req.body;
    if (updateCategory.trim() === '') {
        res.status(400).send({message: 'Invalid Input!'});
        return;
    }

    const db = await getDatabase();
    const existingCat = await db.collection('category').findOne({cid: id});
    if (!existingCat) {
        res.status(400).send({message: 'Don\'t Exist!'});
        return;
    }

    if (existingCat.name === updateCategory) {
        res.status(400).send({message: 'No Change Detected!'});
        return;
    }

    await db.collection('category').updateOne({cid: id}, {$set: {name: updateCategory}});
    const result = await db.collection('category').find().toArray();
    res.status(200).send(result);

}