import { isValidUser } from "@/db/auth";
import { getDatabase } from "@/db/mongoConnection";
import { v4 as uuid } from "uuid";

export default async function handler(req, res) {

    if (req.method !== 'POST' && req.method !== 'DELETE')
        return res.status(405).send({ message: "Invalid Method!" });

    const validUser = await isValidUser(req, res);

    if (!validUser)
        return res.status(401).send({ message: 'Invalid User!' });

    const db = await getDatabase();
    const teamCollection = await db.collection('teamMembers');

    
    if (req.method === 'POST')
    {   
        const { isEdit, ...member } = req.body;
        if (member.name.trim() === '' || member.expertise.trim() === '' || member.img === '' || member.experienceDetails.length === 0 || isNaN(member.position) || member.position < 1)
            return res.status(400).send({ message: 'Invalid Input!' });
        const { tid } = member;
    
        let existingMember;
        if (tid)
        {    
            existingMember = await teamCollection.findOne({ tid });
            if (!existingMember)
                return  res.status(400).send({ message: 'Data not found!' });
        }
    

        if (isEdit)
        {
            delete member.tid;
            await teamCollection.updateOne({ tid }, { $set: { ...member } });
            return res.status(200).send({ message: 'Updated Successfully!' });
        }

        const newTid = uuid().split('-').join().slice(0, 7);
        await teamCollection.insertOne({ tid:newTid, ...member });
        return res.status(200).send({ message: 'Added Successfully!' });
    }

    const { tid } = req.query;

    const existing = await teamCollection.findOne({ tid });
    if (!existing)
        return res.status(400).send({ message: 'Not Found!' });

    await teamCollection.deleteOne({ tid });
    const members = await teamCollection.find().project({ _id: 0 }).toArray();
    res.status(200).send(members);
}