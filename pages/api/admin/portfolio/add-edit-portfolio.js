import {isValidUser} from "@/db/auth";
import {getDatabase} from "@/db/mongoConnection";
import {v4 as uuid} from "uuid";

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
        const portfolio = req.body;
        const {edit} = req.body;
        delete portfolio.edit;
        const {subCat} = portfolio;
        const subCatDetails = await db.collection('subCategory').findOne({value: subCat});

        if (portfolio.name === '' ||
            portfolio.name === "" ||
            portfolio.mainCat === "" ||
            portfolio.subCat === "" ||
            portfolio.profileImage === '' ||
            portfolio.description.length === 0 ||
            subCatDetails.mainCatValue !== portfolio.mainCat) {
            res.status(400).send({message: 'Invalid Input'});
            return
        }

        if (!edit) {
            const pfid = uuid().split('-').join().slice(0, 7);

            const newPortfolio = {...portfolio, pfid};
            await db.collection('portfolio').insertOne(newPortfolio);
            const result = await db.collection('portfolio').find().project({_id: 0}).toArray();
            res.status(200).send(result);
            return
        }

        const {pfid} = req.body;
        const existingSubcat = await db.collection('portfolio').findOne({pfid});

        if (!existingSubcat) {
            res.status(400).send('Don\'t Exist!');
            return
        }

        await db.collection('portfolio').updateOne({pfid}, {$set: {...portfolio}});
    }

    if (req.method === 'DELETE') {
        const {id} = req.query;
        const existingCat = await db.collection('portfolio').findOne({pfid: id});
        if (!existingCat) {
            res.status(400).send('Don\'t Exist!')
            return
        }

        await db.collection('portfolio').deleteOne({pfid: id});
    }

    const result = await db.collection('portfolio').find().project({_id: 0}).toArray();
    res.status(200).send(result);
}