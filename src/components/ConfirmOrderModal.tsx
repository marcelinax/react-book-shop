import { BiX } from 'react-icons/bi';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ConfirmOrderModal: React.FC = () => {

    const naviagte = useNavigate();
    
    const finishOrder = (): void => {
        naviagte('/');
    };

    return (
        <div className='w-screen fixed h-full bg-gray-200/70 left-0 top-0 z-20 flex justify-center items-center'>
            <div className='flex w-5/6 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white rounded-lg p-6 md:p-14 flex-col relative'>
                <BiX size={20} className='absolute top-7 right-7 cursor-pointer' onClick={finishOrder}/>
                <div className='w-2/3 md:w-full mx-auto'>
                    <img src='/assets/on-the-way.svg' className='w-full'/>
                </div>
                <div className='w-full mt-6'>
                    <p className='text-xs md:text-base font-medium text-center'>Przyjęliśmy Twoje zamówienie! Niedługo będziemy u Ciebie!</p>
                </div>
            </div>
        </div>
    );
};
