import mongoose from 'mongoose'
export const PORT = process.env.PORT || 3000
export const MONGO_URI = process.env.MONGO_URI
export async function connectDB () {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Conectado a la base de datos")
    }
    catch (error) {
        console.error(`Error al conectar a la base de datos: ${error}`)
        process.exit(1)
    }
}