import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";

const MainHeader = ({loggedInState, setLoggedInState}) => {
    const router = useRouter();

    const handleLogoutHandler =async () => {
        setLoggedInState(false)
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        await router.push('/')
    }

    return (
        <header className="bg-indigo-600">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div
                    className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
                    <div className="flex items-center">
                        <a href="#"
                           onClick={() => router.push('/')}
                        >
                            <span className="sr-only">Your Company</span>
                            <img className="h-10 w-auto scale-150" src="/icon.png" alt=""/>
                        </a>
                    </div>
                    {loggedInState ?
                        <div className="ml-10 space-x-4">
                            <a
                                onClick={handleLogoutHandler}
                                className="inline-block rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75 cursor-pointer"
                            >
                                Logout
                            </a>
                        </div> :
                        <div className="ml-10 space-x-4">
                            <a
                                onClick={() => router.push('/auth')}
                                className="inline-block rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75 cursor-pointer"
                            >
                                Login / Register
                            </a>
                        </div>
                    }
                </div>

            </nav>
        </header>
    );
};

export default MainHeader;
