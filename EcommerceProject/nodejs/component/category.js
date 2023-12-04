const product = require('../models/productmodel')

module.exports = {
    getProductCategory: async (req, res) => {
        try {
            const categories = await product.distinct('category').exec();
            if (categories.length > 0) {
                res.status(200).json(categories);
            }
            else {
                res.status(200).json("no result found")
            }
        } catch {
            res.status(500).json('internal server error');
        }
    },
    getProduct: async (req, res) => {
        const { productCategory } = req.params
        try {
            const getproducts = await product.find({ category: productCategory });
            if (getproducts.length > 0) {
                res.status(200).json(getproducts);
            } else {
                res.status(200).json("No products found in this category");
            }
        } catch {
            res.status(500).json('internal server error');
        }
    },
    getCategory_ID: async (req, res) => {
        const { id } = req.params
        try {
            const getCategoryID = await product.find({ _id: id });
            if (getCategoryID) {
                res.status(200).json(getCategoryID);
            } else {
                res.status(404).json("No products found in this category");
            }
        } catch {
            res.status(500).json('internal server error');
        }
    },
}



