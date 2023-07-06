import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import login from '../../../public/login.json';
import Lottie from "lottie-react";

// import SocialLogin from '../SocialLogin/SocialLogin';
// import { AuthContext } from '../../providers/AuthProvider';
// import useTitle from '../../hooks/useTitile';

const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('');

    // const { signIn } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    // useTitle('Login')

    const from = location.state?.from?.pathname || '/';

    const handelLogin = (event) => {
        event.preventDefault()
        setSuccess('');
        setError('');
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        // signIn(email, password)
        //     .then(result => {
        //         const loggedUser = result.user;
        //         console.log(loggedUser);
        //         setError('');
        //         form.reset();
        //         setSuccess('successfully Login!');
        //         navigate(from, { replace: true })
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         setError('Email and password doesn,t match!');
        //     })
    }






    return (
        <div className='grid md:grid-cols-2 mx-auto'>
            <div className="hero">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-slate-300">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Login Please!</h1>
                        <form onSubmit={handelLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email"
                                    name='email'
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password"
                                    name='password'
                                    className="input input-bordered"
                                    required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className='text-center'>
                                <p className='text-red-600'>{error}</p>
                                <p className='text-cyan-700'>{success}</p>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>

                        </form>
                        <p className='my-4 text-center'>New to this site? <Link className='text-orange-600 font-bold' to="/register">Register</Link> </p>
                        {/* <SocialLogin></SocialLogin> */}
                    </div>
                </div>
            </div>
            <div>
                <h2>
                    <Lottie animationData={login}></Lottie>
                </h2>
            </div>
        </div>
    );
};

export default Login;
