import React, {useEffect, useState} from 'react';
import {HiArchive, HiLockClosed, HiBan, HiShieldCheck, HiCog, HiServer} from 'react-icons/hi';
import {motion} from "framer-motion";
import {useRouter} from "next/router";

const MainMenu = ({userType}) => {
    const router = useRouter();

    const staff_features = [
        {
            name: 'View Appointments',
            description: 'Your appointments are now at your fingertip  Check it out',
            icon: HiArchive,
            redirect: "/staff/view-appointment"
        },
        {
            name: 'Create New Appointment',
            description: 'New life Hospitals Lab Appointments Creation.',
            icon: HiLockClosed,
            redirect: "/staff/create-appointment"
        },
        {
            name: 'Create New Report',
            description: 'New life Hospitals Lab Report Creation.',
            icon: HiBan,
            redirect: "/staff/create-reports"
        },
        {
            name: 'View Reports',
            description: 'Your Lab reports are now at your fingertip  Check it out',
            icon: HiBan,
            redirect: "/staff/view-reports"
        },
        {
            name: 'About Labs',
            description: 'Over the last 30 years New life Laborataries has built a reputation for dependability.The most modern analysers in the world are now with you.',
            icon: HiBan,
            redirect: "/"
        },
        {
            name: 'Prevention Health Checks',
            description: 'We offer you a range of health checks that are designed to detect any early warning signs for some of the more common but preventable illnesses.',
            icon: HiBan,
            redirect: "/"
        },
    ]

    const patient_features = [
        {
            name: 'View Appointment',
            description: 'Your appointments are now at your fingertip  Check it out.',
            icon: HiArchive,
            redirect: "/patient/view-appointments"
        },
        {
            name: 'View Lab Reports',
            description: 'Your Lab reports are now at your fingertip  Check it out',
            icon: HiLockClosed,
            redirect: "/patient/view-report"
        },
        {
            name: 'About Labs',
            description: 'Over the last 30 years New life Laborataries has built a reputation for dependability.The most modern analysers in the world are now with you.',
            icon: HiBan,
            redirect: "/"
        },
    ]

    const [features, setFeatures] = useState([]);
    useEffect(() => {
        if (userType === 'staff') {
            setFeatures(staff_features);
        }
        if (userType === 'patient') {
            setFeatures(patient_features);
        }
    }, [userType]);

    return (
        <div className="relative bg-white py-16 sm:py-12 lg:py-16">
            <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-lg font-semibold text-indigo-600">Welcome {userType[0].toUpperCase()}{userType.toString().slice(1,userType.length).toLowerCase()}</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    NewLife Laboratories
                </p>
                <div className="mt-12">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <motion.div
                                id={feature.name}
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                key={feature.name} className="pt-6 cursor-pointer"
                            >
                                <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8"
                                     onClick={() => router.push(feature.redirect)}>
                                    <div className="-mt-6">
                                        <div>
                                            <span
                                                className="inline-flex items-center justify-center rounded-md bg-indigo-500 p-3 shadow-lg">
                                                <feature.icon className="h-6 w-6 text-white" aria-hidden="true"/>
                                            </span>
                                        </div>
                                        <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">{feature.name}</h3>
                                        <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainMenu;
