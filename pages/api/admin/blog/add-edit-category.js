import { isValidUser } from "@/db/auth";
import { getDatabase } from "@/db/mongoConnection";
import { v4 as uuid } from "uuid";

export default async function handler(req, res) {
    if (req.method !== 'POST' && req.method !== 'DELETE')
        return res.status(405).send({ message: 'Invalid Method!' });

    const validUser = await isValidUser(req, res);
    if (!validUser)
        return res.status(401).send({ message: 'Invalid User' });

    const db = await getDatabase();
    const blogCategoriesCollection = await db.collection('blogCategories');

    if (req.method === 'POST')
    {
        const { isEdit, ...category } = req.body;
        if (category.name.trim() === '')
            return res.status(400).send({ message: 'Invalid Input!' });
        
        if (!isEdit)
        {
            const value = category.name.split(' ').join('-').toLowerCase();    
            let existing = await blogCategoriesCollection.findOne({ value });

            if (existing)
                return res.status(400).send({ message: 'Already Exists!' });

            const bcid = uuid().split('-').join('').slice(0, 7);
            await blogCategoriesCollection.insertOne({ bcid, name: category.name, value });

            const blogCategories = await blogCategoriesCollection.find().project({ _id: 0 }).toArray();
            return res.status(200).send(blogCategories);
        }

        const { bcid } = category;
        let existing = await blogCategoriesCollection.findOne({ bcid });
        if (!existing)
            return res.status(400).send({ message: 'Category doesn\'t exist!' });

        await blogCategoriesCollection.updateOne({ bcid }, { $set: { ...category } });
        const blogCategories = await blogCategoriesCollection.find().project({ _id: 0 }).toArray();
        return res.status(200).send(blogCategories);
    }

    const { bcid } = req.query;
    let existing = await blogCategoriesCollection.findOne({ bcid });

    if (!existing)
        return res.status(400).send({ message: 'Category doesn\'t exist!' });

    await blogCategoriesCollection.deleteOne({ bcid });
    const blogCategories = await blogCategoriesCollection.find().project({ _id: 0 }).toArray();
    res.status(200).send(blogCategories);
}