import React, {useEffect, useState} from 'react';
import MainWrapper from "../../../components/wrappers/MainWrapper";
import {useRouter} from "next/router";
import axios from "axios";
import {toast} from "react-toastify";

const ReportSheet = () => {
    const router = useRouter();
    const {single} = router.query;

    const [data, setData] = useState({
        _id: '',
        name: '',
        patientEmail: '',
        RedBloodCellCount: '',
        Hemoglobin: '',
        Hematocrit: '',
        Type: '',
        PlateletCount: '',
        WhiteBloodCellCount: ''
    });

    const [isStaff, setIsStaff] = useState(false);
    useEffect(() => {
        localStorage?.getItem('role') === 'staff' ? setIsStaff(true) : setIsStaff(false)
    }, []);

    useEffect(() => {
        if (single) {
            fetchSingleReport(single)
        }
    }, [single]);

    const fetchSingleReport = async (single) => {
        await axios.get(`/api/get-single-lab-report`, {
            params: {
                id: single
            },
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                setData({
                    _id: res.data._id,
                    name: res.data.name,
                    patientEmail: res.data.email,
                    RedBloodCellCount: res.data.RedBloodCellCount,
                    Hemoglobin: res.data.Hemoglobin,
                    Hematocrit: res.data.Hematocrit,
                    Type: res.data.Type,
                    PlateletCount: res.data.PlateletCount,
                    WhiteBloodCellCount: res.data.WhiteBloodCellCount
                })
            })
    }

    const deleteReport = async () => {
        await axios.delete(`/api/delete-single-lab-report`, {
            params: {
                id: data._id
            },
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                console.log(res.data);
                toast.success('Report deleted successfully');
                router.push('/staff/view-reports')
            })
            .catch((err) => {
                console.log(err);
                toast.error('Error deleting report')
            })

    }

    return (
        <MainWrapper>
            <div className={`p-4 mt-10`}>
                <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                    <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                        <div className="ml-4 mt-2">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">User Report</h3>
                        </div>
                        {isStaff &&
                            <div className="ml-4 mt-2 flex-shrink-0 space-x-6">
                                <button
                                    onClick={deleteReport}
                                    type="button"
                                    className="relative inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    Delete Report
                                </button>
                                <button
                                    onClick={() => router.push(`/staff/edit-report/${single}`)}
                                    type="button"
                                    className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Edit Report
                                </button>
                            </div>}
                    </div>
                </div>
                <div className="mx-8 mt-5 border-b border-gray-200">
                    {Object.keys(data).map((key, index) => {
                        return <dl
                            key={index}
                            className="divide-y divide-gray-200">
                            <div className="mx-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                <dt className="text-sm font-medium text-gray-500">{key}</dt>
                                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">{data[key]}</span>
                                    <span className="ml-4 flex-shrink-0">
                            </span>
                                </dd>
                            </div>
                            <hr className={``}/>
                        </dl>
                    })}
                </div>
                <div className={`m-4 mx-10`}>
                    <button
                        onClick={() => {
                            if (window) {
                                window.print()
                            }
                        }}
                        className={"w-full inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"}
                    >
                        Print Report
                    </button>
                </div>
            </div>
        </MainWrapper>
    );
};

export default ReportSheet;
