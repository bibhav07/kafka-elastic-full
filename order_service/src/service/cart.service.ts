import { Cart, CartLineItem } from "../db/schema";
import { CartRepositoryType } from "../types/repository-types";
import { GetProductDetails } from "../utils/broker/api";

//CartRepositoryType - we expect the CartRepository to have the following methods: create, find, update, delete, 
// benfit will be we can pass mock repo to test the service layer without hitting the db
export const CreateCart = async (input: any, repo: CartRepositoryType) => {
  
    //before adding to cart check if product exists
    const product = await GetProductDetails(input.productId);
    if (!product || product.stock < input.qty) {
        throw new Error("Product not available in stock");
    };

    //check if product already exists in cart
    const lineItem = await repo.findCartByProductId(input.customerId, input.productId);

    if(lineItem){
        //if product already exists in cart, update the qty
        const updatedLineItem = await repo.updateCart(lineItem.id, lineItem.qty + input.qty);
        return updatedLineItem;
    };


    //if product does not exist in cart, create a new line item
    return await repo.createCart(input.customerId, {
        productId : product.id,
        qty: input.qty,
        price: product.price.toString(),
        itemName: product.name,
        variant: product.variant,
    } as CartLineItem);

};


export const GetCart = async (input: any, repo: CartRepositoryType) => {
  const data = await repo.findCart(input);
  return data
};

export const EditCart = async (input: any, repo: CartRepositoryType) => {
  const data = await repo.updateCart(input.id, input.qty);
  return data;
};

export const DeleteCart = async (input: any, repo: CartRepositoryType) => {
  const data = await repo.deleteCart(input);
  return data
};

