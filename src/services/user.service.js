import { createHash } from "../utils/hash.js";
import * as userRepository from '../repositories/user.repository.js'
const longMinPass = 8
class UserService {
    async register({first_name,last_name,email,pwd}) {
        const normalFirst_name = first_name?.trim()
        const normalLast_name = last_name?.trim()
        const normalEmail = email?.trim().toLowerCase()
        const password = pwd
        if (!normalFirst_name || !normalLast_name || !normalEmail || !password) {
            const error = new Error("Faltan campos")
            error.status = 400
            throw error
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(normalEmail)) {
            const error = new Error("No es un formato email correcto")
            error.code = "MISSING FIELDS"
            error.status = 400
            throw error
        }
        if (password.length < longMinPass) {
            const error = new Error(`La longitud minima de contraseña es de ${longMinPass}`)
            error.code = "PSW LENGTH EXCEEDED"
            error.status = 400
            throw error
        }
        const emailExiste = await userRepository.findEmail(normalEmail)
        if (emailExiste) {
            const error = new Error("Este email ya existe")
            error.code = "EMAIL EXISTS"
            error.status = 409
            throw error
        }
        const user = {
            first_name:normalFirst_name,
            last_name:normalLast_name,
            email:normalEmail,
            password:await createHash(password),
            role:"user"
        }
        const newUser = await userRepository.addUser(user)
        return ({
            id:newUser._id,
            first_name:newUser.first_name,
            last_name:newUser.last_name,
            email:newUser.email,
            role:newUser.role,
            provider:"local",
            providerId:null
        })
  }
  // ======================================================
  // GITHUB
  // ======================================================
    async registerGithubUser({first_name,last_name,email,providerId}) {
    const normalizedEmail = email.trim().toLowerCase();
    // Buscar usuario existente
    let user = await userRepository.findEmail(normalizedEmail);
    // Si ya existe,
    // simplemente lo devolvemos
    if (user) {
      return user;
    }
    // Si no existe,
    // creamos usuario GitHub
    user = await userRepository.addUser({
        first_name,
        last_name,
        email: normalizedEmail,
        password: null,
        role: "user",
        provider: "github",
        providerId
      });
    return user;
  }
}
export default new UserService();