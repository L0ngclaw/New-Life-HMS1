    import React, {useState} from 'react';
import {FirebaseApp} from "../../services/firebase";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {FcGoogle} from "react-icons/fc";
import {motion} from "framer-motion"
import axios from "axios";
import {useRouter} from "next/router";

const LoginButton = ({isLoggedIn, setIsLoggedIn}) => {
    const auth = getAuth(FirebaseApp);
    const provider = new GoogleAuthProvider();
    const router = useRouter();

    const [userData, setUserData] = useState({});

    const [step, setStep] = useState(1);

    const [isRegistered, setIsRegistered] = useState(false);

    const loginHandler = () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                setUserData(user);

                return user
                // ...
            })
            .then(async (user) => {
                await axios.post('/api/is-registered', {
                    email: user.email
                }).then(async (res) => {
                    if (res.data.registered) {
                        setIsRegistered(true)
                        await submitUserHandler(user.email)
                    } else {
                        setStep(step + 1)
                    }
                })
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }


    const submitUserHandler = async (email, value) => {
        await axios.post('/api/auth', {
            email: email,
            role: value
        })
            .then(async (res) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', res.data.user.role);
                await router.push('/')
            })
    }


    return (
        <div className={`flex min-h-full items-center justify-center ${step === 1 ? 'py-52' : 'py-32'}`}>
            {step === 1 &&
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="/icon.png"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    <div className="mt-8 space-y-6">
                        <div>
                            <button
                                onClick={loginHandler}
                                type="button"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FcGoogle className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                              aria-hidden="true"/>
                                </span>
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
            }

            {step === 2 &&
                <div className="w-full max-w-max ">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="/icon.png"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Select your Role
                        </h2>
                    </div>
                    <div
                        className="mt-8 space-y-10 sm:space-y-0 sm:space-x-10 grid grid-rows-2 sm:grid-rows-1  sm:grid-cols-2">
                        <motion.div
                            onClick={() => submitUserHandler(userData.email, 'staff')}
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.9}}
                            className="hover:shadow-lg cursor-pointer">
                            <blockquote className="relative rounded-lg bg-white shadow-lg">
                                <div className="rounded-t-lg overflow-hidden h-96">
                                    <img src={'/img/doctor.jpg'} className={`rounded-t-lg `} alt={'doctor'}/>
                                </div>
                                <cite
                                    className="relative flex items-center rounded-b-lg bg-green-600 py-5 px-6 not-italic  sm:items-start sm:py-5 sm:pl-12 sm:pr-10">
                                    <span className="relative font-semibold leading-6 text-green-300 ">
                                        <span className="font-semibold text-white sm:inline">Hospital Staff</span>{' '}
                                    </span>
                                </cite>
                            </blockquote>
                        </motion.div>
                        <motion.div
                            onClick={() => submitUserHandler(userData.email, 'patient')}
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.9}}>
                            <blockquote className="relative rounded-lg bg-white shadow-lg">
                                <div className="rounded-t-lg overflow-hidden h-96">
                                    <img src={'/img/patient.jpg'} className={`rounded-t-lg `} alt={'patient'}/>
                                </div>
                                <cite
                                    className="relative flex items-center rounded-b-lg bg-indigo-600 py-5 px-6 not-italic  sm:items-start sm:py-5 sm:pl-12 sm:pr-10">
                                    <span className="relative font-semibold leading-6 text-indigo-300 ">
                                        <span className="font-semibold text-white sm:inline">Patient</span>{' '}
                                    </span>
                                </cite>
                            </blockquote>
                        </motion.div>
                    </div>
                </div>}
        </div>
    );
};

export default LoginButton;
