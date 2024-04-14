import {compare, hash} from 'bcryptjs';

export async function hashPassword(input) {
    const hashedPassword = await hash(input, 12);
    return hashedPassword;
}

export async function comparePassword(password, hashedPassword) {
    const isValid = await compare(password, hashedPassword);
    return isValid;
}