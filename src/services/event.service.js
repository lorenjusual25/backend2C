export function createEventService (eventRepository) {
    return {
        async createEvent(e) {
            if (!e.title || !e.date || !e.location) {
                throw new Error ("Faltan campos")
            }
            const existe = await eventRepository.findEventByTitle(e.title)
            if (existe) {
                throw new Error ("Este evento ya existe")
            }
            return eventRepository.createEvent(e)
        },
        async findEventById(id) {
            const event = await eventRepository.findEventById(id)
            if (!event) {
                throw new Error ("Este evento no existe")
            }
            return event
        },
        async findAllEvents() {
            return eventRepository.findAllEvents()
        }
    }
}