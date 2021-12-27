import ShoppingCartBook from '../models/ShoppingCartBook';

export const getCalculatedItemsAmount = (shoppingCartItems: ShoppingCartBook[]): number => {
    let amount = 0;
    shoppingCartItems.forEach(item => {
        amount += item.amount;
    });
    return amount;
};