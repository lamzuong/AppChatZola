const AWS = require("aws-sdk")
const router = require('express').Router();
const dotenv = require('dotenv');
const multer = require('multer');
const { v4: uuid } = require('uuid');
const path = require('path');
const docClient = require('../db.config');

const tableName = 'message';
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
    const fileTypes = /jpeg|jpg|png|gif/;

    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mineType = fileTypes.test(file.mimetype);
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

router.post('/', upload.single('img'), (req, res) => {
    const {conversationID, sender, mess} = req.body
    const image = req.file.originalname.split('.')
    const fileType = image[image.length - 1]
    const filePath = `${uuid() + Date.now().toString()}.${fileType}`;
// luu vo S3
    const uploadS3 = {
        Bucket: 'zola-chat',
        Key: filePath,
        Body: req.file.buffer
    }
    s3.upload(uploadS3, (err, data) => {
        if (err) {
            console.log(err);
            return res.send("Loi")
        } else {
            // luu vo Dynamo
            const params = {
                TableName: tableName,
                Item: {
                    id: uuid(),
                    conversationID,
                    sender,
                    mess,
                    file_url: `${CLOUD_FRONT_URL}${filePath}`,
                    date: new Date().getTime(),
                },
            };
            docClient.put(params, (err, data) => {
                if (err) {
                    return res.status(500).json('Loi: ' + err);
                }
                console.log(data);
                return res.status(200).json(data);
            });
        }
    })
});

router.get('/:conversationID',async (req, res) => {
    try{
        //get list conversation
        const { conversationID } = req.params;
        var params = {
            ExpressionAttributeValues: {
                ':id': conversationID,
            },
            ExpressionAttributeNames: { '#conversationID': 'conversationID' },
            FilterExpression: 'contains(#conversationID , :id)',
            TableName: tableName,
        };
        let data = await docClient.scan(params).promise();
        const listMessage = data.Items;
        

        //get list sender
        var listSender = listMessage.map( el => el.sender );
        var listSenderKhongTrung = []
        for (var i = 0; i < listSender.length; i++) 
            if (!listSenderKhongTrung.includes(listSender[i])) 
                listSenderKhongTrung.push(listSender[i])
        
        //get infor user from list sender
        var listUserInfo=[];
        for (var j = 0; j < listSenderKhongTrung.length; j++) {
            const paramsuser = {
                TableName: "user",
                Key: {
                    id : listSenderKhongTrung[j]
                }
            };
            let data2 = await docClient.get(paramsuser).promise();
            listUserInfo.push(data2.Item);
        }

        //set infor user for mess
        let listMessageImg =[];
        listMessage.forEach(m =>{
            const usertemp = listUserInfo.find(u => u.id === m.sender)
            let messtemp = m;
            messtemp["infoSender"] = {imageSender: usertemp.img, fullName: usertemp.fullName};
            listMessageImg.push(messtemp);
        })
        return res.status(200).json(listMessageImg);
    }
    catch(e){
        return res.status(500).send('Loi' + err);
    }  
});

module.exports = router;
