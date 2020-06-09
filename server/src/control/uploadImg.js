const multer = require("multer");
const { resFun } = require('../common/response');

const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./upload");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

const upload = multer({ storage: Storage }).array("uploadImg", 3); //Field name and max count


const uploadImg = async function (req, res) {

    upload(req, res, function (err) {

        console.log(err)


        if (err) {
            resFun(res,err)
        }
        return res.end("File uploaded sucessfully!.");
    });
}

module.exports = uploadImg