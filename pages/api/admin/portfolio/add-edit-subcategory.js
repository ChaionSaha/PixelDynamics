import {getDatabase} from "@/db/mongoConnection";
import {v4 as uuid} from 'uuid'
import {isValidUser} from "@/db/auth";

export default async function handler(req, res) {
    if (req.method !== 'POST' && req.method !== 'DELETE') {
        res.status(405).send({message: "Invalid Method!"});
        return
    }


    const validUser = await isValidUser(req, res);

    if (!validUser) {
        res.status(401).send({message: 'Invalid User!'});
        return
    }
    const db = await getDatabase();

    if (req.method === 'POST') {
        const {mainCatValue, subCatName: name, editState: edit} = req.body;
        if (mainCatValue.trim() === '' || name.trim() === '') {
            res.status(400).send({message: 'Invalid Input'});
            return
        }

        if (!edit) {
            const value = name.split(' ').join('-').toLowerCase();

            const existing = await db.collection('subCategory').findOne({value, mainCatValue});
            if (existing) {
                res.status(400).send({message: 'Already Exists!'});
                return
            }

            const scid = uuid().split('-').join().slice(0, 7);
            const newSubCat = {mainCatValue, name, scid, value};
            await db.collection('subCategory').insertOne(newSubCat);
            const result = await db.collection('subCategory').find().project({_id: 0}).toArray();
            res.status(200).send(result);
            return
        }

        const {scid} = req.body;
        const existingSubcat = await db.collection('subCategory').findOne({scid: scid});

        if (!existingSubcat) {
            res.status(400).send('Don\'t Exist!');
            return
        }

        await db.collection('subCategory').updateOne({scid: scid}, {$set: {name, mainCatValue}});
    }

    if (req.method === 'DELETE') {
        const {id} = req.query;
        const existingCat = await db.collection('subCategory').findOne({scid: id});
        if (!existingCat) {
            res.status(400).send('Don\'t Exist!')
            return
        }

        await db.collection('subCategory').deleteOne({scid: id});
    }

    const result = await db.collection('subCategory').find().project({_id: 0}).toArray();
    res.status(200).send(result);
}