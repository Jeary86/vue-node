const { resSuc,resErr,resFun ,resEmp} = require('../common/response');
const { UploadWorks , WorksList , WorksDetails, WorksDetailsSave , DelWorks} = require('../server/works');
const isEmpty = require('../common/isEmpty');

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
        page : req.query.page | 1,
        limit : req.query.limit | 20
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

const worksDetailsSave = async function (req, res) {
    let params = {
        id : req.body.id | '',
        w_title : '',
        w_content : '',
        w_img_url : '',
        displayTime : ''
    };

    Object.assign(params, req.body);

    const isempty = isEmpty(params);

    if (isempty) {
        return resEmp(res);
    }

    let result = await WorksDetailsSave(params);
    if (result === 1) return resErr(res);
    return resSuc(res, '修改成功');
}

const worksDetails = async function (req, res) {
    let params = req.query.id | '';
    let result = await WorksDetails(params);
    if (result === 1) return resErr(res);
    return resSuc(res, result);
}

const delWorks = async function (req, res) {
    let params = req.body.id | '';
    let result = await DelWorks(params);
    if (result === 1) return resErr(res);
    return resSuc(res, '删除成功');
}

module.exports = {
    uploadWorks,
    worksList,
    delWorks,
    worksDetails,
    worksDetailsSave
}