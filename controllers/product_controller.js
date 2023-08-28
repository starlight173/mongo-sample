const ProductService = require('../services/product_service')

module.exports.createProduct = async (req, res) => {
    try {
        console.log(req.body);
        const result = await ProductService.createProduct(req.body);
        res.end(JSON.stringify({ "id": result._id }));
    } catch (err) {
        //console.log(err);
        res.status(err.status).json({
            status: err.status,
            error: HttpStatusEnum.get(err.status).name,
            message: err.message,
        });
    }
};

module.exports.getProducts = async (req, res) => {
    try {

    } catch (err) {
        //console.log(err);
        res.status(err.status).json({
            status: err.status,
            error: HttpStatusEnum.get(err.status).name,
            message: err.message,
        });
    }
};

module.exports.getProduct = async (req, res) => {
    try {
        const id = req.params.id;

    } catch (err) {
        //console.log(err);
        res.status(err.status).json({
            status: err.status,
            error: HttpStatusEnum.get(err.status).name,
            message: err.message,
        });
    }
};

module.exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
    } catch (err) {
        //console.log(err);
        res.status(err.status).json({
            status: err.status,
            error: HttpStatusEnum.get(err.status).name,
            message: err.message,
        });
    }
};

module.exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
    } catch (err) {
        //console.log(err);
        res.status(err.status).json({
            status: err.status,
            error: HttpStatusEnum.get(err.status).name,
            message: err.message,
        });
    }
};