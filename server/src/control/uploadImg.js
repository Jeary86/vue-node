const multer = require("multer");
var path = require('path');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './server/public/uploads')
    },
    filename: function (req, file, cb) {
        var singfileArray = file.originalname.split('.');
        var fileExtension = singfileArray[singfileArray.length - 1];
        cb(null, file.fieldname + '-' + Date.now() + "." + fileExtension);
        console.log(file);
    }
})

let uploader = multer({ storage: storage }).single("file");


const uploadImg = async function (req, res) {

    uploader(req, res,()=> {

        if (req.file){
            const basename = path.basename(req.file.path)
            const originUrl = req.headers.host

            const file_url = `${originUrl}/uploads/${basename}`

            res.send({file:file_url})
        }else {
            resEmp(res);
        }

    });

}

module.exports = uploadImg