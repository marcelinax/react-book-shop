import { useDispatch, useSelector } from 'react-redux';

import { BreakLine } from '../components/global/BreakLine';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '../components/global/PrimaryButton';
import React from 'react';
import { RootState } from '../store/store';
import { ShoppingCartItem } from '../components/shopping cart/ShoppingCartItem';
import { deleteBookFromShoppingCart } from '../store/shoppingCartSlice';

export const ShoppingCart = () => {

    const shoppingCartItems = useSelector((state: RootState) => { return state.shoppingCart.shoppingCartItems; });
    const dispatch = useDispatch();

    const renderShoppingCartItems = (): JSX.Element[] | JSX.Element => {
        if (shoppingCartItems) {
            return shoppingCartItems.map(item => {return (
                <ShoppingCartItem key={item.id}
                    author={item.author}
                    cover_url={item.cover_url} title={item.title} price={item.price} currency={item.currency} onDeleteBookFromShoppingCart={()=> {return dispatch(deleteBookFromShoppingCart(item));}}/>
            );});
        }
        return <></>;
    };


    return (
        <div className='w-full h-full'>
            <div className='container py-20 mx-auto flex-col'>
                <div className='w-full flex justify-between items-center'>
                    <div className='flex items-center'>
                        <h1 className='font-bold text-2xl mr-8'>Koszyk</h1>
                        <p className='font-medium text-sm'>{shoppingCartItems.length} przedmiotów</p>
                    </div>
                    <div>Suma: 1000 PLN</div>
                </div>
                <BreakLine className='mt-10' />
                <div className='w-full flex flex-col h-[70vh] py-5 overflow-auto'>
                    {renderShoppingCartItems()}
                </div>
                <div className='w-full flex items-center justify-between mt-5'>
                    <Link to='/' className='font-bold text-sm relative after:content-[] after:w-full after:absolute after:left-0 after:bg-black after:h-[1px] after:-bottom-1'>Kontynuuj zakupy</Link>
                    <PrimaryButton onClick={()=>{}} title='Dalej' type='button' className='px-10'/>
                </div>
            </div>
        </div>
    );
};
