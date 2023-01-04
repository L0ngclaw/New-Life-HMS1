import React, {useEffect, useState} from 'react';
import MainHeader from "../header/MainHeader";
import {useRouter} from "next/router";

const MainWrapper = ({children}) => {
    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
            router.push('/auth')
        }
    }, [router.pathname])


    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
            router.push('/auth')
        }
    }, [isLoggedIn]);


    //ROUTE PROTECTION
    useEffect(() => {
        const role = localStorage.getItem('role')
        if (router.pathname !== '/auth') {
            if (role !== 'staff' && role !== 'patient') {
                router.push('/')
            }
        }

    }, [router]);

    useEffect(() => {
        const role = localStorage.getItem('role')
        if (router.pathname.includes('/staff') && role !== 'staff') {
            router.push('/')
        }
        if (router.pathname.includes('/patient') && role !== 'patient') {
            router.push('/')
        }

    }, [router]);

    return (
        <div className={`h-full`}>
            <MainHeader loggedInState={isLoggedIn} setLoggedInState={setIsLoggedIn}/>
            <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full`}>
                {children}
            </div>
        </div>
    );
};

export default MainWrapper;
