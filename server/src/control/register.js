const {Register , DelUser ,UpdateUser} = require('../server/register');
const { resErr, resSuc } = require('../common/response');
const myCrypto = require('../common/crypto');
const moment = require('moment');
const register = async function (req, res) {
    let params = {
        user_name: '',
        user_password: '',
        user_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }

    Object.assign(params, req.body);

    params.user_password = myCrypto(params.user_password);

    let result = await Register(params);
    if (result === 1) return resErr(res);
    return resSuc(res, '注册成功');
}

const delUser = async function (req, res) {
    let params = req.body.user_id | '';

    let result = await DelUser(params);
    if (result === 1) return resErr(res);
    return resSuc(res, '删除成功');
}

const updateUser = async function (req, res) {
    let params = {
        user_id : req.body.user_id | '',
        user_name : '',
        user_password : ''
    };

    Object.assign(params, req.body);

    params.user_password = myCrypto(params.user_password);

    let result = await UpdateUser(params);
    if (result === 1) return resErr(res);
    return resSuc(res, '修改成功');
}

module.exports = {
    register,
    delUser,
    updateUser
};