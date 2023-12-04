const product = require('../models/productmodel')
const cart = require('../models/cartmodel')

module.exports = {
    getCart: async (req, res) => {
        try {
            const data = await cart.find()
            if (data.length > 0) {
                res.status(200).json(data);
            }
            else {
                res.status(200).json([])
            }
        } catch {
            res.status(500).json('internal server error');
        }
    },
    PostCart: async (req, res) => {
        const { id } = req.params;
        try {
            const getCategoryID = await product.findById(id);
            if (!getCategoryID) {
                return res.status(404).json("Product not found");
            }

            const cartData = await cart.findById(id);
            const { fileDetails, name, category, userId, price, company } = getCategoryID;
            if (cartData) {
                let a = cartData.Number + 1;
                cart.findByIdAndUpdate(id, { fileDetails, name, category, userId, price: price * a, company, Number: a }, { new: true })
                    .then((updatedCart) => {
                        if (!updatedCart) {
                            return res.status(404).json("Data not found");
                        }
                        res.status(200).json(updatedCart);
                    })
                    .catch(() => {
                        res.status(500).json("Internal server error");
                    });
            } else {
                const newCart = new cart({ _id: id, fileDetails, name, category, userId, price, company, Number: 1 });
                await newCart.save();
                res.status(201).json(newCart);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json('Internal server error');
        }
    },

    deleteCart: async (req, res) => {
        const { id } = req.params;
        cart.findByIdAndDelete(id).then((deleteProduct) => {
            if (!deleteProduct) {
                res.status(404).json("data not found")
            }
            res.status(200).json("data deleted succesfully")
        })
            .catch(() => {
                res.status(500).json("internal server error")
            })
    },
    updateCart: async (req, res) => {
        console.log(req.body)
        const { id } = req.params;
        const { name, category, userId, price, company, Number } = req.body;
        const getCategoryID = await product.findById(id);
        cart.findByIdAndUpdate(id, { name, category, userId, price: getCategoryID.price * Number, company, Number }, { new: true })
            .then((updateProduct) => {
                if (!updateProduct) {
                    res.status(404).json("data not found")
                }
                res.status(200).json(updateProduct)
            })
            .catch(() => {
                res.status(500).json("internal server error")
            })
    },
}



