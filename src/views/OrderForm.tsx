import React, { useState } from 'react';

import { BiBookHeart } from 'react-icons/bi';
import { BreakLine } from './../components/global/BreakLine';
import { ERRORS } from './../Constants';
import { Input } from '../components/order form/Input';
import { PrimaryButton } from '../components/global/PrimaryButton';
import { RootState } from '../store/store';
import { UnderlineLink } from './../components/global/UnderlineLink';
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
    const [errors, setErrors] = useState<string[]>([]);
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

    const checkFormInputs = (): boolean => {
        let isValid = true;
        let errs = [];
        if (checkNameInput(formData.first_name)) {
            errs.push(ERRORS.NAME_MUST_BE_AT_LEAST_4_CHARACTERS_LONG);
            isValid = false;
        }
        if (checkLastNameInput(formData.last_name)) {
            errs.push(ERRORS.LAST_NAME_MUST_BE_AT_LEAST_5_CHARACTERS_LONG);
            isValid = false;
        }
        if (checkCityInput(formData.city)) {
            errs.push(ERRORS.CITY_CANNOT_BE_EMPTY);
            isValid = false;
        }
        if (checkZipCodeInput(formData.zip_code)) {
            errs.push(ERRORS.INVALID_ZIP_CODE_FORMAT);
            isValid = false;
        }
        setErrors([...errs]);
        return isValid;
    };

    const checkNameInput = (value: string): boolean => {
        return value.length < 4;
    };
    const checkLastNameInput = (value: string): boolean => {
        return value.length < 5;
    };
    const checkCityInput = (value: string): boolean => {
        return value.length === 0;
    };
    const checkZipCodeInput = (value: string): boolean => {
        const zipCodeRegex = /\d{2}-\d{3}/;
        return !zipCodeRegex.test(value);
    };

    const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (checkFormInputs()) {
            axios.post('http://localhost:3001/api/order', {
                ...formData,
                order: getParsedOrder()
            });
            setErrors([]);
        }
    };

    const filterErrors = (value: string): string => {
        console.log(value);
        console.log(errors);
        console.log(errors.filter(err => {return err.includes(value);})[0]);
        return errors.filter(err => {return err===value;})[0];
    };

    return (
        <div className='container flex mx-auto h-screen'>
            <form className='w-full m-auto' onSubmit={onSubmit}>
                <div className='w-1/2 shadow-[0_0_15px_rgba(0,0,0,0.15)] bg-white mx-auto p-14 rounded-lg'>
                    <UnderlineLink to='/shopping-cart' title='Wróć do koszyka'/>
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

                    <p>Kupujesz <strong>{getCalculatedItemsAmount(shoppingCartItems)}</strong> art.</p>
                    <p>Do zapłaty <strong>{getCalculatedSumPrice(shoppingCartItems)}</strong> PLN</p>

                    <h3 className='text-xl font-semibold mb-3 mt-10'>
                        Adres dostawy
                    </h3>

                    <Input title='Imię' id='first_name' onChange={onChange} value={formData.first_name} error={filterErrors(ERRORS.NAME_MUST_BE_AT_LEAST_4_CHARACTERS_LONG)}/>
                    <Input title='Nazwisko' id='last_name' onChange={onChange} value={formData.last_name} error={filterErrors(ERRORS.LAST_NAME_MUST_BE_AT_LEAST_5_CHARACTERS_LONG)}/>
                    <div className='w-full flex'>
                        <Input title='Miejscowość' className='mr-10' id='city' onChange={onChange} value={formData.city} error={filterErrors(ERRORS.CITY_CANNOT_BE_EMPTY)}/>
                        <Input title='Kod pocztowy' id='zip_code' onChange={onChange} value={formData.zip_code} error={filterErrors(ERRORS.INVALID_ZIP_CODE_FORMAT)}/>
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
