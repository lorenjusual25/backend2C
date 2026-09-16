import bcrypt from 'bcrypt'
export async function createHash(password) {
    return await bcrypt.hash(password,10)
}
export async function validatePassword(password,hashPassword) {
    return await bcrypt.compare(password,hashPassword)
}