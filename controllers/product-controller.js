const ProductService = require('../services/product-service')

module.exports.createProduct = async (req, res) => {
    try {
        console.log(req.body);
        const result = await ProductService.createProduct(req.body);
        res.json({
            "status": "success",
            "message": "Item created successfully",
            "data": {
                "id": result._id
            }
        })
    } catch (err) {
        const errStatus = err.status || 500;
        const errMessage = err.message || "Internal Server Error";
        res.status(errStatus).json({
            status: `error`,
            message: errMessage,
        });
    }
};

module.exports.getProducts = async (req, res) => {
    try {
        const result = await ProductService.getProducts();
        res.json({
            "status": "success",
            "data": result
        })
    } catch (err) {
        const errStatus = err.status || 500;
        const errMessage = err.message || "Internal Server Error";
        res.status(errStatus).json({
            status: `error`,
            message: errMessage,
        });
    }
};

module.exports.getProduct = async (req, res) => {
    try {
        const result = await ProductService.getProduct(req.params.id);

        if (!result) {
            // No results.
            const err = new Error('Product not found');
            err.status = 404;
            throw err;
        }

        res.json({
            "status": "success",
            "data": result
        })
    } catch (err) {
        const errStatus = err.status || 500;
        const errMessage = err.message || "Internal Server Error";
        res.status(errStatus).json({
            status: `error`,
            message: errMessage,
        });
    }
};

module.exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = await ProductService.updateProduct(id, updatedData);
        res.json({
            "status": "success",
            "message": "Item updated successfully",
            "data": result
        })
    } catch (err) {
        const errStatus = err.status || 500;
        const errMessage = err.message || "Internal Server Error";
        res.status(errStatus).json({
            status: `error`,
            message: errMessage,
        });
    }
};

module.exports.deleteProduct = async (req, res) => {
    try {
        const result = await ProductService.deleteProduct(req.params.id);

        if (!result) {
            const err = new Error('Item not found')
            err.status = 404;
            throw err;
        }

        res.json({
            "status": "success",
            "message": `Item ${result.id} has been deleted`,
        })
    } catch (err) {
        const errStatus = err.status || 500;
        const errMessage = err.message || "Internal Server Error";
        res.status(errStatus).json({
            status: `error`,
            message: errMessage,
        });
    }
};