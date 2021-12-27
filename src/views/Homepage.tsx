import React, { useEffect, useState } from 'react';

import Book from '../models/Book';
import { BookCard } from '../components/BookCard';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { addBookToShoppingCart } from '../store/shoppingCartSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

export const Homepage: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([]);
    const dispatch = useDispatch();

    const getAllBooks = (): void => {
        axios.get('http://localhost:3001/api/book').then(res => {return setBooks(res.data.data);});
    };

    const addProductToShoppingCart = (book:Book): void => {
        dispatch(addBookToShoppingCart(book));
        toast.success('Książka została dodana do koszyka!');
        
    };

    const renderBooks = (): JSX.Element[] | JSX.Element => {
        if (books.length > 0) {
            return books.map(book => {return (
                <BookCard key={book.id} id={book.id} author={book.author} cover_url={book.cover_url} title={book.title} pages={book.pages} onAddToShoppingCart={()=> {return addProductToShoppingCart(book);}}/>
            );});
        } else return <></>;
       
    };


    useEffect(() => {
        getAllBooks();
    }, []);
    
    return (
        <div className='min-w-screen min-h-screen flex flex-col bg-zinc-100'>
            <DefaultLayout />
            <div className='container mt-20 mx-auto'>
                <div className='w-full flex flex-wrap'>
                    {renderBooks()}
                </div>
            </div>
        </div>
      
    );
};
