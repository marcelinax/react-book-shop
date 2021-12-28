import { BiBookOpen, BiSad } from 'react-icons/bi';
import React, { useEffect, useState } from 'react';

import Book from '../models/Book';
import { BookCard } from '../components/BookCard';
import { BookFilter } from '../components/filter/BookFilter';
import { Navbar } from './../components/compositional/Navbar';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { addBookToShoppingCart } from '../store/shoppingCartSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

export const Homepage: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState(1);
    const [searchFormData, setSearchFormData] = useState({
        title: '',
        author: ''
    });
    const dispatch = useDispatch();

    useEffect(() => {
        getAllBooks();
        window.scrollTo(0,0);
    }, [page]);

    const handlePageChange = (e : React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const getAllBooks = async (): Promise<void> => {
        await axios.get('http://localhost:3001/api/book', {
            params: {
                'search[title]': searchFormData.title,
                'search[author]': searchFormData.author,
                page: page
            }
        }).then(res => {return setBooks(res.data.data);});
    };

    const searchBooks = (): void => {
        getAllBooks();
        setPage(1);
    };

    const addProductToShoppingCart = (book:Book): void => {
        dispatch(addBookToShoppingCart(book));
        toast.success('Książka została dodana do koszyka!');
        
    };

    const renderBooks = (): JSX.Element[] | JSX.Element => {
        if (books.length > 0) {
            return books.map(book => {return (
                <BookCard key={book.id} id={book.id} price={book.price} author={book.author} cover_url={book.cover_url} title={book.title} pages={book.pages} onAddToShoppingCart={()=> {return addProductToShoppingCart(book);}}/>
            );});
        } else return <></>;
       
    };

    return (
        <div className='min-w-screen min-h-screen flex flex-col bg-zinc-100'>
            <Navbar />
            <BookFilter searchFormData={searchFormData} setSearchFormData={ setSearchFormData } onSearchSubmit={searchBooks}/>
            <div className='container flex flex-col mt-20 mb-20 mx-auto'>
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
                    {books.length > 0 ? renderBooks() : (
                        <div className='w-full flex mx-auto justify-center items-center'>
                            <h1 className='font-medium text-2xl mr-4'>Nie znaleziono książek</h1>
                            <BiSad size={24}/>
                        </div>
                    )}
                </div>
                {books.length > 0 && (
                    <div className='w-full flex justify-center mt-5'>
                        <Stack spacing={2} >
                            <Pagination count={Math.floor(books.length * page / 10) + 1} shape="rounded" page={page} onChange={handlePageChange} />
                        </Stack>
                    </div>
                )}
            </div>
        </div>
      
    );
};
