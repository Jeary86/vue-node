const query = require('../../db/connect');

const Login = async function (params) {
    try {
        const r = await query(
            'SELECT * FROM user where user_name = ? and user_password = ?', [params.user_name, params.user_password]
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

const UserList = async function (params) {
    try {
        const r = await query(
            'SELECT * FROM user'
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

module.exports = {
    Login,
    UserList
};