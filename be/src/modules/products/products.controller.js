import { fetchHomeProductsService, fetchProductService, fetchSingleProductService } from "./products.service.js";

export const fetchProductController = async(req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const { rows, pagination } = await fetchProductService(page, limit);
        return res.status(200).json({
            message: "products fetched successfully",
            products: rows,
            pagination
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error"
        })
    }
}

export const fetchSingleProductController = async(req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchSingleProductService(id);
        return res.status(200).json({
            data
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error"
        })
    }
}

export const fetchHomeProductsController = async(req, res) => {
    try {
        const data = await fetchHomeProductsService();
        return res.status(200).send(data)
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error"
        })
    }
}