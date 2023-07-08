import React from 'react';
import Lottie from "lottie-react";
import loading2 from '../../../public/loading2.json'

const Loader = () => {
    return (
        <div className='flex justify-center'>
            <div className='text center m-4'>
            <Lottie className='w-52' animationData={loading2}></Lottie>
            </div>
            
        </div>
    );
};

export default Loader;