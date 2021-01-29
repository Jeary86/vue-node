const { login , clearUser, getUser , setUser ,userList ,userInfo} = require('../src/control/login');
const {register , delUser ,updateUser} = require('../src/control/register');
const {uploadWorks , worksList , worksDetails , worksDetailsSave ,delWorks} = require('../src/control/works');
const {wxLogin} = require('../src/control/wx-api');

const uploadImg = require('../src/control/uploadImg')

const routers = (router) => {

    /** 首页 **/
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });
    /** 登录 **/
    router.post('/login', login);

    /** 登录验证 **/
    router.get('/userInfo', userInfo);

    /** 用户列表 **/
    router.get('/userList', userList);

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

    /** 作品详情页 **/
    router.get('/worksDetails', worksDetails);

    /** 修改详情页 **/
    router.post('/worksDetailsSave', worksDetailsSave);

    /** 上传图片 **/
    router.post('/uploadImg', uploadImg);

    /** 上传作品 **/
    router.post('/uploadWorks', uploadWorks);

    /** 删除作品 **/
    router.post('/delWorks', delWorks);

    /** 微信授权登录 **/
    router.get('/wxLogin', wxLogin)

    return router;
}

module.exports = routers;