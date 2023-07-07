import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const AllTask = () => {

    const tasks = useLoaderData();

    return (
        <div>
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
                                    <td className='text-center'><Link to='/update'>
                                    <button className='btn btn-info'>Update</button>
                                    </Link></td>
                                    <td className='text-center'><button className='btn btn-error'>Delete</button></td>
                                    
                            
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