import {hash} from 'bcryptjs';

export async function hashPassword(input) {
    const hashedPassword = await hash(input, 12);
    return hashedPassword;
}