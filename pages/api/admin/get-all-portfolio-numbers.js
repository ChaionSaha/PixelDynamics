import {isValidUser} from "@/db/auth";
import {getDatabase} from "@/db/mongoConnection";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).send({message: "Invalid Method!"});
        return
    }

    const validUser = await isValidUser(req, res);

    if (!validUser) {
        res.status(401).send({message: 'Invalid User!'});
        return
    }
    const db = await getDatabase();

    const pfs = await db.collection('portfolio').find().project({_id: 0}).toArray();
    const tempArr = [];
    const {pfid} = req.query;
    if (!pfid) {
        pfs.map(pf => tempArr.push(pf?.position));
    } else {
        pfs.map(pf => {
            if (pf.pfid !== pfid)
                tempArr.push(pf?.position);
        })
    }
    res.status(200).send(tempArr);

}