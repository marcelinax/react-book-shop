import { BiSearchAlt2 } from 'react-icons/bi';
import { BookFilterItem } from './BookFilterItem';
import { PrimaryButton } from '../global/PrimaryButton';
import React from 'react';

interface Props {
    searchFormData: {
        title: string;
        author: string;
    },
    setSearchFormData: React.Dispatch<React.SetStateAction<{
        title: string;
        author: string;
    }>>
    onSearchSubmit: () => void;
}

export const BookFilter: React.FC<Props> = ({ searchFormData, setSearchFormData, onSearchSubmit }) => {

    const onChange = (e : React.ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = e.target;
        setSearchFormData({
            ...searchFormData,
            [id]:value
        });
    };

    return (
        <div className='bg-white py-8 z-10 shadow-sm'>
            <div className='container mx-auto px-14'>
                <div className='flex w-full'>
                    <BiSearchAlt2 size={40} className='opacity-30 mr-5 mt-2'/>
                    <div>
                        <h1 className='text-lg font-semibold mb-1'>
                            Wyszukiwarka
                        </h1>
                        <p className='text-sm mb-5'>
                            Znajdź książkę po tytule lub autorze
                        </p>
                    </div>
                </div>
                <div className='w-full flex'>
                    <div className='w-full'>
                        <BookFilterItem id='title' value={searchFormData.title} onChange={onChange} placeholder='Tytuł' />
                    </div>
                    <div className='w-full px-8'>
                        <BookFilterItem id='author' value={searchFormData.author} onChange={onChange} placeholder='Autor' />
                    </div>
                    <PrimaryButton title='Szukaj' type='button' onClick={onSearchSubmit} className='whitespace-nowrap px-8' />
                </div>
            </div>
        </div>
    );
};
