import axios from "axios";
import { NotFoundError } from "../error";


const CATALOG_BASE_URL = process.env.CATALOG_BASE_URL || "http://localhost:3000";

export const GetProductDetails = async (productId: number) => {
    try {
        const response = await axios.get(`${CATALOG_BASE_URL}/product/${productId}`);
        return response.data;
    }catch (error) {
        throw new NotFoundError("product not found")
    }
}