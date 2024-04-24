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
    const serviceCollection = await db.collection('services');
    
    
    if (req.method === 'POST')
    {   
        const { isEdit, ...service } = req.body;
        if (service.title.trim() === '' || service.list.length === 0)
            return res.status(400).send({ message: 'Invalid Input!' });
        const { slid } = service;
    
        let existingService;
        if (slid)
        {    
            existingService = await serviceCollection.findOne({ slid });
            if (!existingService)
                return  res.status(400).send({ message: 'Data not found!' });
        }
    

        if (isEdit)
        {
            delete service.slid;
            await serviceCollection.updateOne({ slid }, { $set: { ...service } });
            return res.status(200).send({ message: 'Updated Successfully!' });
        }

        const newSlid = uuid().split('-').join().slice(0, 7);
        await serviceCollection.insertOne({ slid:newSlid, ...service });
        return res.status(200).send({ message: 'Added Successfully!' });
    }
    

    const { slid } = req.query;

    const existing = await serviceCollection.findOne({ slid });
    if (!existing)
        return res.status(400).send({ message: 'Not Found!' });

    await serviceCollection.deleteOne({ slid });
    const services = await serviceCollection.find().project({ _id: 0 }).toArray();
    res.status(200).send(services);
}