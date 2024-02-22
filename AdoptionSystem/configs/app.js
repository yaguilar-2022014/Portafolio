//Configuración Express

//Importaciones
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import animalRoutes from '../src/animal/animal.routes.js'
import appointmentRoutes from '../src/appointment/appintment.routes.js'

//Configuraciones
const app = express()//Crear el Servidor
config()
const port = process.env.PORT || 3200

//Configurar el Servidor de Express
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors()) //Aceptar o Denegar las solicitudes de diferentes origenes (local o rometo) / politicas de acceso al server
app.use(helmet())
app.use(morgan('dev')) //Crea logs de solicitudes al servidor HTTP

//Declaración de rutas
app.use('/user', userRoutes)
app.use('/animal', animalRoutes)
app.use('/appointment' , appointmentRoutes)

//Levantar Servidor
export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}
