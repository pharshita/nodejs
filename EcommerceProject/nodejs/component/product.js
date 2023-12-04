const product = require('../models/productmodel')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadWithStorage  = multer({ storage: storage }).single('file');


module.exports = {
  getProductList: async (req, res) => {
    try {
      const data = await product.find().sort({ name: 1 })
      if (data.length > 0) {
        res.status(200).json(data);
      }
      else {
        res.status(200).json("no result found")
      }
    } catch {
      res.status(500).json('internal server error');
    }
  },
  postProduct: (req, res) => {
    console.log(req.body)
    uploadWithStorage (req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error(err);
        res.status(500).json('File upload error');
      } else if (err) {
        console.error(err);
        res.status(500).json('Unknown error');
      } else {
        try {
          const { name, category, userId, price, company } = req.body;
          const fileDetails = req.file;
  
          const newProduct = new product({
            fileDetails,
            name,
            category,
            userId,
            price,
            company,
          });
  
          const savedProduct = await newProduct.save();
          res.status(201).json(savedProduct);
        } catch (error) {
          console.error(error);
          res.status(500).json('Internal server error');
        }
      }
    });
  },

  deleteProduct: async (req, res) => {
    const { id } = req.params;
    product.findByIdAndDelete(id).then((deleteProduct) => {
      if (!deleteProduct) {
        res.status(404).json("data not found")
      }
      res.status(200).json("data deleted succesfully")
    })
      .catch(() => {
        res.status(500).json("internal server error")
      })
  },
  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { name, category, price, company } = req.body;
    product.findByIdAndUpdate(id, { name, category, price, company }, { new: true })
      .then((updateProduct) => {
        if (!updateProduct) {
          res.status(404).json("data not found")
        }
        res.status(200).json("data update succesfully")
      })
      .catch(() => {
        res.status(500).json("internal server error")
      })
  }
}