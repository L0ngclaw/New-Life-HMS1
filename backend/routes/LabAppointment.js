import express from 'express'
import {
    addLabAppointment,
    deleteReport,
    getLabReport, getLabReportOfUser,
    getSingleReport,
    updateReport
} from "../controllers/LabAppointment";
import {checkUser} from "../middlewares/auth";

const router = express.Router()

router.post('/add-Appointment', checkUser, addLabAppointment);
router.get('/get-all-appointments', checkUser, getLabReport);
router.get('/get-all-appointments-of-user', checkUser, getLabReportOfUser);
router.get('/get-single', checkUser, getSingleReport);
router.put('/update-appointment', checkUser, updateReport);
router.delete('/delete-appointment', checkUser , deleteReport);

module.exports = router;
