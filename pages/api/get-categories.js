import {getDatabase} from "@/db/mongoConnection";

export default async function handler(req, res) {
    if (req.method !== 'GET')
        return

    const db = await getDatabase();
    const mainCategories = await db.collection('category').find().project({_id: 0}).toArray();
    const subCategories = await db.collection('subCategory').find().project({_id: 0}).toArray();

    res.status(200).send({mainCategories, subCategories});
}