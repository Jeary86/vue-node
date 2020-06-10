const { Login , clearUser, getUser , setUser ,UserInfo} = require('../src/control/login');
const Product = require('../src/control/product');
const {register , delUser ,updateUser} = require('../src/control/register');
const {uploadWorks , worksList} = require('../src/control/works');
const uploadImg = require('../src/control/uploadImg')

const routers = (router) => {

    /** 首页 **/
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });
    /** 登录 **/
    router.post('/login', Login);

    /** 用户列表 **/
    router.get('/userInfo', UserInfo);

    /** 添加用户 **/
    router.post('/register', register);

    /** 删除用户 **/
    router.post('/delUser', delUser);

    /** 修改用户名密码 **/
    router.post('/updateUser', updateUser);

    router.get('/clearUser', clearUser); /** 清除session **/
    router.get('/setUser', setUser);     /** 添加session **/
    router.get('/getUser', getUser);     /** 判断session **/

    /** 作品列表 **/
    router.get('/worksList', worksList);

    /** 上传图片 **/
    router.post('/uploadImg', uploadImg);

    /** 上传作品 **/
    router.post('/uploadWorks', uploadWorks);

    /** 接口测试 **/
    router.get('/product', Product);

    return router;
}

module.exports = routers;