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


    const updateAppointment = async () => {
        await axios.put('/api/update-appointment', {
            id: single,
            updateLabAppointment: {
                date,
                lab: labNo,
                status,
            }
        }, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                toast.success('Appointment Updated Successfully')
                setEditState(false)
                fetchLapAppointment()
            })
            .catch((err) => {
                toast.error('Error Updating Appointment. Please try again')
                setEditState(false)
                fetchLapAppointment()
                console.log(err)
            })
    }

    const deleteAppointment = async () => {
        await axios.delete('/api/delete-appointment', {
            params: {
                id: single
            },
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                toast.success('Appointment Deleted Successfully')
                router.push('/staff/view-appointment')
            })
            .catch((err) => {
                toast.error('Error Deleting Appointment. Please try again')
                console.log(err)
            })
    }

    return (
        <MainWrapper>
            <div className="mt-10 md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">{editState ? 'Edit' : 'View'} Appointment</h3>
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
                                            type="email"
                                            name="fullName"
                                            id="fullName"
                                            className="bg-gray-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="patientID"
                                               className="block text-sm font-medium text-gray-700">
                                            Patient ID
                                        </label>
                                        <input
                                            disabled={true}
                                            value={patientId}
                                            onChange={(e) => setPatientId(e.target.value)}
                                            type="text"
                                            name="patientID"
                                            id="patientID"
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
                                                disabled={!editState}
                                                renderInput={(props) => <TextField {...props} fullWidth/>}
                                                onChange={(newValue) => {
                                                    setDate(newValue.$d);
                                                }}
                                                value={date}
                                                name="date"
                                                id="date"
                                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${editState ? '' : 'bg-gray-100'}`}
                                            />
                                        </LocalizationProvider>

                                    </div>


                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="status"
                                               className="block text-sm font-medium text-gray-700">
                                            Status
                                        </label>
                                        <select
                                            disabled={!editState}
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            name="status"
                                            id="status"
                                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${editState ? '' : 'bg-gray-100'}`}
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
                                            disabled={!editState}
                                            value={labNo}
                                            onChange={(e) => setLabNo(e.target.value)}
                                            type="text"
                                            name="labNo"
                                            id="labNo"
                                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${editState ? '' : 'bg-gray-100'}`}
                                        />
                                    </div>


                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 flex justify-between sm:px-6">
                                {!editState ?
                                    <button
                                        onClick={deleteAppointment}
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    >
                                        Delete
                                    </button>
                                    :
                                    <div></div>
                                }
                                {editState ?
                                    <button
                                        onClick={updateAppointment}
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Save
                                    </button>
                                    :
                                    <button
                                        onClick={() => setEditState(true)}
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Edit
                                    </button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainWrapper>
    );
};

export default Single;
