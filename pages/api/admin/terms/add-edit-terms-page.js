import { isValidUser } from "@/db/auth";
import { getDatabase } from "@/db/mongoConnection";
import { v4 as uuid } from "uuid";

export default async function handler(req, res)  {
    if (req.method !== 'POST' && req.method !== 'DELETE')
        return res.status(405).send({ message: 'Invalid Method!' });
    
    const validUser = await isValidUser(req, res);
    if (!validUser)
        return res.status(401).send({ message: 'Invalid User!' });

    const db = await getDatabase();
    const termsCollection = db.collection('terms');

    if (req.method === 'POST') {
        const { editState } = req.body;

        if (!editState)
        {
            const { pageName, description } = req.body;
            if (pageName.trim() === '' || description.length === 0)
                return res.status(400).send({ message: 'Invalid Input!' });

            const pageLink = pageName.toLowerCase().split(' ').join('-');
            const existingTerms = await termsCollection.findOne({ pageLink });
            if (existingTerms)
                return res.status(400).send({ message: 'This Page Name already exists. Try to delete the existing page and try again or change the name!' });

            const tpid = uuid().split('-').join('').slice(0, 7);
            await termsCollection.insertOne({ tpid, pageName, description, pageLink });
            return res.status(200).send({message: "Added Successfully!"});
        }

        const { tpid, pageName, description } = req.body;
        const existingTerms = await termsCollection.findOne({ tpid });
        if (!existingTerms)
            return res.status(400).send({ message: 'Don\'t Exist!' });
        await termsCollection.updateOne({ tpid }, { $set: { pageName, description } });
        return res.status(200).send({message: "Updated Successfully!"});
    }

    const { tpid } = req.query;
    let existingTerms = await termsCollection.findOne({ tpid });

    if (!existingTerms)
        return res.status(404).send({message: "Don't Exist!"});
    await termsCollection.deleteOne({ tpid });
    const termsPages = await termsCollection.find().project({ _id: 0 }).toArray();
    return res.status(200).send(termsPages);
}