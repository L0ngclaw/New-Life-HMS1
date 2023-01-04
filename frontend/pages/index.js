import React, {useEffect, useState} from 'react';
import MainWrapper from "../components/wrappers/MainWrapper";
import MainMenu from "../components/Menu/MainMenu";
import {useRouter} from "next/router";

const Home = () => {
    //patient staff
    const [userType, setUserType] = useState('staff');

    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/auth');
        } else {
            setUserType(localStorage.getItem('role'));
        }
    }, [router]);

    return (
        <MainWrapper>
          <MainMenu userType={userType}/>
        </MainWrapper>
    );
};

export default Home;
