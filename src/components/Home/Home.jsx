
import { useContext } from 'react';
import AddTask from '../AddTask/AddTask';
import Loader from '../Loader/Loader';
import { AuthContext } from '../../providers/AuthProvider';

const Home = () => {

    // const { loading } = useContext(AuthContext);

    // if (loading) {
    //     return <Loader></Loader>
    // }

    return (
        <div>
            <div>
                <AddTask></AddTask>
            </div>
        </div>
    );
};

export default Home;