import React, {useEffect, useState} from 'react';
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import MainWrapper from "../../../components/wrappers/MainWrapper";
import {useRouter} from "next/router";
import axios from "axios";
import {toast} from "react-toastify";

const Single = () => {
    const router = useRouter()
    const {single} = router.query

    const nowDate = new Date().toISOString()

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [patientId, setPatientId] = useState('');
    const [appointmentID, setAppointmentID] = useState('');
    const [date, setDate] = useState(nowDate);
    const [status, setStatus] = useState('');
    const [labNo, setLabNo] = useState('');

    const [editState, setEditState] = useState(false);

    const createAppointment = () => {
        setEditState(false)
    }

    useEffect(() => {
        if (single) {
            fetchLapAppointment()
        }
    }, [single]);

    const fetchLapAppointment = async () => {
        await axios.get(`/api/get-single`, {
            params: {
                id: single
            },
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                setFullName(res.data.APT.name)
                setEmail(res.data.APT.email);
                setPatientId(res.data.APT.patientId);
                setDate(res.data.APT.date);
                setAppointmentID(res.data.APT.appointmentId);
                setStatus(res.data.APT.status);
                setLabNo(res.data.APT.lab);
            })
    }

    return (
        <MainWrapper>
            <div className="mt-10 md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">View Appointment</h3>
                        <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive
                            mail.</p>
                    </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                    <div>
                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="bg-white px-4 py-5 sm:p-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 ">
                                        <label htmlFor="fullName"
                                               className="block text-sm font-medium text-gray-700">
                                            Patient Full Name
                                        </label>
                                        <input
                                            disabled={true}
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            type="text"
                                            name="fullName"
                                            id="fullName"
                                            className="bg-gray-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="col-span-6 ">
                                        <label htmlFor="fullName"
                                               className="block text-sm font-medium text-gray-700">
                                            Patient Email
                                        </label>
                                        <input
                                            disabled={true}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="text"
                                            name="fullName"
                                            id="fullName"
                                            className="bg-gray-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="patientEmail"
                                               className="block text-sm font-medium text-gray-700">
                                            Patient ID
                                        </label>
                                        <input
                                            disabled={true}
                                            value={patientId}
                                            onChange={(e) => setPatientId(e.target.value)}
                                            type="email"
                                            name="patientEmail"
                                            id="patientEmail"
                                            className="bg-gray-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="appointmentID"
                                               className="block text-sm font-medium text-gray-700">
                                            Appointment ID
                                        </label>
                                        <input
                                            disabled={true}
                                            value={appointmentID}
                                            onChange={(e) => setAppointmentID(e.target.value)}
                                            type="text"
                                            name="appointmentID"
                                            id="appointmentID"
                                            className="bg-gray-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <hr className={`col-span-6 mt-4`}/>


                                    <div className="col-span-6">
                                        <label htmlFor="date"
                                               className="block text-sm font-medium text-gray-700">
                                            Date
                                        </label>
                                        <LocalizationProvider
                                            className={'w-full'} dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                disabled={true}
                                                renderInput={(props) => <TextField {...props} fullWidth/>}
                                                onChange={(newValue) => {
                                                    setDate(newValue.$d);
                                                }}
                                                value={date}
                                                name="date"
                                                id="date"
                                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100`}
                                            />
                                        </LocalizationProvider>

                                    </div>


                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="status"
                                               className="block text-sm font-medium text-gray-700">
                                            Status
                                        </label>
                                        <select
                                            disabled={true}
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            name="status"
                                            id="status"
                                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100`}
                                        >
                                            <option>Completed</option>
                                            <option>Not-Completed</option>
                                        </select>
                                    </div>


                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="labNo"
                                               className="block text-sm font-medium text-gray-700">
                                            Lab No
                                        </label>
                                        <input
                                            disabled={true}
                                            value={labNo}
                                            onChange={(e) => setLabNo(e.target.value)}
                                            type="text"
                                            name="labNo"
                                            id="labNo"
                                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainWrapper>
    );
}

export default Single;
