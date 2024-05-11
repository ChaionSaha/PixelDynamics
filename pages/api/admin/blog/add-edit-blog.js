import { isValidUser } from "@/db/auth";
import { getDatabase } from "@/db/mongoConnection";
import { v4 as uuid } from "uuid";

export default async function handler(req, res) {
    if (req.method !== 'POST' && req.method !== 'DELETE')
        return res.status(405).send({ message: 'Invalid Method!' });

    const validUser = await isValidUser(req, res);

    if (!validUser)
        res.status(401).send({ message: "Invalid User" });

    const db = await getDatabase();
    const blogsCollection = await db.collection('blogs');

    if (req.method === 'POST') {
        const { name, description, category, author, img, details, editState } = req.body;
        delete req.body.editState;
        
        if (name.trim() === '' || description.trim() === '' || category.trim() === '' || !author || img.trim() === '' || details.length === 0)
            return res.status(400).send({ message: 'Invalid Input!' });

        if (!editState) {
            const bgid = uuid().split('-').join('').slice(0, 7);
            let date = new Date().toJSON();
            const blog = { ...req.body, bgid, date };
            await blogsCollection.insertOne(blog);
            return res.status(200).send({ message: 'Blog added successfully!' });
        }

        const { bgid } = req.body;
        let existing = await blogsCollection.findOne({ bgid });
        if (!existing)
            return res.status(404).send({ message: 'Blog not found!' });

        await blogsCollection.updateOne({ bgid }, { $set: { ...req.body } });
        return res.status(200).send({ message: 'Updated Successfully!' });
    }

    const { bgid } = req.query;
    let existing = await blogsCollection.findOne({ bgid });
    if (!existing)
        return res.status(404).send({ message: 'Blog not found!' });
    
    await blogsCollection.deleteOne({ bgid });
    const blogs = await blogsCollection.find().project({ _id: 0 }).toArray();
    return res.status(200).send(blogs);

}