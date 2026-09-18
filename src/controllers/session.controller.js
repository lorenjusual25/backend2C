import * as sessionRepository from '../repositories/session.repository.js'
import * as eventRepository from '../repositories/event.repository.js'
import * as userRepository from '../repositories/user.repository.js'
import { createSessionService } from '../services/session.service.js'
import {generateToken} from '../utils/jwt.js'
import { UserDTO } from '../dto/userDTO.js'
const sessionService = createSessionService(sessionRepository,eventRepository,userRepository)
export async function createSession(req,res,next) {
    try {
        const session = req.body
        const s = await sessionService.createSession(session)
        return res.status(201).json({status:"success",message:"sesion creada",payload:s})
    } 
    catch (error) {
        next(error)
    }
}
export async function findAllSessions (req,res,next) {
    try {
        const sessions = await sessionService.findAllSessions()
        return res.json({status:"success",payload:sessions})
    }
    catch (error) {
        next(error)
    }
}
export async function findSessionsByEvent (req,res,next) {
    try {
        const { eventId } = req.params
        const sessions = await sessionService.findSessionsByEvent(eventId)
        return res.json({status:"success",payload:sessions})
    } 
    catch (error) {
        next(error)
    }
}
export async function register(req,res,next) {
    try {
        /*const newUserInfo = req.body
        const user = await sessionService.register(newUserInfo)
        res.status(201).json({status:"success",payload:user})*/
        return res.status(201).json({
            status:"success",
            payload:req.user
        })
    } 
    catch (error) {
        next(error)
    }
}
export async function login (req,res,next) {
    /*try {
        const {email,password} = req.body
        const payload = await sessionService.login(email,password)
        const token = generateToken(payload)
        res.cookie("currentUser",token,{
            httpOnly:true,
            maxAge:60*60*1000,
            sameSite:'lax',
            secure:process.env.NODE_ENV === 'production'
        })
        return res.status(200).json({
            status:"success",
            message:"Login correcto"
        })
    }
    catch (error) {
        next(error)
    }*/
   try {
    const user = req.user
    const payload = {
        id: user._id.toString(),
        email:user.email,
        role: user.role
    }
    const token = generateToken(payload)
    res.cookie("currentUser",token,{
        httpOnly: true,
        secure:process.env.NODE_ENV ==="production",
        sameSite: "lax",
        maxAge:60 * 60 * 1000
    })
    return res.status(200).json({
        status: "success",
        message: "Login correcto"
    })
    } catch (error) {
        next(error)
    }
}
export function getCurrentUser (req, res, next) {
  /*res.status(200).json({
    status: 'success',
    payload: req.user
  })*/
 try {
    const user = req.user;
    const userDTO = new UserDTO(user);
    return res.status(200).json({
        status: "success",
        payload: userDTO
    })
  }catch (error) {
    next(error)
  }
}
export async function logout (req,res) {
    res.clearCookie("currentUser")
    return res.status(200).json({
        status:"success",
        message:"Logout exitoso"
    })
}
export async function githubCallback (req,res,next) {
    try {
        const user = req.user
        const payload = {
            id: user._id.toString(),
            email: user.email,
            role: user.role
        }
        const token = generateToken(payload)
        res.cookie("currentUser",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        })
        return res.json({
            status:"success",
            message:"Login con GitHub exitoso"
        })
    }
    catch(error) {
        error.message = "Error durante la autenticación"
        next(error)
    }
}