import axios from "axios";
import { ProductDto } from "../../dto/product.dto";


const CATALOG_BASE_URL = process.env.CATALOG_BASE_URL || "http://localhost:3000";

export const GetProductDetails = async (productId: number) => {
    try {
        const response = await axios.get<ProductDto>(`${CATALOG_BASE_URL}/product/${productId}`);
        console.log("Product details fetched successfully:", response.data);
        
        return response.data;
    }catch (error) {

        throw new Error("Failed to fetch product details");
    }
}