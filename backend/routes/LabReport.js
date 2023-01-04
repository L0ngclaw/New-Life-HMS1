import express from 'express'
import {
    addLabReport,
    deleteReport,
    getLabReportDetails,
    getSingleLabReport,
    getUserLabReports,
    updateReport
} from "../controllers/LabReport";
import {checkUser} from "../middlewares/auth";

const router = express.Router()

router.post('/add-ReportDetails', checkUser, addLabReport);
router.get('/getLabReportDetails', checkUser, getLabReportDetails);
router.get('/get-single-lab-report', checkUser, getSingleLabReport);
router.get('/get-user-lab-reports', checkUser, getUserLabReports);
router.delete('/delete-single-lab-report', checkUser, deleteReport);
router.put('/update-single-lab-report', checkUser, updateReport);

module.exports = router;
