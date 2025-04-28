import { SwagProducts } from "./enum/products";

export type UserDetails = {
    users?: string;
    password?: string;
};

export type CustomerDetails = {
    firstName?: string;
    lastName?: string;
    postalCode?: string;
};

export type CheckoutProducts = {
    userDetails?: UserDetails;
    customerDetails?: CustomerDetails;
    productsToBuy?: SwagProducts[];
}
