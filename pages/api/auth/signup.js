import { hashPassword } from "@/db/auth";
import { getDatabase } from "@/db/mongoConnection";

async function handler(req, res) {
    if (req.method !== 'POST') {
        return;
    }
    const {name, email, password, confirmPassword} = req.body;
    if (!name || !email || !password || !confirmPassword || !confirmPassword) {
        res.status(400).send({message: `Invalid Input.`});
        return;
    }

    if (!email.includes('@')) {
        res.status(400).send({message: `Invalid email.`});
        return;
    }

    if (password.trim().length < 7) {
        res.status(400).send({message: `Password should be at least 7 characters long.`});
        return;
    }

    if (password !== confirmPassword) {
        res.status(400).send({message: `Passwords don't match.`});
        return;
    }

    const db = await getDatabase();
    const usersCollection = await db.collection('users');
    const existingUser = await usersCollection.findOne({email});
    if (existingUser) {
        res.status(400).send({message: `User already exists.`});
        return;
    }
    const hashedPassword = await hashPassword(password);
    const data = await usersCollection.insertOne({name, email, password: hashedPassword, isApproved: false});
    res.status(200).send({data});
}

export default handler;