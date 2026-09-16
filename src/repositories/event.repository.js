import * as eventDao from '../dao/event.dao.js'
export async function findAllEvents() {
    return await eventDao.findAllEvents()
}
export async function findEventById(id) {
    return await eventDao.findEventById(id)
}
export async function createEvent(e) {
    return await eventDao.createEvent(e)
}
export async function findEventByTitle(title) {
    return await eventDao.findEventByTitle(title)
}