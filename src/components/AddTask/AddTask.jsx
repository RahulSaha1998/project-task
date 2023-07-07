import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
// import SectionTitle from '../SectionTitle/SectionTitle';

const AddTask = () => {

    const { user } = useContext(AuthContext);


    const handelAddClass = async (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const date = form.date.value;
        const status = form.status.value;
        const desc = form.desc.value;
        const name = user?.displayName;
        

        const addedList = {
            title: title,
            name,
            date,
            status,
            description: desc
        };
        console.log(addedList);


    }

    return (
        <div>
            <div className="hero h-full">
                {/* <Helmet>
                <title>Camp Arena | Add Class</title>
            </Helmet> */}
                {/* <div>
                    <SectionTitle heading='Add Task' />
                </div> */}
                <div className='bg-slate-200 rounded-lg shadow-xl mt-5 p-7'>

                    {/* <Fade> */}
                    <form onSubmit={handelAddClass} className='w-[80%] mx-auto '>
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
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder={user?.displayName}
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
                                    className="textarea textarea-info w-full"
                                    required />
                            </div>
                        
                        <div className="form-control mt-6 text-center">
                            <input className="btn btn-block btn-info mb-6" type="submit" value='Add task' />
                        </div>
                    </form>
                    {/* </Fade> */}
                </div>
            </div>
        </div>
    );
};

export default AddTask;