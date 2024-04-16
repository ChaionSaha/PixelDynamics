import {isValidUser} from "@/db/auth";
import {v4 as uuid} from 'uuid';
import {getDatabase} from "@/db/mongoConnection";

export default async function handler(req, res) {
    if (req.method !== 'POST')
        return

    const validUser = await isValidUser(req, res);
    if (!validUser) {
        res.status(401).send({message: 'Invalid User!'});
        return
    }

    const newCategory = req.body.category;

    if (newCategory.trim() === '') {
        res.status(400).send({message: 'Invalid Input!'});
        return;
    }

    const value = newCategory.split(' ').join('-').toLowerCase();
    const cid = uuid().split('-').join('').slice(0, 7);

    const db = await getDatabase();
    const existingCat = await db.collection('category').findOne({value});
    if (existingCat) {
        res.status(400).send({message: 'Already Exists!'});
        return;
    }

    await db.collection('category').insertOne({name: newCategory, value: value, cid: cid});
    const result = await db.collection('category').find().toArray();
    res.status(200).send(result);
}