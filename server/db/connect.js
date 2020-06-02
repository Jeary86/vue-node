const mysql = require('mysql');
const cfg = require('./config');
/**
 * 创建连接池
 */
const options = {
    host: cfg.host,
    user: cfg.user,
    password: cfg.password,
    port: cfg.port,
    database: cfg.database // 开启自动生成数据库，请把这句注释
}

let pool = mysql.createPool(options);

if (pool) {
    console.log('数据库连接成功');
} else {
    console.log('数据库连接失败，请重试');
}

// 当前请求是否在等待
pool.on('enqueue', function () {
    console.log('正在等待可连接插槽');
});

// 连接时
pool.on('acquire', function (connection) {
    console.log('当前连接 %d', connection.threadId);
});

// 监听连接池连接的释放
pool.on('release', function (connection) {
    console.log('连接 %d 释放', connection.threadId);
});

/**
 * 封装数据库查询Promise
 */
const query = function (sql, params) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, conn) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                const c = conn.query(sql, params, (err, result) => {
                    conn.release();
                    if(err) reject(err);
                    else resolve(result);
                });
                console.log(`当前数据库操作 ${c.sql}`);
            }
        });
    });
}

module.exports = query;
