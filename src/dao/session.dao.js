import {sessionModel} from '../models/sessionModel.js'
export async function createSession (session) {
    return await sessionModel.create(session)
}
export async function findAllSessions () {
    return await sessionModel.find({}).populate("eventId","title date").populate("userId","fist_name email role")
}
export async function findSessionsByEvent(eventId) {
    return await sessionModel.find({eventId}).populate("eventId","title date").populate("userId","fist_name email role")
}
export async function findUserInSession(eventId,userId) {
    return await sessionModel.findOne({ eventId,userId })
}