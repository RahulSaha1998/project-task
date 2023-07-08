import React, { useContext, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../SectionTitle/SectionTitle';

const AllTask = () => {

    const loadedTask = useLoaderData();
    const [tasks, setTasks] = useState(loadedTask);

    const { loading } = useContext(AuthContext);

    if (loading) {
        return <Loader></Loader>
    }

    const handleDelete = _id => {
        console.log(_id);
        fetch(`http://localhost:5000/tasks/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.deletedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted Successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    const remaining = tasks.filter(task => task._id !== _id);
                    setTasks(remaining);
                }
            })
    }

    return (
        <div>
            <div className='mt-5 mb-5'>
                <SectionTitle heading='All Tasks' />
            </div>
            <div className="overflow-x-auto card shadow-xl">
                <Helmet>
                    <title>Daily Work | Tasks</title>
                </Helmet>
                <table className="table table-zebra">
                    {/* Table head */}
                    <thead>
                        <tr className="bg-slate-400 text-slate-800 text-base">
                            <th className='text-center'>No</th>
                            <th className='text-center'>Title</th>
                            <th className='text-center'>Description</th>
                            <th className='text-center'>Due Date</th>
                            <th className='text-center'>Status</th>
                            <th className='text-center'>Assigned User</th>
                            <th className='text-center'>Update</th>
                            <th className='text-center'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* Table Contents */}

                        {
                            tasks.map((task, index) =>
                                <tr
                                    key={task._id}
                                    index={index}
                                    className='font-bold'
                                >
                                    <th className='text-center'>{index + 1}</th>
                                    <td className='text-center'>{task.title}</td>
                                    <td className='text-center'>{task.description}</td>
                                    <td className='text-center'>{task.date}</td>
                                    <td className='text-center'>{task.status}</td>
                                    <td className='text-center'>{task.name}</td>
                                    <td className='text-center'><Link to={`/update/${task._id}`}>
                                        <button className='btn btn-info'>Update</button>
                                    </Link></td>
                                    <td className='text-center'><button onClick={() => handleDelete(task._id)} className='btn btn-error'>Delete</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllTask;