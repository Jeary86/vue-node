
const { Login , clearUser, getUser , setUser ,UserInfo} = require('../src/control/login');
const Product = require('../src/control/product');
const {register , delUser ,updateUser} = require('../src/control/register');

const routers = (router) => {
    /** 首页 **/
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

    router.post('/login', Login);

    router.post('/register', register);

    router.get('/userInfo', UserInfo);

    router.post('/delUser', delUser);

    router.post('/updateUser', updateUser);

    router.get('/clearUser', clearUser);
    router.get('/setUser', setUser);
    router.get('/getUser', getUser);

    router.get('/product', Product);

    return router;
}

module.exports = routers;