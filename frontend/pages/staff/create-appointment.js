import React, {useEffect, useState} from 'react';
import MainWrapper from "../../components/wrappers/MainWrapper";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const CreateAppointment = () => {
    const router = useRouter()


    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState(new Date().toISOString());
    const [status, setStatus] = useState('Not-Completed');
    const [labNo, setLabNo] = useState('');

    const createAppointment = async () => {
        if (fullName === '' || email === '' || date === '' || status === '' || labNo === '') {
            toast.error('Please fill all the fields');
            return;
        }

        await axios.post('/api/add-Appointment',
            {
                email,
                name: fullName,
                date,
                lab: labNo,
                status,
            },
            {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                toast.success('Appointment Created Successfully')
                router.push('/staff/view-appointment')
            })
            .catch((err) => {
                toast.error(err.response.data.message)
            })
    }

    return (
        <MainWrapper>
            <div className="mt-10">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Create Appointment</h3>
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
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                type="text"
                                                name="fullName"
                                                id="fullName"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 ">
                                            <label htmlFor="patientEmail"
                                                   className="block text-sm font-medium text-gray-700">
                                                Patient Email
                                            </label>
                                            <input
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                type="text"
                                                name="patientEmail"
                                                id="patientEmail"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>


                                        <div className="col-span-6 w-full">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateTimePicker
                                                    renderInput={(props) => <TextField {...props} fullWidth/>}
                                                    onChange={(newValue) => {
                                                        setDate(new Date(newValue.$d).toISOString());
                                                    }}
                                                    value={date}
                                                    name="date"
                                                    id="date"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </LocalizationProvider></div>

                                        <hr className={`col-span-6 mt-4`}/>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="status"
                                                   className="block text-sm font-medium text-gray-700">
                                                Status
                                            </label>
                                            <select
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                                name="status"
                                                id="status"
                                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
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
                                                value={labNo}
                                                onChange={(e) => setLabNo(e.target.value)}
                                                type="text"
                                                name="labNo"
                                                id="labNo"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>


                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button
                                        onClick={createAppointment}
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainWrapper>
    );
};

export default CreateAppointment;
