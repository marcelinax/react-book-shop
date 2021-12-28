import { decreaseBookAmountInShoppingCart, deleteBookFromShoppingCart, increaseBookAmountInShoppingCart } from '../store/shoppingCartSlice';
import { useDispatch, useSelector } from 'react-redux';

import { BreakLine } from '../components/global/BreakLine';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '../components/global/PrimaryButton';
import React from 'react';
import { RootState } from '../store/store';
import { ShoppingCartItem } from '../components/shopping cart/ShoppingCartItem';
import { UnderlineLink } from '../components/global/UnderlineLink';
import { getCalculatedItemsAmount } from '../utils/getCalculatedItemsAmount';
import { getCalculatedSumPrice } from '../utils/getCalculatedSumPrice';

export const ShoppingCart = () => {

    const shoppingCartItems = useSelector((state: RootState) => { return state.shoppingCart.shoppingCartItems; });
    const dispatch = useDispatch();

    const renderShoppingCartItems = (): JSX.Element[] | JSX.Element => {
        if (shoppingCartItems) {
            return shoppingCartItems.map(item => {return (
                <ShoppingCartItem key={item.book.id}
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
        }
        return <></>;
    };

    return (
        <div className='w-full h-screen p-24'>
            <div className='mx-auto h-full flex-col bg-zinc-100 p-10 shadow-xl rounded-3xl'>
                <div className='w-full flex justify-between items-center'>
                    <div className='flex items-center'>
                        <h1 className='font-semibold text-4xl mr-8'>Koszyk</h1>
                        <p className='font-medium text-sm mt-1'>{getCalculatedItemsAmount(shoppingCartItems)} art.</p>
                    </div>
                    <div className='font-semibold'>Suma: {getCalculatedSumPrice(shoppingCartItems)} PLN</div>
                </div>
                <BreakLine className='mt-10' />
                <div className='w-full flex flex-col mt-5 h-[50vh] overflow-auto scrollbar'>
                    <div className='w-full flex flex-col pr-20'>
                        {renderShoppingCartItems()}
                    </div>
                </div>
                <div className='w-full flex items-center justify-between mt-12'>
                    <UnderlineLink to='/' title='Kontynuuj zakupy'/>
                    <Link to='/order'>
                        <PrimaryButton onClick={()=>{}} title='Dalej' type='button' disabled={shoppingCartItems.length ===0} className='px-10'/>
                    </Link>
                   
                </div>
            </div>
        </div>
    );
};
