import * as eventRepository from '../repositories/event.repository.js'
import {createEventService} from '../services/event.service.js'
const eventService = createEventService(eventRepository)
export async function getEvents (req, res,next) {
    try {
        const events = await eventService.findAllEvents()
        return res.json({message:"success",events:events})
    }
    catch (error) {
        next(error)
    }
}
export async function getEventById (req,res,next) {
    try {
        const { id } = req.params
        const event = await eventService.findEventById(id)
        return res.json({message:"success",event:event})
    }
    catch (error) {
        next(error)
    }
}
export async function createEvent (req,res,next) {
    try {
        const event = req.body
        await eventService.createEvent(event)
        return res.status(201).json({message: "evento creado", event:event})
    } catch (error) {
        next(error)
    }
}