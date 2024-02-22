'use strict'

import { checkUpdate } from '../utils/validator.js'
import Animal from './animal.model.js'
import User from '../user/user.model.js'

/* export const registAnimal = async (req, res) => {
    try {
        let data = req.body
        let animal = new Animal(data)
        await animal.save()
        return res.send({ message: 'Registered successfully' })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error at registering animal', err })
    }
}

export const listAnimal = async (req, res) => {
    try {
        let animal = await Animal.find({})
        return res.send({ animal })
    } catch (err) {
        console.log(err)
    }
}

export const findAnimal = async (req, res) => {
    try {
        let { name } = req.body
        let animal = await Animal.find({ name })
        //Nombre vacío
        if (animal == name) return res.send({ message: 'Please enter an animal name' })
        return res.send({ animal })

    } catch (err) {
        console.log(err)
    }
}

export const updateAnimal = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let updateAnimal = checkUpdate(data, id)
        if (!updateAnimal) return res.status(404).send({ message: 'Have  submited some data that cannot be updated or missing data' })
        let update = await Animal.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        return res.send({ message: 'Updated animal', update })
    } catch (err) {
        console.log(err)
    }
}

export const deleteAnimal = async (req, res) => {
    try {
        let { id } = req.params
        let deleteAn = await Animal.findOneAndDelete({ _id: id })
        if (!deleteAn) return res.status(404).send({ message: 'Account not found and not deleted' })
        return res.send({ message: `Animal with name: ${deleteAn.name} deleted successfully` })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error deleting animal' })
    }
} */

export const test = (req, res) => {
    return res.send({ message: 'Function test is running | Animal' })
}

export const save = async (req, res) => {
    try {
        //Capturar la data
        let data = req.body
        //Validar que el 'Keeper' exista (Buscar en la DB)
        let user = await User.findOne({ _id: data.keeper })
        if (!user) return res.status(404).send({ message: 'Keeper not found' })
        //Crear la instancia del 'Animal'
        let animal = new Animal(data)
        //Guardar
        await animal.save()
        //Responder si todo sale bien
        return res.send({ message: 'Animal saved successfully!!' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error saving animal' })
    }
}

export const get = async (req, res) => {
    try {
        let animals = await Animal.find().populate('keeper', ['name', 'phone'])
        return res.send({ animals })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting animals' })
    }
}

export const update = async (req, res) => {
    try {
        //Capturar el id (a quien voy a actualizar)
        let { id } = req.params
        //Capturar la data
        let data = req.body
        //Validar que vengan datos
        let update = checkUpdate(data, false)
        if (!update) return res.status(400).send({ message: 'Have submited some data that cannot be updated or missing data' })
        //Actualizar
        let updatedAnimal = await Animal.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        ).populate('keeper', ['name', 'phone'])
        //Validar la actualización
        if (!updatedAnimal) return res.status(404).send({ message: 'Animal not found, not updated' })
        //Rresponder si todo sale bien
        return res.send({ message: 'Animal updated successfully', updatedAnimal })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating animal' })
    }
}

export const deleteAnimal = async (req, res) => {
    try {
        //Verificar si tiene una reunión en proceso
        //Capturar el id del 'animal' o eliminar
        let { id } = req.params
        //Eliminar
        let deletedAnimal = await Animal.deleteOne({ _id: id })
        //Validar que se eliminó
        if (deletedAnimal.deletedCount == 0) return res.status(404).send({ message: 'Animal no found, not deleted' })
        //Responder
        return res.send({ message: 'Deleted animal successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting animal' })
    }
}

export const search = async (req, res) => {
    try {
        //Obtener el parametro de busqueda
        let { search } = req.body
        //Buscar
        let animals = await Animal.find({ name: search }).populate('keeper', ['name', 'phone'])
        //Validar la respuesta
        if (animals.length == 0) return res.status(400).send({ message: 'Animals not found' })
        //Responder si todo sale bien
        return res.send({ message: 'Animals found', animals })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error searching animals' })
    }
}
