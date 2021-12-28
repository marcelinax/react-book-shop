import React, { useState } from 'react';

import { BiBookHeart } from 'react-icons/bi';
import { BreakLine } from './../components/global/BreakLine';
import { Input } from '../components/order form/Input';
import { PrimaryButton } from '../components/global/PrimaryButton';
import { RootState } from '../store/store';
import axios from 'axios';
import { getCalculatedItemsAmount } from '../utils/getCalculatedItemsAmount';
import { getCalculatedSumPrice } from '../utils/getCalculatedSumPrice';
import { useSelector } from 'react-redux';

export const OrderForm: React.FC = () => {

    const [formData, setFormData] = useState<{first_name: string, last_name: string, city: string, zip_code: string }>({
        first_name: '',
        last_name: '',
        city: '',
        zip_code: ''
    });
    const shoppingCartItems = useSelector((state: RootState) => { return state.shoppingCart.shoppingCartItems; });

    const getParsedOrder = (): {id: number, quantity: number}[] => {
        return shoppingCartItems.map(item => {return {
            id: item.book.id,
            quantity: item.amount
        };});
    };

    const onChange = (e : React.ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]:value
        });
    };

    const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/order', {
            ...formData,
            order: getParsedOrder()
        });
    };

    return (
        <div className='container flex mx-auto h-screen'>
            <form className='w-full m-auto' onSubmit={onSubmit}>
                <div className='w-1/2 shadow-[0_0_15px_rgba(0,0,0,0.15)] bg-white mx-auto p-14 rounded-lg'>

                    <div className='flex w-full justify-center mb-10'>
                        <BiBookHeart size={50} />
                    </div>

                    <h3 className='text-2xl font-semibold mb-3 text-center'>
                           Twoje Zamówienie IBooks
                    </h3>
                    <p className='text-center'>
                           Dziękujemy za zainteresowanie naszymi produktami
                    </p>

                    <BreakLine className='mt-5' />

                    <h3 className='text-xl font-semibold mb-3 mt-10'>
                            Podsumowanie Twojego zamówienia
                    </h3>

                    <p>Kupujesz {getCalculatedItemsAmount(shoppingCartItems)} art.</p>
                    <p>Do zapłaty {getCalculatedSumPrice(shoppingCartItems)} PLN</p>

                    <h3 className='text-xl font-semibold mb-3 mt-10'>
                        Adres dostawy
                    </h3>

                    <Input title='Imię' id='first_name' onChange={onChange} value={formData.first_name}/>
                    <Input title='Nazwisko' id='last_name' onChange={onChange} value={formData.last_name}/>
                    <div className='w-full flex'>
                        <Input title='Miejscowość' className='mr-10' id='city' onChange={onChange} value={formData.city}/>
                        <Input title='Kod pocztowy' id='zip_code' onChange={onChange} value={formData.zip_code}/>
                    </div>
                    <div className='w-full flex mt-10'>
                        <PrimaryButton onClick={() => { }} type='submit' title='Zamawiam i płacę' className='w-full' />

                    </div>
                    <p className='mt-2 text-sm'>
                            Klikając powyżyszy przycisk akceptujesz nasz regulamin
                    </p>
                </div>
            </form>
        </div>
    );
};
