const { Login ,UserList} = require('../server/login');
const isEmpty = require('../common/isEmpty');
const { resEmp, resFun, resErr, resSuc } = require('../common/response');
const myCrypto = require('../common/crypto');
const jwt =  require('jsonwebtoken');
const scret = require('../common/token-scret');

const clearUser = async function (req, res) {
    req.session.destroy();
    return resSuc(res, "删除session");

}

const setUser = async function (req, res) {
    let params = {
        user_name: 'admin',
        token : ''
    }
    params.token = jwt.sign({params}, scret, { expiresIn: 86400 });

    req.session.userInfo = params;

    return resSuc(res, params);
}

const getUser = async function (req, res) {

    let userInfo = req.session.userInfo;

    if (!userInfo) return resFun(res,1);

    return resSuc(res, userInfo);

}



const login = async function (req, res) {

    let params = {
        user_name: '',
        user_password: ''
    }

    Object.assign(params, req.body);

    const isempty = isEmpty(params);

    if (isempty) {
        return resEmp(res);
    }

    params.user_password = myCrypto(params.user_password);

    const r = await Login(params);

    if (r === 1) return resErr(res);
    if (!r[0]) return resFun(res, 10003, '用户名或密码错误');

    req.session.userInfo = r;
    // req.session.isLogin = true;

    return resSuc(res, 'ok');

}

const userInfo = async function (req, res) {
    let userInfo = req.session.userInfo;
    if (!userInfo) return resFun(res,1);
    resSuc(res, userInfo);
}

const userList = async function (req, res) {
    const r = await UserList(req.query);
    if (r === 1) return resErr(res);
    return resSuc(res,r);
}

module.exports = {
    clearUser,
    setUser,
    getUser,
    login,
    userList,
    userInfo
};