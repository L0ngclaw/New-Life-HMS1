import mongoose from "mongoose";

const {Schema} = mongoose

const UserSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true,
        enum: ['patient', 'staff'],
        default: 'patient'
    }
})

export default mongoose.model("User", UserSchema)
