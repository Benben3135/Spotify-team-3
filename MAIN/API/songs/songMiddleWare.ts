//for validation like acceptable file types, max file size etc
import path from 'path'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        //locatiion where the file will be saved
        cb(null, 'uploads/') 
    },
    filename: function(req,file,cb) {
        //rename a file with current timestamp and the extension
        let ext = path.extname(file.originalname)
        cb(null, Date.now()+ ext)
    }
})

export const upload = multer ({
    storage: storage,
    fileFilter: function(req,file,callback) {
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpeg"
        ){
            callback(null,true)
        }else {
            console.log('only jpg & png file supported!')
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

