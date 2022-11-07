const router = require('express').Router();
const dotenv = require('dotenv');
const { v4: uuid } = require('uuid');
const docClient = require('../db.config');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: 'AKIA34KECLYEL2WGGHN2',
    secretAccessKey: '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',
});
const CLOUD_FRONT_URL = 'https://d370tx6r1rzpl2.cloudfront.net/';

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
                avatarGroup: 'https://d370tx6r1rzpl2.cloudfront.net/ad83db1f-95c8-4a95-a031-2fad89698c9d/6420033.png',
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
// Thêm thành viên
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
// Xóa thành viên và rời khỏi group
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
// Đổi tên group
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
// Đổi avatar group mobile
router.put('/mobile/avaGroup', (req, res) => {
    const { conversationId, avatarGroup, avatarOld } = req.body;
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
                    ':avatarGroup':
                        avatarGroup.base64 && avatarGroup.fileType ? `${CLOUD_FRONT_URL}${filePath}` : avatarOld,
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
// Ủy quyền trưởng nhóm
router.put('/grantPermission', (req, res) => {
    const { conversationId, creator } = req.body;
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
                UpdateExpression: 'SET #creator =:creator',
                ExpressionAttributeNames: {
                    '#creator': 'creator', //COLUMN NAME
                },
                ExpressionAttributeValues: {
                    ':creator': creator,
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
