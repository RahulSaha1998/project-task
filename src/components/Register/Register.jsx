import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import SocialLogin from '../SocialLogin/SocialLogin';
import { AuthContext } from '../../providers/AuthProvider';
// import useTitle from '../../hooks/useTitile';
import Swal from 'sweetalert2';
import Lottie from "lottie-react";
import reg from '../../../public/reg.json';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Helmet } from 'react-helmet-async';

const Register = () => {

    const [errors, setError] = useState('')
    const [success, setSuccess] = useState('');
    const [role, setRole] = useState("user");

    // useTitle('Register')
    const navigate = useNavigate();


    const { registerUser, logOut, updateUserData } = useContext(AuthContext)

    const handelRegister = (event) => {
        event.preventDefault();
        setSuccess('');
        setError('')
        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, role, email, password, photoURL );
        const saveUser = {name: name, email: email, role: role};

        if (password.length < 6) {
            return setError('Password must be greater than 6 characters');
        }

        registerUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                updateUserData(name, photoURL);
                logOut()
                console.log(loggedUser);
                form.reset();
                fetch('https://project-task-server.vercel.app/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(saveUser)
            });


                setError('')
                setSuccess('Successfully Register!');
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  navigate('/login')

            })
            .catch(error => {
                console.log(error);
                setError('Try again there is something missing!')

            })

    }

    return (
        <div className='grid md:grid-cols-2 mx-auto'>
            <Helmet>
                <title>Daily Work | Register</title>
            </Helmet>
            <div>
                <h2>
                    <Lottie animationData={reg}></Lottie>
                </h2>
            </div>
            <div className="hero">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-slate-300">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Register Here!</h1>
                        <form onSubmit={handelRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name"
                                    name='name'
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" placeholder="Photo URL"
                                    name='photo'
                                    className="input input-bordered" />
                            </div>
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
                            </div>
                            <div className='text-center mt-2'>
                                {
                                    <p className='text-red-700'>{errors}</p>
                                }
                                {
                                    <p className='text-blue-600'>{success}</p>
                                }
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>

                        </form>
                        <p className='my-4 text-center'>Already Have an account? <Link className='text-orange-600 font-bold' to="/login">Login</Link> </p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

