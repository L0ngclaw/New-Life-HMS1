import LabReport from "../models/LabReport";
import User from "../models/user";


export const addLabReport = async (req, res) => {
    const {
        email, name, RedBloodCellCount, Hemoglobin, Hematocrit, Type, PlateletCount, WhiteBloodCellCount
    } = req.body;

    await User.findOne({email: email})
        .then(async (user) => {
            if (user.role.toString() !== 'patient') {
                return res.status(400).json({
                    error: "User is not a patient"
                })
            }

            await LabReport.create({
                email,
                name,
                RedBloodCellCount,
                Hemoglobin,
                Hematocrit,
                Type,
                PlateletCount,
                WhiteBloodCellCount,
                patientId: user._id
            })
                .then((LabReport) => {
                    return res.status(200).json({
                        LabReport
                    })
                })
                .catch((err) => {
                    return res.status(400).json({
                        error: 'Lab Report not added'
                    })
                })
        })
        .catch((err) => {
            return res.status(400).json({
                error: "Please enter a valid email"
            })
        })

};
export const getLabReportDetails = async (req, res) => {
    await LabReport.find()
        .then((LabReports) => {
            return res.status(200).json(LabReports);
        })
        .catch((err) => {
            return res.status(200).json(err);
        });
}

export const getSingleLabReport = async (req, res) => {

    const {id} = req.query;

    await LabReport.findOne({_id: id})
        .then((LabReport) => {
            return res.status(200).json(LabReport);
        })
        .catch((err) => {
            return res.status(200).json(err);
        });
}

export const getUserLabReports = async (req, res) => {
    const {userId} = req.body

    await LabReport.find({
        patientId: userId
    }).then((LabReports) => {
        return res.status(200).json(LabReports);
    }).catch((err) => {
        return res.status(200).json(err);
    });

}

export const deleteReport = async (req, res) => {
    const {id} = req.query;

    await LabReport.deleteOne({_id: id})
        .then((LabReport) => {
            return res.status(200).json(LabReport);
        })
        .catch((err) => {
            return res.status(200).json(err);
        })
}

export const updateReport = async (req, res) => {
    const {
        id,
        name,
        email,
        RedBloodCellCount,
        Hemoglobin,
        Hematocrit,
        Type,
        PlateletCount,
        WhiteBloodCellCount,
    } = req.body;

    User.findOne({email})
        .then(user => {
            if (user) {
                LabReport.findOneAndUpdate(
                    {_id: id},
                    {
                        name,
                        email,
                        RedBloodCellCount,
                        Hemoglobin,
                        Hematocrit,
                        Type,
                        PlateletCount,
                        WhiteBloodCellCount,
                    },
                    {new: true})
                    .then((lab) => {
                        return res.status(200).json({
                            message: 'Report Update Successfully'
                        })
                    })
                    .catch((err) => {
                        return res.status(200).json({
                            message: 'Update error',
                            err
                        })
                    })
            } else {
                return res.status(200).json({
                    message: 'Check Email Entered',
                    registered: false,
                })
            }
        })

}
