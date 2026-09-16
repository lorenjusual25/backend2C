import * as sessionDao from '../dao/session.dao.js'
export async function createSession (session) {
    return await sessionDao.createSession(session)
}
export async function findAllSessions() {
    return await sessionDao.findAllSessions()
}
export async function findSessionsByEvent (eventId) {
    return await sessionDao.findSessionsByEvent(eventId)
}
export async function findUserInSession(eventId,userId) {
    return await sessionDao.findUserInSession(eventId,userId)
}