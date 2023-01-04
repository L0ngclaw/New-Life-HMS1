import mongoose from "mongoose";

const {Schema} = mongoose

const LabReportSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    RedBloodCellCount: {
        type: String,
        require: true
    },
    Hemoglobin: {
        type: String,
        require: true
    },
    Hematocrit: {
        type: String,
        require: true
    },
    Type: {
        type: String,
        require: true
    },
    PlateletCount: {
        type: String,
        require: true
    },
    WhiteBloodCellCount: {
        type: String,
        require: true
    },
    patientId: {
        type: String,
        require: true
    }

})

export default mongoose.model("LabReport", LabReportSchema)
