import React from 'react';

export const NotFound:React.FC = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center flex-col'>
            <div className='w-2/3 lg:w-1/3 mx-auto '>
                <img src='/assets/not-found.svg'/>
            </div>
            <p className='mt-10 font-medium text-xl md:text-2xl lg:text-3xl'>Nie znaleziono strony</p>
        </div>
    );
};
