import LabAppointment from "../models/LabAppointment";
import User from "../models/user";


export const addLabAppointment = async (req, res) => {
    const {
        email,
        name,
        date,
        lab,
        status,
    } = req.body;

    await User.findOne({email: email})
        .then(async (user) => {
            if (user.role.toString() !== 'patient') {
                return res.status(400).json({
                    error: "User is not a patient"
                })
            }

            await LabAppointment.create({
                email,
                name,
                date,
                lab,
                status,
                patientId: user._id
            })
                .then((labAppointment) => {
                    return res.status(200).json({
                        labAppointment
                    })
                })
                .catch((err) => {
                    return res.status(400).json({
                        error: err
                    })
                })
        })
        .catch((err) => {
            return res.status(400).json({
                error: err,
                message: "Enter a valid Email"
            })
        })

};

export const getLabReport = (req, res) => {
    LabAppointment.find()
        .then((LabAppointments) => {
            return res.status(200).json(LabAppointments);
        })
        .catch((err) => {
            return res.status(200).json(err);
        });
}

export const getLabReportOfUser = (req, res) => {
    const {userId} = req.body;

    LabAppointment.find(
        {patientId: userId}
    )
        .then((LabAppointments) => {
            return res.status(200).json(LabAppointments);
        })
        .catch((err) => {
            return res.status(200).json(err);
        });
}


export const updateReport = async (req, res) => {
    const {id, updateLabAppointment} = req.body;

    await LabAppointment.findByIdAndUpdate(id, updateLabAppointment, {new: true})
        .then((update) => {
            res.status(200).send({status: "Appointment Updated", APT: update});
        })
        .catch((err) => {
            console.log(err.message);
            res
                .status(500)
                .send({Status: "Error with Updating Data", error: err.message});
        });
}

export const deleteReport = async (req, res) => {
    let {id} = req.query;

    await LabAppointment.findByIdAndDelete(id)
        .then(() => {
            res.status(200).send({Status: "Appointment Deleted", APT: this.delete});
        })
        .catch((err) => {
            console.log(err.message);
            res
                .status(500)
                .send({Status: "Error with Deleting Data", error: err.message});
        });
}

export const getSingleReport = async (req, res) => {
    let {id} = req.query;

    await LabAppointment.findById(id)
        .then((APT) => {
            res.status(200).send({Status: "Appointment Fetched", APT: APT});
        })
        .catch((err) => {
            console.log(err.message);
            res
                .status(500)
                .send({
                    Status: "Error with Fetching Appointment", error: err.message,
                });
        });
}
