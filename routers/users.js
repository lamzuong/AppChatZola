const AWS = require("aws-sdk")
const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const { v4: uuid } = require('uuid');
const docClient = require("../db.config.js")

const tableName = 'user';
const CLOUD_FRONT_URL = 'https://d370tx6r1rzpl2.cloudfront.net/'

const s3 = new AWS.S3({
    accessKeyId: 'AKIA34KECLYEL2WGGHN2',
    secretAccessKey: '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',
})

const storage = multer.memoryStorage({
    destination(req, file, callback) {
        callback(null, '')
    }
});

const checkFileType = (file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|jfif/;

    const extname = fileTypes.test(path.extname(file?.originalname).toLowerCase());
    const mineType = fileTypes.test(file?.mimetype);
    if (extname && mineType) {
        return cb(null, true);
    }
    return cb("Error");
}
const upload = multer({
    storage,
    limits: { fileSize: 2000000 },
    fileFilter(req, file, cb) {
        checkFileType(file, cb)
    }
})
//Update user
router.put('/', upload.single('avatar'), (req, res) => {
    const {id, birthdate, gender, fullName, fullNameOld, birthdateOld, genderOld, imgOld} = req.body;
    const img = req.file
    // luu vo S3
    if(!img) {  
    }else {
        const image = req.file.originalname.split('.')
        const fileType = image[image.length - 1]
        var filePath = `${uuid() + Date.now().toString()}.${fileType}`;
        const uploadS3 = {
            Bucket: 'zola-chat',
            Key: filePath,
            Body: req.file.buffer
        }
        s3.upload(uploadS3, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        })
    }
    // update Dynamo
    const params = {
        TableName: 'user',
        Key: {
            id
        },               
        UpdateExpression: 'SET #fullName=:fullName, #birthdate =:birthdate, #gender=:gender, #img=:img, #loginFirst=:loginFirst',
        ExpressionAttributeNames: {//COLUMN NAME 
            '#fullName': 'fullName',
            '#birthdate': 'birthdate',
            '#gender': 'gender',
            '#img': 'img',
            '#loginFirst': 'loginFirst'
        },
        ExpressionAttributeValues: {
            ':fullName': fullName ? fullName : fullNameOld,
            ':birthdate': birthdate ? birthdate : birthdateOld,
            ':gender': gender !== null ? gender==='true' : genderOld==='true',
            ':img': img ? `${CLOUD_FRONT_URL}${filePath}` : imgOld,
            ':loginFirst': false
        }
    };
    console.log(params.ExpressionAttributeValues);
    docClient.update(params, (err, data) => {
        if(err) {
            return res.status(500).send("Loi "+err)
        }
        return res.status(200).json(data)
    })
})

//Update User mobile
router.put('/mobile', (req, res) => {
    const {id, birthdate, gender, fullName, fullNameOld, birthdateOld, genderOld, imgOld} = req.body;
    // luu vo S3
    if(!img) {  
    }else {
        var buffer = Buffer.from(req.body.base64)
        const fileType = req.body.fileType
        var filePath = `${uuid() + Date.now().toString()}.${fileType}`;
        const uploadS3 = {
            Bucket: 'zola-chat',
            Key: filePath,
            Body: buffer
        }
        s3.upload(uploadS3, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        })
    }
    // update Dynamo
    const params = {
        TableName: 'user',
        Key: {
            id
        },               
        UpdateExpression: 'SET #fullName=:fullName, #birthdate =:birthdate, #gender=:gender, #img=:img, #loginFirst=:loginFirst',
        ExpressionAttributeNames: {//COLUMN NAME 
            '#fullName': 'fullName',
            '#birthdate': 'birthdate',
            '#gender': 'gender',
            '#img': 'img',
            '#loginFirst': 'loginFirst'
        },
        ExpressionAttributeValues: {
            ':fullName': fullName ? fullName : fullNameOld,
            ':birthdate': birthdate ? birthdate : birthdateOld,
            ':gender': gender !== null ? gender==='true' : genderOld==='true',
            ':img': img ? `${CLOUD_FRONT_URL}${filePath}` : imgOld,
            ':loginFirst': false
        }
    };
    console.log(params.ExpressionAttributeValues);
    docClient.update(params, (err, data) => {
        if(err) {
            return res.status(500).send("Loi "+err)
        }
        return res.status(200).json(data)
    })
})

//Get user
router.get('/:id',(req, res) => {
    const {id} = req.params;
    const params = {
        TableName: tableName,
        Key: {
            id
        }
    };
    docClient.get(params, (err, data) => {
        if(err) {
            return res.status(500).send("Loi"+err)
        }
        else{
            return res.send(data.Item)
        }
    })
})

//Get all user
router.get('/',(req, res) => {
    const params = {
        TableName: tableName,
    };
    docClient.scan(params, (err, data) => {
        if(err) {
            return res.status(500).send("Loi"+err)
        }
        else{
            return res.send(data.Items)
        }
    })
})

router.get('/search/:name', (req, res) => {
    const {name} = req.params;
    var params = {
        ExpressionAttributeValues: {
         ":name": name
        }, 
        ExpressionAttributeNames: { "#fullName": "fullName" },
        FilterExpression: "contains(#fullName , :name)", 
        TableName: tableName
       };
    docClient.scan(params, (err, data) => {
        if(err) {
            return res.status(500).send("Loi"+err)
        }
        else{
            return res.status(200).json(data.Items)
        }
    })
})
module.exports = router;