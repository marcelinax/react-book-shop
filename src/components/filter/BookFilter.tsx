import { BiSearchAlt2 } from 'react-icons/bi';
import { BookFilterItem } from './BookFilterItem';
import { PrimaryButton } from '../global/PrimaryButton';
import React from 'react';
import { locales } from './../../Locales';

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
                            {locales.search_engine}
                        </h1>
                        <p className='text-sm mb-5'>
                            {locales.find_book_by_author_or_title}
                        </p>
                    </div>
                </div>
                <div className='w-full flex-col flex lg:flex-row'>
                    <div className='w-full mb-5 lg:mb-0'>
                        <BookFilterItem id='title' value={searchFormData.title} onChange={onChange} placeholder='Tytuł' />
                    </div>
                    <div className='w-full lg:px-8 mb-5 lg:mb-0'>
                        <BookFilterItem id='author' value={searchFormData.author} onChange={onChange} placeholder='Autor' />
                    </div>
                    <PrimaryButton title={locales.search} type='button' onClick={onSearchSubmit} className='whitespace-nowrap px-8' />
                </div>
            </div>
        </div>
    );
};
