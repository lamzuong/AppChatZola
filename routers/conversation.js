const router = require('express').Router();
const dotenv = require('dotenv');
const { v4: uuid } = require('uuid');
const docClient = require('../db.config');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: 'AKIA34KECLYEL2WGGHN2',
    secretAccessKey: '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',
});

router.post('/', (req, res) => {
    const id = uuid();
    let params = null;
    var date = new Date().getTime();

    if (req.body.members.length > 2) {
        params = {
            TableName: 'conversation',
            Item: {
                id,
                members: req.body.members,
                avatarGroup:
                    'https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.15752-9/299037378_415150437354620_5970909854063622706_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=2xwCQSZ4SIwAX8Y8FGs&_nc_ht=scontent.fsgn5-2.fna&oh=03_AdT9FUWmPPe_c9FJfD2ZG3D3bRgBsYtvn7x6yiPRJbpnAg&oe=636E66D1',
                groupName: req.body.nameGroup,
                creator: req.body.id,
                date: date,
                images: [],
                files: [],
            },
        };
    } else {
        params = {
            TableName: 'conversation',
            Item: {
                id,
                members: req.body.members,
                date: date,
                images: [],
                files: [],
            },
        };
    }

    docClient.put(params, (err, data) => {
        if (err) {
            return res.status(500).json('Loi: ' + err);
        }
        return res.status(200).json(data);
    });
});
// get những conversation của user.id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    var params = {
        ExpressionAttributeValues: {
            ':id': id,
        },
        ExpressionAttributeNames: { '#members': 'members' },
        FilterExpression: 'contains(#members , :id)',
        TableName: 'conversation',
    };
    docClient.scan(params, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Loi' + err);
        } else {
            return res.status(200).json(data.Items);
        }
    });
});
// Lâm Zương
// get conversation theo id
router.get('/idCon/:id', (req, res) => {
    const { id } = req.params;
    const params = {
        TableName: 'conversation',
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
router.put('/addMem', (req, res) => {
    const { conversationId, listFriendId, members } = req.body;
    const getConversation = {
        TableName: 'conversation',
        Key: {
            id: conversationId,
        },
    };
    docClient.get(getConversation, (err, data) => {
        if (err) {
            console.log('Loi: ' + err);
        } else {
            for (let i = 0; i < listFriendId.length; i++) {
                members.push(listFriendId[i]);
            }
            const paramsConversation = {
                TableName: 'conversation',
                Key: {
                    id: conversationId,
                },
                UpdateExpression: 'SET #members =:members',
                ExpressionAttributeNames: {
                    '#members': 'members', //COLUMN NAME
                },
                ExpressionAttributeValues: {
                    ':members': members,
                },
            };
            docClient.update(paramsConversation, (err, data) => {
                if (err) {
                    console.log('Loi1' + err);
                } else {
                    console.log(data);
                    return res.send('Success');
                }
            });
        }
    });
});
router.put('/deleteMem', (req, res) => {
    const { conversationId, friendId, members } = req.body;
    const getConversation = {
        TableName: 'conversation',
        Key: {
            id: conversationId,
        },
    };
    docClient.get(getConversation, (err, data) => {
        if (err) {
            console.log('Loi: ' + err);
        } else {
            const paramsConversation = {
                TableName: 'conversation',
                Key: {
                    id: conversationId,
                },
                UpdateExpression: 'SET #members =:members',
                ExpressionAttributeNames: {
                    '#members': 'members', //COLUMN NAME
                },
                ExpressionAttributeValues: {
                    ':members': members.filter((user) => user !== friendId),
                },
            };
            docClient.update(paramsConversation, (err, data) => {
                if (err) {
                    console.log('Loi1' + err);
                } else {
                    console.log(data);
                    return res.send('Success');
                }
            });
        }
    });
});
router.put('/renameGroup', (req, res) => {
    const { conversationId, groupName } = req.body;
    console.log(groupName);
    const getConversation = {
        TableName: 'conversation',
        Key: {
            id: conversationId,
        },
    };
    docClient.get(getConversation, (err, data) => {
        if (err) {
            console.log('Loi: ' + err);
        } else {
            const paramsConversation = {
                TableName: 'conversation',
                Key: {
                    id: conversationId,
                },
                UpdateExpression: 'SET #groupName =:groupName',
                ExpressionAttributeNames: {
                    '#groupName': 'groupName', //COLUMN NAME
                },
                ExpressionAttributeValues: {
                    ':groupName': groupName,
                },
            };
            docClient.update(paramsConversation, (err, data) => {
                if (err) {
                    console.log('Loi1' + err);
                } else {
                    console.log(data);
                    return res.send('Success');
                }
            });
        }
    });
});
router.put('/mobile/avaGroup', (req, res) => {
    const { conversationId, avatarGroup } = req.body;
    if (!(avatarGroup.base64 && avatarGroup.fileType)) {
    } else {
        var buffer = Buffer.from(avatarGroup.base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        const fileType = avatarGroup.fileType;
        var filePath = `${uuid() + Date.now().toString()}.${fileType}`;
        const uploadS3 = {
            Bucket: 'zola-chat',
            Key: filePath,
            Body: buffer,
        };
        s3.upload(uploadS3, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
    }
    const getConversation = {
        TableName: 'conversation',
        Key: {
            id: conversationId,
        },
    };
    docClient.get(getConversation, (err, data) => {
        if (err) {
            console.log('Loi: ' + err);
        } else {
            const paramsConversation = {
                TableName: 'conversation',
                Key: {
                    id: conversationId,
                },
                UpdateExpression: 'SET #avatarGroup =:avatarGroup',
                ExpressionAttributeNames: {
                    '#avatarGroup': 'avatarGroup', //COLUMN NAME
                },
                ExpressionAttributeValues: {
                    ':avatarGroup': avatarGroup,
                },
            };
            docClient.update(paramsConversation, (err, data) => {
                if (err) {
                    console.log('Loi1' + err);
                } else {
                    console.log(data);
                    return res.send('Success');
                }
            });
        }
    });
});
module.exports = router;
