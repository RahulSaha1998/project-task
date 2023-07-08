import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../SectionTitle/SectionTitle';

const AddTask = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddTask = async (event) => {
        if (user && user.email) {
            event.preventDefault();
            const form = event.target;
            const title = form.title.value;
            const date = form.date.value;
            const status = form.status.value;
            const desc = form.desc.value;
            const name = user?.displayName;

            const task = {
                title: title,
                name,
                date,
                status,
                description: desc
            };
            console.log(task);

            try {
                const response = await fetch('https://project-task-server.vercel.app/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(task)
                });
                const data = await response.json();
                console.log(data);
                if (data.insertedId) {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Successfully added to Tasks!',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    form.reset();
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'You have to Login first!',
                showConfirmButton: false,
                timer: 2000
            });
            navigate('/login');
        }
    };



    return (
        <div>
            <div className='mt-5 mb-5'>
                <SectionTitle heading='Add Task' />
            </div>
            <div className="hero h-full">
                <Helmet>
                    <title>Daily Work | Home</title>
                </Helmet>
                <div className='bg-slate-200 rounded-lg shadow-xl p-7 mb-5'>
                    <form onSubmit={handleAddTask} className='w-[80%] mx-auto '>
                        <div className='grid grid-cols-2 gap-5'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" placeholder="Title"
                                    name='title'
                                    className="input input-info"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User Name</span>
                                </label>
                                <input type="text" defaultValue={user?.displayName}
                                    name='name'
                                    className="input input-info"
                                    readOnly />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Due Date</span>
                                </label>
                                <input type="date"
                                    name='date'
                                    className="input input-info"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Status</span>
                                </label>
                                <input type="text" defaultValue="pending"
                                    name='status'
                                    className="input input-info"
                                    readOnly />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea type="text"
                                name='desc'
                                placeholder='Write here . . .'
                                className="textarea textarea-info w-full"
                                required />
                        </div>
                        <div className="form-control mt-6 text-center">
                            <input className="btn btn-block btn-info mb-6" type="submit" value='Submit' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTask;