import React, { useEffect, useState } from 'react';

import { BiBookOpen } from 'react-icons/bi';
import Book from '../models/Book';
import { BookCard } from '../components/BookCard';
import { BookFilter } from '../components/filter/BookFilter';
import { Navbar } from './../components/compositional/Navbar';
import { addBookToShoppingCart } from '../store/shoppingCartSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

export const Homepage: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([]);
    const [searchFormData, setSearchFormData] = useState({
        title: '',
        author: ''
    });
    const dispatch = useDispatch();


    const getAllBooks = (): void => {
        axios.get('http://localhost:3001/api/book', {
            params: {
                'search[title]': searchFormData.title,
                'search[author]': searchFormData.author
            }
        }).then(res => {return setBooks(res.data.data);});
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
            <Navbar />
            <BookFilter searchFormData={searchFormData} setSearchFormData={ setSearchFormData } onSearchSubmit={getAllBooks}/>
            <div className='container flex flex-col mt-20 mx-auto'>

                <div className='px-14 mb-10'>
                    <div className='flex w-full'>
                        <BiBookOpen size={40} className='opacity-30 mr-5 mt-2'/>
                        <div>
                            <h1 className='text-lg font-semibold mb-1'>
                                Lista książek
                            </h1>
                            <p className='text-sm mb-5'>
                                Twoje wyniki wyszukiwania
                            </p>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-wrap'>
                    {renderBooks()}
                </div>
            </div>
        </div>
      
    );
};
