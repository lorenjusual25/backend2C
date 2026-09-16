import {eventModel} from '../models/eventModel.js'
export async function createEvent (e) {
    return await eventModel.create(e)
}
export async function findAllEvents (){
    return await eventModel.find({})
}
export async function findEventById (id) {
    return await eventModel.findById(id)
}
export async function findEventByTitle (title) {
    return await eventModel.findOne({title})
}