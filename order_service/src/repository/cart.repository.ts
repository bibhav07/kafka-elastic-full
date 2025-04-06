import { CartRepositoryType } from "../types/repository-types"

const createCart = async (): Promise<{}> => {
    // Logic to create a cart
    return Promise.resolve({"message": "Cart created successfully"});
}
const findCart = async (): Promise<{}> => {
    // Logic to create a cart
    return Promise.resolve({"message": "Cart found successfully"});
}
const updateCart = async (): Promise<{}> => {
    // Logic to create a cart
    return Promise.resolve({"message": "Cart updated successfully"});
}
const deleteCart = async (): Promise<{}> => {
    // Logic to create a cart
    return Promise.resolve({"message": "Cart deleted successfully"});
}

// The CartRepositoryType is used to define the structure of the CartRepository object
export const CartRepository: CartRepositoryType = {
    create: createCart,
    find: findCart,
    update:updateCart,
    delete: deleteCart
}