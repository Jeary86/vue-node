const { userLogin , userInfo} = require('../server/login');
const isEmpty = require('../common/isEmpty');
const { resEmp, resFun, resErr, resSuc } = require('../common/response');
const myCrypto = require('../common/crypto');
const jwt =  require('jsonwebtoken');
const scret = require('../common/token-scret');

const clearUser = async function (req, res) {
    res.clearCookie('token');
    res.clearCookie('user_name');
    return resSuc(res, "删除cookie");
}

const setUser = async function (req, res) {
    let params = {
        user_name: 'admin',
    }
    const token = jwt.sign({params}, scret, { expiresIn: 86400 });
    res.cookie('token', token, { path: '/', secure: false, signed: false ,maxAge: 60000});
    res.cookie('user_name', params.user_name, { path: '/', secure: false, signed: false,maxAge: 60000});
    return resSuc(res, "设置成功");
}

const getUser = async function (req, res) {

    let userInfo = {
        token : req.cookies.token,
        name : req.cookies.user_name,
    }

    if (!userInfo.token) return resFun(res,'20000');

    return resSuc(res, userInfo);
}

const UserInfo = async function (req, res) {
    const r = await userInfo(req.query);
    if (r === 1) return resErr(res);
    return resSuc(res,r);
}

const Login = async function (req, res) {

    let params = {
        user_name: '',
        user_password: ''
    }

    Object.assign(params, req.body);

    // console.log(params)

    const isempty = isEmpty(params);

    if (isempty) {
        return resEmp(res);
    }

    params.user_password = myCrypto(params.user_password);

    const r = await userLogin(params);

    if (r === 1) return resErr(res);
    if (!r[0]) return resFun(res, 10003, '用户名或密码错误');

    const token = jwt.sign({...params}, scret, { expiresIn: 86400 });
    res.cookie('token', token, { path: '/', secure: false, signed: false });
    res.cookie('user_name', params.user_name, { path: '/', secure: false, signed: false });
    return resSuc(res, 'ok');

}

module.exports = {
    clearUser,
    setUser,
    getUser,
    UserInfo,
    Login
};