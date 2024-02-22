'use strict'

import { Router } from "express"
import { save } from "./appointment.controller.js"
import { validateJwt } from "../middlewares/validate-jwt.js"

const api = Router()

//Rutas privadas - CLIENT
api.post('/save', [validateJwt], save)

export default api