const Product = require('../server/product');
const { resSuc , resErr} = require('../common/response');

const product = async function (req, res) {
    const r = await Product(req.query);
    if (r === 1) return resErr(res);
    return resSuc(res,r);
}

module.exports = product;