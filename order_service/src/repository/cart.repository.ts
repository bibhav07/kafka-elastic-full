import { eq } from "drizzle-orm";
import { DB } from "../db/dbConnection";
import { CartLineItem, cartLineItems, carts } from "../db/schema";
import { CartWithLineItems } from "../dto/cartRequest.dto";
import { CartRepositoryType } from "../types/repository-types";


const createCart = async (
    customerId: number,
    {itemName, price, productId, qty, variant} : CartLineItem
): Promise<number> => { 

    //crate a new cart for this customer, and it cart exist by this customer id, it will update the cart updatedAt by targeting customerID because that is unique 
    const result = await DB.insert(carts).values({ customerId }).returning().onConflictDoUpdate({
        target: carts.customerId,
        set: {updatedAt: new Date()}
    });

    const [{ id }] = result;

    if(id > 0) { 
        //now inserting in cartlineitems table, if cart already exists for this customer, it will insert a new line item in cartlineitems table
        await DB.insert(cartLineItems).values({ 
            cartId: id, 
            productId, 
            itemName, 
            price, 
            qty, 
            variant
        });
    }

    return id
};


//fetcing cart by customer id, and it will return the cart with line items
const findCart = async (id: number): Promise<CartWithLineItems> => {
    const cart = await DB.query.carts.findFirst({
      where: (carts, { eq }) => eq(carts.customerId, id),
      with: {
        lineItems: true,
      },
    });
  
    if (!cart) {
      throw new Error("Cart not found");
    }
  
    return cart;
};




const updateCart = async ( id : number, qty: number): Promise<CartLineItem> => { 
    //this will update the qty of the cart line item, means a product in cart will be updated by quantity   | increase or decrease in qty in cartlineitems table 
    const [cartLineItem] = await DB.update(cartLineItems).set( { qty } ).where( eq(cartLineItems.id, id) ).returning();
    return cartLineItem;
};




const deleteCart = async (id: number): Promise<Boolean> => {

    await DB.delete(cartLineItems).where( eq(cartLineItems.id, id) );
    return true;
};



const clearCartData = async (id: number): Promise<Boolean> => {
    
    await DB.delete(cartLineItems).where( eq(cartLineItems.cartId, id) );
    await DB.delete(carts).where( eq(carts.id, id) );
    return true;
}



const findCartByProductId = async ( customerId: number, productId: number) : Promise<CartLineItem> => {
    
    //it will return cart with it's line items
    const cart = await DB.query.carts.findFirst({
        where: (carts, { eq }) => eq(carts.customerId, customerId),
        with: {
          lineItems: true,
        },
      });
      
      //checking if given item exists in cart or not, if it exists then return the line item, otherwise return null
      const lineItem = cart?.lineItems.find((item) => item.productId === productId);
      return lineItem as CartLineItem;

}


// The CartRepositoryType is used to define the structure of the CartRepository object
export const CartRepository: CartRepositoryType = {
    createCart,
    findCart,
    updateCart,
    deleteCart,
    clearCartData,
    findCartByProductId
  };