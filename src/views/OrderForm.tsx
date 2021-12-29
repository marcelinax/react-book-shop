import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BiBookHeart } from 'react-icons/bi';
import { BreakLine } from './../components/global/BreakLine';
import { ConfirmOrderModal } from './../components/ConfirmOrderModal';
import { ERRORS } from './../Constants';
import { Input } from '../components/orderForm/Input';
import { PrimaryButton } from '../components/global/PrimaryButton';
import { RootState } from '../store/store';
import { UnderlineLink } from './../components/global/UnderlineLink';
import axios from 'axios';
import { clearShoppingCart } from '../store/shoppingCartSlice';
import { getCalculatedItemsAmount } from '../utils/getCalculatedItemsAmount';
import { getCalculatedSumPrice } from '../utils/getCalculatedSumPrice';
import { locales } from './../Locales';

export const OrderForm: React.FC = () => {

    const [formData, setFormData] = useState<{first_name: string, last_name: string, city: string, zip_code: string }>({
        first_name: '',
        last_name: '',
        city: '',
        zip_code: ''
    });
    const [errors, setErrors] = useState<string[]>([]);
    const shoppingCartItems = useSelector((state: RootState) => { return state.shoppingCart.shoppingCartItems; });
    const dispatch = useDispatch();
    const [orderFinished, setOrderFinished] = useState(false);

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
        const zipCodeRegex = /^\d{2}-\d{3}$/;
        return !zipCodeRegex.test(value);
    };

    const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (checkFormInputs()) {
            await axios.post('http://localhost:3001/api/order', {
                ...formData,
                order: getParsedOrder()
            });
            setErrors([]);
            dispatch(clearShoppingCart());
            setOrderFinished(true);
        }
        else setOrderFinished(false);
        
    };

    const filterErrors = (value: string): string => {
        return errors.filter(err => {return err===value;})[0];
    };

    return (
        <div className='w-full md:container flex mx-auto h-screen'>
            {orderFinished && <ConfirmOrderModal/>}
            <form className='w-full m-auto' onSubmit={onSubmit}>
                <div className='w-full h-screen md:h-auto lg:w-1/2 shadow-[0_0_15px_rgba(0,0,0,0.15)] bg-white mx-auto p-6 lg:p-8 2xl:p-14 md:rounded-lg'>
                    <UnderlineLink to='/shopping-cart' title={locales.back_to_shopping_cart}/>
                    <div className='flex w-full justify-center mt-4 lg:mt-0 mb-10'>
                        <BiBookHeart size={50} />
                    </div>

                    <h3 className='text-xl lg:text-2xl font-semibold mb-3 text-center'>
                        {locales.your_ibooks_order}
                    </h3>
                    <p className='text-sm lg:text-base text-center'>
                        {locales.thanks_for_order_our_products}
                    </p>

                    <BreakLine className='mt-5' />

                    <h3 className='text-md lg:text-xl font-semibold mb-3 mt-10'>
                        {locales.summary_order}
                    </h3>

                    <p className='text-sm lg:text-base'>{locales.buy}<strong>{getCalculatedItemsAmount(shoppingCartItems)}</strong> {locales.articles}</p>
                    <p className='text-sm lg:text-base'>{locales.to_pay}<strong>{getCalculatedSumPrice(shoppingCartItems)}</strong> {locales.pln}</p>

                    <h3 className='text-md lg:text-lg font-semibold mb-3 mt-10'>
                        {locales.delivery_address}
                    </h3>
                    <Input title={locales.name} id='first_name' onChange={onChange} value={formData.first_name} error={filterErrors(ERRORS.NAME_MUST_BE_AT_LEAST_4_CHARACTERS_LONG)}/>
                    <Input title={locales.surname} id='last_name' onChange={onChange} value={formData.last_name} error={filterErrors(ERRORS.LAST_NAME_MUST_BE_AT_LEAST_5_CHARACTERS_LONG)}/>
                    <div className='w-full flex'>
                        <Input title={locales.city} className='mr-10' id='city' onChange={onChange} value={formData.city} error={filterErrors(ERRORS.CITY_CANNOT_BE_EMPTY)}/>
                        <Input title={locales.zip_code} id='zip_code' onChange={onChange} value={formData.zip_code} error={filterErrors(ERRORS.INVALID_ZIP_CODE_FORMAT)}/>
                    </div>
                    <div className='w-full flex mt-6 lg:mt-10'>
                        <PrimaryButton onClick={() => { }} type='submit' title={locales.order_and_pay} className='w-full' />
                    </div>
                </div>
            </form>
        </div>
    );
};
