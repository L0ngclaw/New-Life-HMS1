import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import MainWrapper from "../../components/wrappers/MainWrapper";
import axios from "axios";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ViewReport = () => {
    const [searchString, setSearchString] = useState('');

    const [appointmentArray, setAppointmentArray] = useState([]);
    const [fetchedArray, setFetchedArray] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const filteredArray = fetchedArray.filter((person) => {
            return person.name.toLowerCase().includes(searchString.toLowerCase())
        });
        setAppointmentArray(filteredArray);
    }, [searchString]);

    const DataObj = {
        name: 'na2me',
        patientEmail: 'appointme2ntId',
        RedBloodCellCount: 'RedBl2oodCellCount',
        Hemoglobin: 'Hemogl32obin',
        Hematocrit: 'Hemato3232323crit',
        Type: 'Ty23232pe',
        PlateletCount: 'PlateletCou323nt',
        WhiteBloodCellCount: 'WhiteB232loodCellCount'
    }

    useEffect(() => {
        fetchAllReports()
    }, []);

    const fetchAllReports = async () => {
        await axios.get('/api/get-user-lab-reports', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                setAppointmentArray(res.data);
                setFetchedArray(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <MainWrapper>
            <div className="mt-10">

                <div>
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-xl font-semibold text-gray-900">Reports</h1>
                                <p className="mt-2 text-sm text-gray-700">
                                     You can see all your lab reports here
                                </p>
                            </div>

                        </div>
                        <div className="mt-8 flex flex-col">
                            <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle">
                                    <div className="shadow-sm ring-1 ring-black ring-opacity-5">
                                        <table className="min-w-full border-separate" style={{borderSpacing: 0}}>
                                            <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                                                >
                                                    Name
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                                                >
                                                    Email
                                                </th>

                                                <th
                                                    scope="col"
                                                    className=" sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                                                >
                                                    <span className="sr-only">View</span>
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white">
                                            {appointmentArray.map((person, personIdx) => (
                                                <tr key={person._id}>
                                                    <td
                                                        className={classNames(
                                                            personIdx !== appointmentArray.length - 1 ? 'border-b border-gray-200' : '',
                                                            'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                        )}
                                                    >
                                                        {person.name}
                                                    </td>
                                                    <td
                                                        className={classNames(
                                                            personIdx !== appointmentArray.length - 1 ? 'border-b border-gray-200' : '',
                                                            'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell'
                                                        )}
                                                    >
                                                        {person.email}
                                                    </td>

                                                    <td
                                                        className={classNames(
                                                            personIdx !== appointmentArray.length - 1 ? 'border-b border-gray-200' : '',
                                                            'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8'
                                                        )}
                                                    >
                                                        <a onClick={() => router.push(`/patient/view-report/${person._id}`)}
                                                           className="cursor-pointer text-indigo-600 hover:text-indigo-900">
                                                            View<span className="sr-only">, {person.name}</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
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

export default ViewReport;
