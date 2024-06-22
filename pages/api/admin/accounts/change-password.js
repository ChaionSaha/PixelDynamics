import { comparePassword, hashPassword, isValidUser } from "@/db/auth";
import { getDatabase } from "@/db/mongoConnection";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'})
    }

    const { oldPassword, newPassword, confirmPassword } = req.body;

    if(oldPassword.trim() === '' || newPassword.trim() === '' || confirmPassword.trim() === '') {
        return res.status(400).json({message: 'All fields are required'})
    }

    if(newPassword !== confirmPassword) {
        return res.status(400).json({message: 'Passwords do not match'})
    }

    const validUser = isValidUser(req, res);
    if(!validUser) {
        return res.status(401).json({message: 'Unauthorized'})
    }

    const session = await getServerSession(req, res, authOptions);
    const db = await getDatabase();
    const user = await db.collection('users').findOne({ email: session?.user?.email });
    
    const isValid = await comparePassword(oldPassword, user.password);
    if(!isValid) {
        return res.status(401).json({message: 'Invalid old password'})
    }

    const hashedPassword = await hashPassword(newPassword);
    await db.collection('users').updateOne({ email: session?.user?.email }, { $set: { password: hashedPassword } });
    res.status(200).json({message: 'Password changed successfully'})

}