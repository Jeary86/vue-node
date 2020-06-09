const multer = require("multer");
var path = require('path')
var storage = multer.diskStorage({
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

var upload = multer({ storage: storage })
// var upload = multer({ dest: './uploads' })

const routers = (router) => {

    router.post('/upload',upload.single("file"),(req,res)=>{
        // var imageDir = 'http://127.0.0.1:3000/uploads';


        var filename = req.file.filename

        const basename = path.basename(req.file.path)
        const originUrl = req.headers.host

        const file_url = `${originUrl}/uploads/${basename}`

        // var imagePath = path.resolve(imageDir, filename);

        res.send({file:file_url})

    })

    return router;
}

module.exports = routers;