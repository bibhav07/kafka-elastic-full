import { CartRepositoryType } from "../types/repository-types";

//CartRepositoryType - we expect the CartRepository to have the following methods: create, find, update, delete, 
// benfit will be we can pass mock repo to test the service layer without hitting the db
export const CreateCart = async (input: any, repo: CartRepositoryType) => {
  const data = await repo.create(input);
  return "Cart created for user: " ;
};


export const GetCart = async (input: any, repo: CartRepositoryType) => {
  const data = await repo.find(input);
  return "Cart retrieved for user: ";
};

export const EditCart = async (input: any, repo: CartRepositoryType) => {
  const data = await repo.update(input);
  return "Cart edited for user: ";
};

export const DeleteCart = async (input: any, repo: CartRepositoryType) => {
  const data = await repo.delete(input);
  return "Cart deleted for user: ";
};

