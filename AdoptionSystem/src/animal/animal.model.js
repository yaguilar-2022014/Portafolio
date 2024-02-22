import mongoose, { Schema, model } from "mongoose"

const animalSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        uppercase: true,
        enum: ['MALE', 'FEMALE']
    },
    keeper:{
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    species:{
        type: String,
        required: true,
        uppercase: true
    },
    size:{
        type: String,
        uppercase: true,
        enum: ['SMALL', 'MEDIUM', 'BIG'],
        required: true
    }
})

export default model('animal', animalSchema)
