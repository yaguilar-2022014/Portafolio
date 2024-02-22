'use strict'
//Lógica

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { hash } from 'bcrypt'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res) => {
    return res.send('Test')
}

export const register = async (req, res) => { //Solo para clientes
    try {
        //Capturar la información del cliente (body)
        let data = req.body
        //Encriptar la contraseña
        data.password = await encrypt(data.password)
        //Asignar el rol por defecto
        data.role = 'CLIENT' //Si viene con otro valor o no viene, lo asigna a rol CLIENTE
        //Crear una instancia del modelo (Schema)
        let user = new User(data)
        //Guardar la información
        await user.save()
        //Responder al usuario
        return res.send({ message: 'Registered succesfully' })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error registering user', err })
    }
}

export const login = async (req, res) => {
    try {
        //Capturar la informacion(body)
        let { username, password } = req.body
        //Validar que el usuario exista
        let user = await User.findOne({ username })
        //Verificar que la contraseña coincida
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            //Responder (dar acceso)
            return res.send({ 
                message: `Welcome ${user.name}`, loggedUser,
                token
             })
        }
        return res.status(404).send({ message: 'Invalid credentials' })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Failed to login' })
    }
}

export const update = async (req, res) => { //Usuarios logeados
    try {
        //Obtener id del usuario
        let { id } = req.params
        //Obtener datos que vamos a actualizar
        let data = req.body
        //Validar si trae datos a actualizar
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have  submited some data that cannot be updated or missing data' })
        //Validar si tiene permisos (tokenización)
        //Atulaizar en la DB
        let updatedUser = await User.findOneAndUpdate(
            { _id: id }, //ObjectId <- hexadecimal (Hora, version mongo, llave privada...)
            data, //Datos que va a actualizar
            { new: true } //Objeto de la DB ya actualizado
        )
        //Validar si se actualizó
        if (!updatedUser) return res.status(401).send({ message: 'User not found and not updated' })
        //Responder con el dato actualizado
        return res.send({ message: 'Updated user', updatedUser })
    } catch (err) {
        console.log(err)
        if(err.keyvalue.username) return res.status(400).send({message: `Username ${err.keyvalue.username} is already taken`})
        return res.status(500).send({ message: 'Error updating account' })
    }
}

export const deleteU = async (req, res) => {
    try {
        //Obtener ID
        let {id} = req.params
        //Validar si está logeado y es el mismo
        //Eliminar (deleteOne / findOneAdnDelete)
        let deleteUser = await User.findOneAndDelete({_id: id})
        //Verificar que se eliminó
        if(!deleteUser) return res.status(404).send({message: 'Account not found and not deleted'})
        //Responder
        return res.send({message: `Account with username ${deleteUser.username} deleted successfully`})
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}
