import ShoppingCartBook from '../models/ShoppingCartBook';

export const getCalculatedSumPrice = (shoppingCartItems: ShoppingCartBook[]): number => {
    let sum = 0;
    shoppingCartItems.forEach(item => {
        sum += item.amount * item.book.price;
    });
    return sum;
};