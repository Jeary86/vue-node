const query = require('../../db/connect');

const product = async function () {
    try {
        const r = await query(
            'SELECT product_id,product_name,product_price FROM product'
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

module.exports = product;