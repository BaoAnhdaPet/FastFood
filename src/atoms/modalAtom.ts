import { atom } from 'jotai';

export const logInState = atom(false);

export const userMenuState = atom(false);

export const newAddressState = atom(false);

export const addProductState = atom(false);

export const editProductState = atom(false);

export const searchProductState = atom(false);

export const ProductState = atom(false);

export const shoppingCartState = atom(false);

export const ticketState = atom(false);

export const navbarState = atom(true);

export const productQuantityState = atom(1);

export const productEditState = atom({});

export const storedState = atom([]);

export const deleteProductState = atom(false);

export const cartItemState = atom([]);

export const deleteCartItemState = atom('error');
