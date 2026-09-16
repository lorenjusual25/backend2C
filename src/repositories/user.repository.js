import * as userDao from '../dao/user.dao.js'
export async function addUser(data) {
    return await userDao.addUser(data)
}
export async function findAllUsers() {
    return await userDao.findAllUsers()
}
export async function findUserById (id) {
    return await userDao.findUserById(id)
}
export async function findUserByName(name) {
    return await userDao.findUserByName(name)
}
export async function findEmail(email) {
    return await userDao.findEmail(email)
}
export async function deleteUserById(id) {
    return await userDao.deleteUserById(id)
}