import { decreaseBookAmountInShoppingCart, deleteBookFromShoppingCart, increaseBookAmountInShoppingCart } from '../store/shoppingCartSlice';
import { useDispatch, useSelector } from 'react-redux';

import { BreakLine } from '../components/global/BreakLine';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '../components/global/PrimaryButton';
import React from 'react';
import { RootState } from '../store/store';
import { ShoppingCartItem } from '../components/shoppingCart/ShoppingCartItem';
import { UnderlineLink } from '../components/global/UnderlineLink';
import { getCalculatedItemsAmount } from '../utils/getCalculatedItemsAmount';
import { getCalculatedSumPrice } from '../utils/getCalculatedSumPrice';
import { locales } from './../Locales';

export const ShoppingCart = () => {

    const shoppingCartItems = useSelector((state: RootState) => { return state.shoppingCart.shoppingCartItems; });
    const dispatch = useDispatch();

    const renderShoppingCartItems = (): JSX.Element[] => {
        return shoppingCartItems.map(item => {return (
            <ShoppingCartItem
                id={item.book.id}
                key={item.book.id}
                author={item.book.author}
                cover_url={item.book.cover_url}
                title={item.book.title}
                price={item.book.price}
                currency={item.book.currency}
                onDeleteBookFromShoppingCart={() => { return dispatch(deleteBookFromShoppingCart(item.book)); }}
                amount={item.amount}
                onDecreaseAmount={() => { dispatch(decreaseBookAmountInShoppingCart(item.book));} }
                onIncreaseAmount={() => { dispatch(increaseBookAmountInShoppingCart(item.book));} }
            />
        );});
    };

    return (
        <div className='w-full h-screen md:p-14 xl:p-24'>
            <div className='mx-auto h-full flex-col bg-white md:bg-zinc-100 p-4 md:p-10 xl:shadow-xl md:rounded-3xl'>
                <div className='w-full flex flex-col md:flex-row md:justify-between md:items-center'>
                    <div className='flex md:items-center flex-col md:flex-row'>
                        <h1 className='font-semibold text-4xl md:mr-8'>{locales.shopping_cart}</h1>
                        <p className='font-medium text-sm mt-1'>{getCalculatedItemsAmount(shoppingCartItems)} {locales.articles}</p>
                    </div>
                    <div className='font-semibold mt-6 md:mt-0'>{locales.sum} {getCalculatedSumPrice(shoppingCartItems)} {locales.pln}</div>
                </div>
                <BreakLine className='mt-10' />
                <div className='w-full flex flex-col mt-5 h-[60vh] md:h-[50vh] overflow-auto scrollbar'>
                    <div className='w-full flex flex-col md:pr-8 lg:pr-20'>
                        {renderShoppingCartItems()}
                    </div>
                </div>
                <div className='w-full flex items-center justify-between mt-12'>
                    <UnderlineLink to='/' title={locales.continue_shopping}/>
                    <Link to='/order'>
                        <PrimaryButton onClick={()=>{}} title={locales.next} type='button' disabled={shoppingCartItems.length ===0} className='px-10'/>
                    </Link>
                   
                </div>
            </div>
        </div>
    );
};
