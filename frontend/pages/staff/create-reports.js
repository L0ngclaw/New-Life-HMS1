import React, {useState} from 'react';
import MainWrapper from "../../components/wrappers/MainWrapper";
import axios from "axios";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const CreateReports = () => {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [RedBloodCellCount, setRedBloodCellCount] = useState('');
    const [Hemoglobin, setHemoglobin] = useState('');
    const [Hematocrit, setHematocrit] = useState('');
    const [Type, setType] = useState('');
    const [PlateletCount, setPlateletCount] = useState('');
    const [WhiteBloodCellCount, setWhiteBloodCellCount] = useState('');


    const submitCreateReportHandler = async () => {
        await axios.post('/api/add-ReportDetails', {
                email, name, RedBloodCellCount, Hemoglobin, Hematocrit, Type, PlateletCount, WhiteBloodCellCount
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
            .then((res) => {
                toast.success('Lab Report added successfully');
                router.push('/staff/view-reports');
            })
            .catch((err) => {
                toast(err.response.data.error)
            })

    }

    return (
        <MainWrapper>
            <div className="mt-10 ">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Create Lab Report</h3>
                            <p className="mt-1 text-sm text-gray-600">Create a report here
                                mail.</p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <div className={`m-4`}>
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="name"
                                                   className="block text-sm font-medium text-gray-700">
                                                name
                                            </label>
                                            <input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="patientEmail"
                                                   className="block text-sm font-medium text-gray-700">
                                                patientEmail
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

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="RedBloodCellCount"
                                                   className="block text-sm font-medium text-gray-700">
                                                RedBloodCellCount
                                            </label>
                                            <input
                                                value={RedBloodCellCount}
                                                onChange={(e) => setRedBloodCellCount(e.target.value)}
                                                type="text"
                                                name="RedBloodCellCount"
                                                id="RedBloodCellCount"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="Hemoglobin"
                                                   className="block text-sm font-medium text-gray-700">
                                                Hemoglobin
                                            </label>
                                            <input
                                                value={Hemoglobin}
                                                onChange={(e) => setHemoglobin(e.target.value)}
                                                type="text"
                                                name="Hemoglobin"
                                                id="Hemoglobin"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="Hematocrit"
                                                   className="block text-sm font-medium text-gray-700">
                                                Hematocrit
                                            </label>
                                            <input
                                                value={Hematocrit}
                                                onChange={(e) => setHematocrit(e.target.value)}
                                                type="text"
                                                name="Hematocrit"
                                                id="Hematocrit"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="Type"
                                                   className="block text-sm font-medium text-gray-700">
                                                Type
                                            </label>
                                            <input
                                                value={Type}
                                                onChange={(e) => setType(e.target.value)}
                                                type="text"
                                                name="Type"
                                                id="Type"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="PlateletCount"
                                                   className="block text-sm font-medium text-gray-700">
                                                PlateletCount
                                            </label>
                                            <input
                                                value={PlateletCount}
                                                onChange={(e) => setPlateletCount(e.target.value)}
                                                type="text"
                                                name="PlateletCount"
                                                id="PlateletCount"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="WhiteBloodCellCount"
                                                   className="block text-sm font-medium text-gray-700">
                                                WhiteBloodCellCount
                                            </label>
                                            <input
                                                value={WhiteBloodCellCount}
                                                onChange={(e) => setWhiteBloodCellCount(e.target.value)}
                                                type="text"
                                                name="WhiteBloodCellCount"
                                                id="WhiteBloodCellCount"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>


                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button
                                        onClick={submitCreateReportHandler}
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

export default CreateReports;
