import React, { useContext } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../SectionTitle/SectionTitle';

const Update = () => {

    const loadedTask = useLoaderData()
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    const handelUpdateTask = async (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const date = form.date.value;
        const status = form.status.value;
        const desc = form.desc.value;


        const updatedTask = {
            title: title,
            date,
            status,
            description: desc
        };
        console.log(updatedTask);

        fetch(`https://project-task-server.vercel.app/tasks/${loadedTask._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Task Updated Successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate('/allTask')
                }
            })


    }


    return (
        <div>
            <div className='mt-5 mb-5'>
                <SectionTitle heading='Update Task' />
            </div>
            <div className="hero h-full">
                <Helmet>
                <title>Daily Work | Update</title>
            </Helmet>
                
                <div className='bg-slate-200 rounded-lg shadow-xl p-7'>

                    {/* <Fade> */}
                    <form onSubmit={handelUpdateTask} className='w-[80%] mx-auto '>
                        <div className='grid grid-cols-2 gap-5'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" defaultValue={loadedTask.title}
                                    name='title'
                                    className="input input-info"
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
                                    defaultValue={loadedTask.date}
                                    className="input input-info"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Status</span>
                                </label>
                                <select
                                    defaultValue={loadedTask.status}
                                    name="status"
                                    className="input input-info"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                </select>
                            </div>


                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea type="text"
                                name='desc'
                                defaultValue={loadedTask.description}
                                className="textarea textarea-info w-full"
                            />
                        </div>

                        <div className="form-control mt-6 text-center">
                            <input className="btn btn-block btn-info mb-6" type="submit" value='update' />
                        </div>
                    </form>
                    {/* </Fade> */}
                </div>
            </div>
        </div>
    );
};

export default Update;