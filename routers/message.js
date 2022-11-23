const AWS = require('aws-sdk');
const router = require('express').Router();
const multer = require('multer');
const { v4: uuid } = require('uuid');
const path = require('path');
const utf8 = require('utf8');
const docClient = require('../db.config');

const tableName = 'message';
const CLOUD_FRONT_URL = 'https://d370tx6r1rzpl2.cloudfront.net/';

const s3 = new AWS.S3({
    accessKeyId: 'AKIA34KECLYEL2WGGHN2',
    secretAccessKey: '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',
});

const storage = multer.memoryStorage({
    destination(req, file, callback) {
        callback(null, '');
    },
});
const upload = multer({
    storage,
    limits: { fileSize: 30000000 },
});

// Send mess listImg web
router.post('/', upload.array('imgs', 20), (req, res) => {
    const { conversationID, sender, mess, listImg } = req.body;
    const img = req.files;
    var date = new Date().getTime();
    // luu vo S3
    var img_url = [];
    if (typeof img == 'undefined') {
        img_url = [...listImg];
    } else {
        if (img.length <= 0) {
        } else {
            for (let i = 0; i < img.length; i++) {
                const image = img[i].originalname;
                const fileType = image[image.length - 1];
                var filePath = `${uuid()}-${image}`;
                const uploadS3 = {
                    Bucket: 'zola-chat',
                    Key: filePath,
                    Body: img[i].buffer,
                };
                s3.upload(uploadS3, (err, data) => {
                    if (err) {
                        console.log('Loi s3: ' + err);
                    } else {
                        console.log('S3 thanh cong');
                    }
                });
                img_url.push(`${CLOUD_FRONT_URL}${filePath}`);
            }
        }
    }
    // luu vo dynamo
    const params = {
        TableName: tableName,
        Item: {
            id: uuid(),
            conversationID,
            sender,
            mess,
            deleted: false,
            handleGroup: false,
            removePerson: [],
            img_url: typeof img !== 'undefined' || img.length > 0 ? img_url : '',
            date: date,
        },
    };
    docClient.put(params, (err, data) => {
        if (err) {
            console.log('Loi: ' + err);
        }
        console.log('thanh cong');
    });
    // Luu vo images conversation
    var paramsConversation = {};
    if (typeof img !== 'undefined' || img.length > 0) {
        paramsConversation = {
            TableName: 'conversation',
            Key: {
                id: conversationID,
            },
            UpdateExpression: 'SET #date=:date, #images=list_append(#images,:images)',
            ExpressionAttributeNames: {
                //COLUMN NAME
                '#images': 'images',
                '#date': 'date',
            },
            ExpressionAttributeValues: {
                ':images': img_url,
                ':date': date,
            },
        };
    } else {
        paramsConversation = {
            TableName: 'conversation',
            Key: {
                id: conversationID,
            },
            UpdateExpression: 'SET #date=:date',
            ExpressionAttributeNames: {
                //COLUMN NAME
                '#date': 'date',
            },
            ExpressionAttributeValues: {
                ':date': date,
            },
        };
    }
    docClient.update(paramsConversation, (err, data) => {
        if (err) {
            console.log('Loi: ' + err);
        }
        console.log('thanh cong convesation');
    });
    return res.status(200).json('Gui thanh cong');
});

// Send mess listImg mobile
router.post('/mobile', (req, res) => {
    const { conversationID, sender, mess, listImg } = req.body;
    var img_url = []; //create list
    var date = new Date().getTime();
    // luu vo S3
    if (listImg.length <= 0) {
    } else {
        for (let i = 0; i < listImg.length; i++) {
            if (typeof listImg[i].base64 == 'undefined') {
                // img_url.push(listImg[i]);
                img_url.push(`${CLOUD_FRONT_URL}${listImg[i]}`);
            } else {
                var buffer = Buffer.from(listImg[i].base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const fileType = listImg[i].fileType;
                var filePath = `${uuid() + '-' + listImg[i].name}`;
                console.log('anh');
                const uploadS3 = {
                    Bucket: 'zola-chat',
                    Key: filePath,
                    Body: buffer,
                };
                s3.upload(uploadS3, (err, data) => {
                    if (err) {
                        console.log('Loi s3: ' + err);
                    } else {
                        console.log('upload S3 thanh cong');
                    }
                });
                img_url.push(`${CLOUD_FRONT_URL}${filePath}`);
            }
        }
    }
    // update Dynamo
    const params = {
        TableName: tableName,
        Item: {
            id: uuid(),
            conversationID,
            sender,
            mess,
            deleted: false,
            removePerson: [],
            img_url: listImg.length > 0 ? img_url : '',
            date: new Date().getTime(),
            handleGroup: false,
        },
    };
    docClient.put(params, (err, data) => {
        if (err) {
            console.log('Loi: ' + err);
        }
        console.log('thanh cong');
    });
    // Luu vo images conversation
    var paramsConversation = {};
    if (listImg.length > 0) {
        paramsConversation = {
            TableName: 'conversation',
            Key: {
                id: conversationID,
            },
            UpdateExpression: 'SET #date=:date, #images=list_append(#images,:images)',
            ExpressionAttributeNames: {
                //COLUMN NAME
                '#images': 'images',
                '#date': 'date',
            },
            ExpressionAttributeValues: {
                ':images': img_url,
                ':date': date,
            },
        };
    } else {
        paramsConversation = {
            TableName: 'conversation',
            Key: {
                id: conversationID,
            },
            UpdateExpression: 'SET #date=:date',
            ExpressionAttributeNames: {
                //COLUMN NAME
                '#date': 'date',
            },
            ExpressionAttributeValues: {
                ':date': date,
            },
        };
    }
    docClient.update(paramsConversation, (err, data) => {
        if (err) {
            console.log('Loi: ' + err);
        }
        console.log('thanh cong convesation');
    });
    return res.status(200).json('Gui thanh cong');
});

// Get mess of conversation
router.get('/:conversationID', async (req, res) => {
    try {
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
        var listSender = listMessage.map((el) => el.sender);
        var listSenderKhongTrung = [];
        for (var i = 0; i < listSender.length; i++)
            if (!listSenderKhongTrung.includes(listSender[i])) listSenderKhongTrung.push(listSender[i]);
        //get infor user from list sender
        var listUserInfo = [];
        for (var j = 0; j < listSenderKhongTrung.length; j++) {
            const paramsuser = {
                TableName: 'user',
                Key: {
                    id: listSenderKhongTrung[j],
                },
            };
            let data2 = await docClient.get(paramsuser).promise();
            listUserInfo.push(data2.Item);
        }

        //set infor user for mess
        let listMessageImg = [];
        listMessage.forEach((m) => {
            const usertemp = listUserInfo.find((u) => u.id === m.sender);
            let messtemp = m;
            messtemp['infoSender'] = { imageSender: usertemp.img, fullName: usertemp.fullName };
            listMessageImg.push(messtemp);
        });
        return res.status(200).json(listMessageImg);
    } catch (e) {
        return res.status(500).send('Loi' + e);
    }
});

// Recover Mess
router.put('/recoverMess', (req, res) => {
    const { id } = req.body;
    const params = {
        TableName: tableName,
        Key: {
            id,
        },
        UpdateExpression: 'SET #deleted=:deleted',
        ExpressionAttributeNames: {
            //COLUMN NAME
            '#deleted': 'deleted',
        },
        ExpressionAttributeValues: {
            ':deleted': true,
        },
    };
    docClient.update(params, (err, data) => {
        if (err) {
            return res.status(500).send('Loi ' + err);
        }
        return res.status(200).json('thanh cong');
    });
});

// Delete Mess
router.put('/deleteMess', (req, res) => {
    const { id, userId } = req.body;
    params = {
        TableName: tableName,
        Key: {
            id: id,
        },
        UpdateExpression: 'SET #removePerson=list_append(#removePerson,:removePerson)',
        ExpressionAttributeNames: {
            //COLUMN NAME
            '#removePerson': 'removePerson',
        },
        ExpressionAttributeValues: {
            ':removePerson': [userId],
        },
    };
    docClient.update(params, (err, data) => {
        if (err) {
            return res.status(500).send('Loi ' + err);
        }
        return res.status(200).json('thanh cong');
    });
});

router.get('/', (req, res) => {
    const { id } = req.body;
    console.log(id);
    const params = {
        TableName: tableName,
        Key: {
            id,
        },
    };
    docClient.get(params, (err, data) => {
        if (err) {
            return res.status(500).send('Loi' + err);
        } else {
            return res.send(data.Item);
        }
    });
});

module.exports = router;
