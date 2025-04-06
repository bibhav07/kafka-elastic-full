type Create = (input: any) => Promise<{}>;
type Find = (input: any) => Promise<{}>;
type Update = (input: any) => Promise<{}>;
type Delete = (input: any) => Promise<{}>;

// The CartRepositoryType is used to define the structure of the CartRepository object
export type CartRepositoryType = {
  create: Create;
  find: Find;
  update: Update;
  delete: Delete;
};
