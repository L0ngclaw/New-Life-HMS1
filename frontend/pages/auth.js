import React, {useEffect, useState} from 'react';
import MainWrapper from "../components/wrappers/MainWrapper";
import LoginButton from "../components/buttons/LoginButton";

const Auth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {

    }, []);

    return (
        <MainWrapper>
            <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        </MainWrapper>
    );
};

export default Auth;
