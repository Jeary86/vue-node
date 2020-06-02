const query = require('../../db/connect');

const Register = async function (params) {
    try {
        const r = await query(
            'INSERT INTO user set ?',params
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

const DelUser = async function (params) {
    try {
        const r = await query(
            'DELETE FROM user where user_id = ?',[params]
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

module.exports = {
    Register,
    DelUser
};