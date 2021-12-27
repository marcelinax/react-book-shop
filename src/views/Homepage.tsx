import React, { useEffect, useState } from 'react';

import Book from './../types/Book';
import { BookCard } from '../components/BookCard';
import { DefaultLayout } from '../layouts/DefaultLayout';
import axios from 'axios';

export const Homepage: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([]);
    const getAllBooks = (): void => {
        axios.get('http://localhost:3001/api/book?').then(res => {return setBooks(res.data.data);});
    };

    const renderBooks = (): JSX.Element[] | JSX.Element => {
        if (books.length > 0) {
            return books.map(book => {return (
                <BookCard key={book.id} author={book.author} cover_url={book.cover_url} title={book.title} pages={book.pages}/>
            );});
        } else return <></>;
       
    };


    useEffect(() => {
        getAllBooks();
    }, []);
    
    return (
        <div className='w-full h-screen flex flex-col'>
            <DefaultLayout />
            <div className='container mt-20 mx-auto'>
                <div className='w-full flex flex-wrap'>
                    {renderBooks()}
                </div>
            </div>
        </div>
      
    );
};
