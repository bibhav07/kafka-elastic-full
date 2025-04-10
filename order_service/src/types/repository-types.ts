import { CartLineItem } from "../db/schema";
import { CartWithLineItems } from "../dto/cartRequest.dto";

export type CartRepositoryType = {
    createCart: (customerId: number, lineItem: CartLineItem) => Promise<number>;
    findCart: (id: number) => Promise<CartWithLineItems>;
    updateCart: (id: number, qty: number) => Promise<CartLineItem>;
    deleteCart: (id: number) => Promise<Boolean>;
    clearCartData: (id: number) => Promise<Boolean>;
    findCartByProductId: (customerId: number, productId: number) => Promise<CartLineItem>;
};
