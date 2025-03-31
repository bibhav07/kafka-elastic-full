import {faker} from "@faker-js/faker";
import {Factory} from "rosie";
import { Product } from "../../models/product.modules";

// Factory for generating random product data
export const ProductFactory = new Factory<Product>()
  .attr("id", () => faker.number.int({min: 1, max: 1000}))
  .attr("name", () => faker.commerce.productName())
  .attr("description", () => faker.commerce.productDescription())
  .attr("price", () => +faker.commerce.price())
  .attr("stock", () => faker.number.int({min: 0, max: 100}))
