import {userModel} from '../models/userModel.js'
export async function addUser (data) {
    return await userModel.create(data)
}
export async function findAllUsers () {
    return await userModel.find({})
}
export async function findUserById (id) {
    return await userModel.findById(id)
}
export async function findUserByName (name) {
    return await userModel.findOne({name})
}
export async function findEmail(email) {
    return await userModel.findOne({email})
}
export async function deleteUserById (id) {
    return await userModel.findByIdAndDelete(id)
}