'use strict'

import Animal from '../animal/animal.model.js'
import Appointment from './appointment.model.js'

export const save = async(req, res)=>{
    try {
        //Capturar data
        let data = req.body
        data.user = req.user._id
        //Verificar que exista animal
        let animal = await Animal.findOne({_id: data.animal})
        if(!animal) return res.status(404).send({message: 'Animal not found'})
        //Validar que la mascota no tenga cita activa con esa persona   
        //Valida si un animal ya tiene cita o si un usuario ya tiene cita
        //EJERCICIO <- Solo pueda tener una cita por día
        let appointmentExist = await Appointment.findOne({
            $or: [
                {
                    animal: data.animal,
                    user: data.user
                },
                {
                    date: data.date,
                    user: data.user
                }
            ]
        })
        if(appointmentExist) return res.send({message: 'Appointment already exist'})
        //Guardar
        let appointment = new Appointment(data)
        await appointment.save()
        return res.send({message: `Appointment reserved successfully, for the date ${appointment.date}`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error saving appointment', err})
    }
}