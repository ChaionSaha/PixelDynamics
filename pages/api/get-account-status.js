import { getDatabase } from "@/db/mongoConnection";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
    if (req.method !== 'GET')
        return

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).send({message: `Unauthorized!`});
        return
    }

    const db = await getDatabase();
    const usersCollection = await db.collection('users');
    const user = await usersCollection.findOne({email: session.user.email});

    if (!user) {
        res.status(401).send({message: `Unauthorized!`});
        return;
    }

    if (!user.isApproved) {
        res.status(403).send({message: `Not approved yet!`});
        return
    }

    return res.status(200).send(session);
}