import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy,ExtractJwt } from 'passport-jwt'
import { validatePassword } from '../utils/hash.js'
import * as userRepository from '../repositories/user.repository.js'
import userService from '../services/user.service.js'
passport.use('register',new LocalStrategy(
        {
            usernameField:"email",
            passwordField:"password",
            passReqToCallback:true
        },
        async (req,email,password,done) => {
            try {
                const {first_name,last_name} = req.body
                if (!email || !password || !first_name || !last_name) {
                    return done(null,false,{
                        message:"Todos los campos son obligatorios"
                    })
                }
                const newUser = await userService.register({first_name,last_name,email,password})
                return done(null,newUser)
            } catch (error) {
                return done(error)
            }
        }
    )
)
passport.use('login',new LocalStrategy(
    {
        usernameField:"email",
        passwordField:"password"
    },
    async (email,password,done) => {
        const normalEmail = email?.trim().toLowerCase()
        const user = await userRepository.findEmail(normalEmail)
        if (!user) {
            return done(null,false,"Credenciales invalidas")
        }
        const validPassword = await validatePassword(password,user.password)
        if (!validPassword) {
            return done(null,false,"Credenciales invalidas")
        }
        return done(null,user)
    }
))
passport.use('github',new GitHubStrategy(
    {
        clientID:process.env.GITHUB_CLIENT_ID,
        clientSecret:process.env.GITHUB_CLIENT_SECRET,
        callbackURL:process.env.GITHUB_CALLBACK_URL
    },
    async (accessToken,refreshToken,profile,done) => {
        try {
            console.log("Github profile:",profile)
            const email = profile.emails?.[0]?.value
            if (!email) {
                return done(null,false,{message:"Github no proporcionó ni un email"})
            }
            const first_name = profile.name?.givenName || profile.displayName || "usuario"
            const last_name = profile.name?.familyName || ""
            const user = await userService.registerGithubUser({
                first_name,
                last_name,
                email,
                providerId:profile.id,
            })
            return done(null,user)
        } catch (error) {
            return done(error)
        }
    }
))
const cookieExtractor = (req) => {
    if (req && req.cookies && req.cookies.currentUser) {
        return req.cookies.currentUser
    }
    return null
}
passport.use('current', new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey:process.env.JWT_SECRET
    },
    async (payload,done) => {
        try {
            const user = await userRepository.findUserById(payload.id)
            if (!user) {
                return done(null,false)
            }
            return done(null,user)
        } catch (error) {
            return done(error)
        }
    }
))
export default passport