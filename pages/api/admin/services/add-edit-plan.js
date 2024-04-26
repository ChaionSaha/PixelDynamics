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
    const planCollection = await db.collection('subscriptionPlans');
    
    if (req.method === 'POST')
    {
        const { isEdit, ...plan } = req.body;
        if (plan.name.trim() === '' || plan.price.trim()==='' || plan.description.length === 0 || plan.offers.length===0)
            return res.status(400).send({ message: 'Invalid Input!' });
        const { spid } = plan;
    
        let existingService;
        if (spid)
        {    
            existingService = await planCollection.findOne({ spid });
            if (!existingService)
                return  res.status(400).send({ message: 'Data not found!' });
        }
    
        if (isEdit)
        {
            delete plan.spid;
            await planCollection.updateOne({ spid }, { $set: { ...plan } });
            return res.status(200).send({ message: 'Updated Successfully!' });
        }

        const newspid = uuid().split('-').join().slice(0, 7);
        await planCollection.insertOne({ spid:newspid, ...plan });
        return res.status(200).send({ message: 'Added Successfully!' });
        
    }

    const { spid } = req.query;

    const existing = await planCollection.findOne({ spid });
    if (!existing)
        return res.status(400).send({ message: 'Not Found!' });

    await planCollection.deleteOne({ spid });
    const plans = await planCollection.find().project({ _id: 0 }).toArray();
    res.status(200).send(plans);
}