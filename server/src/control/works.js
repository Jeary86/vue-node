const { resSuc,resErr,resFun } = require('../common/response');
const { UploadWorks , WorksList} = require('../server/works');

const uploadWorks = async function (req, res) {
    const params = {
        w_title : '',
        w_content : '',
        w_img_url : '',
        displayTime: '',
    }

    Object.assign(params, req.body);

    let result = await UploadWorks(params);
    if (result === 1) return resErr(res);
    return resSuc(res, params);
}

const worksList = async function (req, res) {

    const params = {
        page : req.query.page,
        limit : req.query.limit,
    }

    if (!/^[0-9]*$/.test(params.limit) || !/^[0-9]*$/.test(params.page)) {
        return resFun(res, 10006);
    }

    const r = await WorksList(params);
    if (r === 1) return resErr(res);

    const data = {
        list: r.r1,
        pageIndex: params.page,
        pageSize: params.limit,
        total: r.r2.length
    }

    return resSuc(res,data);
}

module.exports = {
    uploadWorks,
    worksList
}