import {createHash,validatePassword} from'../utils/hash.js'
const longMinPass = 8
export function createSessionService(sessionRepository,eventRepository,userRepository) {
    return {
        async createSession (session) {
            const event = await eventRepository.findEventById(session.eventId)
            if (!event) {
                throw new Error ("El evento no existe")
            }
            const userExists = await userRepository.findUserById(session.userId)
            if (!userExists) {
                throw new Error ("El usuario no existe")
            }
            const userInSession = await sessionRepository.findUserInSession(session.eventId,session.userId)
            if (userInSession) {
                throw new Error ("Este usuario ya existe en alguna sesion")
            }
            return await sessionRepository.createSession(session)
        },
        async findAllSessions () {
            return await sessionRepository.findAllSessions()
        },
        async findSessionsByEvent (eventId) {
            const event = await eventRepository.findEventById(eventId)
            if (!event) {
                throw new Error("El evento no existe")
            }
            return await sessionRepository.findSessionsByEvent(eventId)
        },
        async register(userData) {
            const first_name = userData.first_name?.trim()
            const last_name = userData.last_name?.trim()
            const email = userData.email?.trim().toLowerCase()
            const password = userData.password
            if (!first_name || !last_name || !email || !password) {
                const error = new Error("Faltan campos")
                error.status = 400
                throw error
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
                const error = new Error("No es un formato email correcto")
                error.status = 400
                throw error
            }
            if (password.length > longMinPass) {
                const error = new Error(`La longitud minima de contraseña es de ${longMinPass}`)
                error.status = 400
                throw error
            }
            const emailExiste = await userRepository.findEmail(email)
            if (emailExiste) {
                const error = new Error("Este email ya existe")
                error.status = 409
                throw error
            }
            const user = {
                first_name,
                last_name,
                email,
                password:await createHash(userData.password),
                role:"user"
            }
            const newUser = await userRepository.addUser(user)
            return ({
                id:newUser._id,
                first_name:newUser.first_name,
                last_name:newUser.last_name,
                email:newUser.email,
                role:newUser.role
            })
        },
        async login(email,password) {
            if (!email || !password) {
                const error = new Error("Faltan campos")
                error.status = 400
                throw error
            }
            const normalizedEmail = email.toLowerCase().trim()
            const user = await userRepository.findEmail(normalizedEmail)
            if (!user) {
                const error = new Error("Credenciales incorrectas")
                error.status = 401
                throw error
            }
            const validPassword = await validatePassword(password,user.password)
            if(!validPassword) {
                const error = new Error("Credenciales incorrectas")
                error.status = 401
                throw error
            }
            const payload = {
                id:user._id,
                email:normalizedEmail,
                role:user.role
            }
            return payload
        }
    }
}