import React, { useContext, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import SectionTitle from '../SectionTitle/SectionTitle';
import Chart1 from '../Chart/Chart1';
import { AuthContext } from '../../providers/AuthProvider';
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet-async';



const Dashboard = () => {


    const { loading } = useContext(AuthContext);

    if (loading) {
        return <Loader></Loader>
    }

    const loadedTask = useLoaderData();

    // const [tasks, setTasks] = useState(loadedTask);
    const [sortBy, setSortBy] = useState('asc');
    const [filteredTasks, setFilteredTasks] = useState(loadedTask);

    const handleDelete = _id => {
        console.log(_id);
        fetch(`https://project-task-server.vercel.app/tasks/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Delete Successful!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    const remaining = filteredTasks.filter(task => task._id !== _id);
                    setFilteredTasks(remaining);
                }
            })
    }


    const handleFilter = () => {
        if (sortBy === 'asc') {
            // Sort tasks in ascending order by title
            const sortedTasks = [...filteredTasks].sort((a, b) =>
                a.title.localeCompare(b.title)
            );
            setFilteredTasks(sortedTasks);
            setSortBy('desc');
        } else {
            // Sort tasks in descending order by title
            const sortedTasks = [...filteredTasks].sort((a, b) =>
                b.title.localeCompare(a.title)
            );
            setFilteredTasks(sortedTasks);
            setSortBy('asc');
        }
    };


    return (
        <>
            <div>
                <Helmet>
                    <title>Daily Work | Dashboard</title>
                </Helmet>
                <div className='mt-5 mb-5'>
                    <SectionTitle heading='View Tasks' />
                </div>


                <div className='text-center mb-4'>
                    <button onClick={handleFilter} className={`btn ${sortBy === 'asc' ? 'btn-success' : ' btn-info'}`}>
                        {sortBy === 'asc' ? 'Sort A-Z' : 'Sort Z-A'}
                    </button>
                </div>

                <div className="overflow-x-auto card shadow-xl">
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
                                <th className='text-center'>Action</th>

                            </tr>
                        </thead>
                        <tbody>

                            {/* Table Contents */}

                            {
                                filteredTasks.map((task, index) =>
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
                                        <td className='text-center'><button onClick={() => handleDelete(task._id)} className='btn btn-error'>Delete</button></td>

                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <div className='mt-10 mb-10'>
                    <SectionTitle heading='D3js Chart' />
                </div>
                <div className=' flex justify-center'>
                    {/* Create d3js chart here */}
                    <Chart1></Chart1>
                </div>
            </div>
        </>
    );
};

export default Dashboard;