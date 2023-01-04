import mongoose from "mongoose";

const {Schema} = mongoose

const LabAppointmentSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    appointmentId: {
        type: String,
        require: true,
        default: Math.floor(Math.random() * 1000000)
    },
    lab: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    patientId: {
        type: String,
        require: true
    }

})

export default mongoose.model("LabAppointment", LabAppointmentSchema)
