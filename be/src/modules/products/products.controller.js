import { fetchProductService } from "./products.service.js";

export const fetchProductController = async(req, res) => {
    try {
        const data = await fetchProductService();
        return res.status(200).json({
            message: "products fetched successfully",
            data
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error"
        })
    }
}