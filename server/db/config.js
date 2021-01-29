/**
 * 数据库配置
 */

module.exports = {
    debug : { //开发环境
        host : 'localhost',
        user : 'root',
        password : 'mysql',
        port: '3306',
        database : 'test_demo'
    },
    release : { //生产环境
        host : '47.103.74.102',
        user : 'jeary_cn_db',
        password : 'EcST72j6Ahpde87J',
        port: '3306',
        database : 'jeary_cn_db'
    }
}



