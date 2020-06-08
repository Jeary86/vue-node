const {Register , DelUser ,UpdateUser} = require('../server/register');
const isEmpty = require('../common/isEmpty');
const { resErr, resSuc ,resEmp} = require('../common/response');
const myCrypto = require('../common/crypto');
const moment = require('moment');
const register = async function (req, res) {
    let params = {
        user_name: '',
        user_password: '',
        user_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }

    Object.assign(params, req.body);

    const isempty = isEmpty(params);

    if (isempty) {
        return resEmp(res);
    }

    // if (params.user_password === '') return resSuc(res,'密码不能为空');

    params.user_password = myCrypto(params.user_password);

    let result = await Register(params);
    if (result === 1) return resErr(res);
    return resSuc(res, '添加用户成功');
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

    const isempty = isEmpty(params);

    if (isempty) {
        return resEmp(res);
    }

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