const query = require('../../db/connect');

const UploadWorks = async function (params) {
    try {
        const r = await query(
            // 'INSERT INTO works(w_title ,w_content,w_img_url,displayTime) VALUES (?)',params

            'INSERT INTO works SET ?',params
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

const WorksList = async function ({page,limit}) {
    try {
        const r1 = await query(
            'SELECT * FROM works ORDER BY id DESC LIMIT '+ (page-1) * limit +' , '+ limit
        );
        const r2 = await query(
            'SELECT * FROM works ORDER BY id DESC'
        );
        return {r1, r2};
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

module.exports = {
    UploadWorks,
    WorksList
};