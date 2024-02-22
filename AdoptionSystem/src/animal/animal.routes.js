'use strict'

/* import express from 'express'
import { deleteAnimal, findAnimal, listAnimal, registAnimal, updateAnimal } from './animal.controller.js'

const api = express.Router()

api.post('/registAnimal', registAnimal)
api.get('/listAnimal', listAnimal)
api.get('/findAnimal', findAnimal)
api.put('/updateAnimal/:id', updateAnimal)
api.delete('/deleteAnimal/:id', deleteAnimal)

export default api */

import { Router } from "express"
import { save, test, get, update, deleteAnimal, search } from "./animal.controller.js"
import {validateJwt, isAdmin} from '../middlewares/validate-jwt.js'

const api = Router()

//ROLE ADMIN
api.post('/save', [validateJwt, isAdmin], save)
api.put('/update/:id', [validateJwt, isAdmin], update)
api.delete('/delete/:id', [validateJwt, isAdmin], deleteAnimal)

//ROLE CLIENT/ADMINI
api.get('/get', [validateJwt], get)
api.post('/search', [validateJwt], search)

api.get('/test', [validateJwt], test)
export default api