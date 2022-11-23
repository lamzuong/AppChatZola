const router = require('express').Router();
const dotenv = require('dotenv');
const { v4: uuid } = require('uuid');
const docClient = require('../db.config');
const multer = require('multer');
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
                avatarGroup: 'https://d370tx6r1rzpl2.cloudfront.net/4054a1a1-4bfc-4ff6-8560-33444141be1e-6420033.png',
                groupName: req.body.nameGroup,
                creator: req.body.id,
                date: date,
                images: [],
                waitAccept: [],
                files: [],
                group: true,
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
                group: false,
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
    const { conversationId, user, listMember } = req.body;
    let listTempInfo = [];
    let listTempId = [];
    for (let i = 0; i < listMember.length; i++) {
        listTempInfo.push(listMember[i].fullName);
        listTempId.push(listMember[i].id);
    }
    const params = {
        TableName: 'conversation',
        Key: {
            id: conversationId,
        },
        UpdateExpression: 'SET #waitAccept=list_append(#waitAccept,:waitAccept)',
        ExpressionAttributeNames: {
            '#waitAccept': 'waitAccept', //COLUMN NAME
        },
        ExpressionAttributeValues: {
            ':waitAccept': listTempId,
        },
    };
    docClient.update(params, (err, data) => {
        if (err) {
            console.log('Loi1' + err);
        } else {
            return res.send('Success');
        }
    });
});

// Chap nhan thanh vien
router.put('/acceptMem', (req, res) => {
    const { conversationId, user, member, listWaitInfo } = req.body;
    var listWaitAccept = listWaitInfo
        .reduce((list, user) => {
            return list.concat(user.id);
        }, [])
        .filter((item) => item !== member.id);

    const params = {
        TableName: 'conversation',
        Key: {
            id: conversationId,
        },
        UpdateExpression: 'SET #members=list_append(#members,:members), #waitAccept=:waitAccept',
        ExpressionAttributeNames: {
            '#members': 'members', //COLUMN NAME
            '#waitAccept': 'waitAccept',
        },
        ExpressionAttributeValues: {
            ':members': [member.id],
            ':waitAccept': listWaitAccept,
        },
    };
    docClient.update(params, (err, data) => {
        if (err) {
            console.log('Loi1' + err);
        } else {
            // Send mess kick group
            const paramMess = {
                TableName: 'message',
                Item: {
                    id: uuid(),
                    conversationID: conversationId,
                    sender: user.id,
                    mess: `${user.fullName} đã thêm ${member.fullName} vào nhóm.`,
                    deleted: false,
                    handleGroup: true,
                    removePerson: [],
                    img_url: '',
                    date: new Date().getTime(),
                },
            };
            docClient.put(paramMess, (err, data) => {
                if (err) {
                    console.log('Loi: ' + err);
                }
                console.log('thanh cong');
            });
            return res.send('Success');
        }
    });
});

// Tu choi thanh vien
router.put('/denyMem', (req, res) => {
    const { conversationId, member, listWaitInfo } = req.body;
    var listWaitAccept = listWaitInfo
        .reduce((list, user) => {
            return list.concat(user.id);
        }, [])
        .filter((item) => item !== member.id);

    const params = {
        TableName: 'conversation',
        Key: {
            id: conversationId,
        },
        UpdateExpression: 'SET #waitAccept=:waitAccept',
        ExpressionAttributeNames: {
            '#waitAccept': 'waitAccept', //COLUMN NAME
        },
        ExpressionAttributeValues: {
            ':waitAccept': listWaitAccept,
        },
    };
    docClient.update(params, (err, data) => {
        if (err) {
            console.log('Loi1' + err);
        } else {
            return res.send('Success');
        }
    });
});

// Xóa thành viên
router.put('/deleteMem', (req, res) => {
    const { conversationId, user, friend, members } = req.body;
    const params = {
        TableName: 'conversation',
        Key: {
            id: conversationId,
        },
        UpdateExpression: 'SET #members =:members',
        ExpressionAttributeNames: {
            '#members': 'members', //COLUMN NAME
        },
        ExpressionAttributeValues: {
            ':members': members.filter((user) => user !== friend.id),
        },
    };
    docClient.update(params, (err, data) => {
        if (err) {
            console.log('Loi1' + err);
        } else {
            // Send mess kick group hehe
            const paramMess = {
                TableName: 'message',
                Item: {
                    id: uuid(),
                    conversationID: conversationId,
                    sender: user.id,
                    mess: `${user.fullName} đã xóa ${friend.fullName} khỏi nhóm.`,
                    deleted: false,
                    handleGroup: true,
                    removePerson: [],
                    img_url: '',
                    date: new Date().getTime(),
                },
            };
            docClient.put(paramMess, (err, data) => {
                if (err) {
                    console.log('Loi: ' + err);
                }
                console.log('thanh cong');
            });
            return res.send('Success');
        }
    });
});

// Đổi tên group
router.put('/renameGroup', (req, res) => {
    const { conversationId, groupName, user } = req.body;
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
                    const paramMess = {
                        TableName: 'message',
                        Item: {
                            id: uuid(),
                            conversationID: conversationId,
                            sender: user.id,
                            mess: `${user.fullName} đã thay đổi tên nhóm.`,
                            deleted: false,
                            handleGroup: true,
                            removePerson: [],
                            img_url: '',
                            date: new Date().getTime(),
                        },
                    };
                    docClient.put(paramMess, (err, data) => {
                        if (err) {
                            console.log('Loi: ' + err);
                        }
                        console.log('thanh cong');
                    });
                    return res.send('Success');
                }
            });
        }
    });
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
// Đổi avatar group
router.put('/avaGroup', upload.single('img'), (req, res) => {
    const { conversationId, groupName, userID, userfullName } = req.body;
    console.log(userfullName, userID);
    const img = req.file;
    let paramsConversation = {};
    if (typeof img == 'undefined') {
        paramsConversation = {
            TableName: 'conversation',
            Key: {
                id: conversationId,
            },
            UpdateExpression: 'SET #groupName=:groupName',
            ExpressionAttributeNames: {
                '#groupName': 'groupName', //COLUMN NAME
            },
            ExpressionAttributeValues: {
                ':groupName': groupName,
            },
        };
    } else {
        const image = img.originalname;
        var filePath = `${uuid()}-${image}`;
        const uploadS3 = {
            Bucket: 'zola-chat',
            Key: filePath,
            Body: img.buffer,
        };
        s3.upload(uploadS3, (err, data) => {
            if (err) {
                return res.send('Loi upload');
            } else {
                console.log(2);
            }
        });
        paramsConversation = {
            TableName: 'conversation',
            Key: {
                id: conversationId,
            },
            UpdateExpression: 'SET #avatarGroup =:avatarGroup, #groupName=:groupName',
            ExpressionAttributeNames: {
                '#avatarGroup': 'avatarGroup', //COLUMN NAME
                '#groupName': 'groupName',
            },
            ExpressionAttributeValues: {
                ':avatarGroup': `${CLOUD_FRONT_URL}${filePath}`,
                ':groupName': groupName,
            },
        };
    }
    docClient.update(paramsConversation, (err, data) => {
        if (err) {
            console.log('Loi1' + err);
        } else {
            const paramMess = {
                TableName: 'message',
                Item: {
                    id: uuid(),
                    conversationID: conversationId,
                    sender: userID,
                    mess: `${userfullName} đã thay đổi thông tin nhóm.`,
                    deleted: false,
                    handleGroup: true,
                    removePerson: [],
                    img_url: '',
                    date: new Date().getTime(),
                },
            };
            docClient.put(paramMess, (err, data) => {
                if (err) {
                    console.log('Loi: ' + err);
                }
                console.log('thanh cong');
            });
            return res.send('Success');
        }
    });
});

// Đổi avatar group mobile
router.put('/mobile/avaGroup', (req, res) => {
    const { conversationId, avatarGroup, avatarOld, user } = req.body;
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
                    const paramMess = {
                        TableName: 'message',
                        Item: {
                            id: uuid(),
                            conversationID: conversationId,
                            sender: user.id,
                            mess: `${user.fullName} đã thay đổi ảnh nhóm.`,
                            deleted: false,
                            handleGroup: true,
                            removePerson: [],
                            img_url: '',
                            date: new Date().getTime(),
                        },
                    };
                    docClient.put(paramMess, (err, data) => {
                        if (err) {
                            console.log('Loi: ' + err);
                        }
                        console.log('thanh cong');
                    });
                    return res.send('Success');
                }
            });
        }
    });
});
// Ủy quyền trưởng nhóm
router.put('/grantPermission', (req, res) => {
    const { conversationId, creator, user } = req.body;
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
                    ':creator': creator.id,
                },
            };
            docClient.update(paramsConversation, (err, data) => {
                if (err) {
                    console.log('Loi1' + err);
                } else {
                    // Send mess out group
                    const paramMess = {
                        TableName: 'message',
                        Item: {
                            id: uuid(),
                            conversationID: conversationId,
                            sender: user.id,
                            mess: `${user.fullName} đã nhượng quyền Trưởng nhóm cho ${creator.fullName}.`,
                            deleted: false,
                            handleGroup: true,
                            removePerson: [],
                            img_url: '',
                            date: new Date().getTime(),
                        },
                    };
                    docClient.put(paramMess, (err, data) => {
                        if (err) {
                            console.log('Loi: ' + err);
                        }
                        console.log('thanh cong');
                    });
                    return res.send('Success');
                }
            });
        }
    });
});
// Rời khỏi group
router.put('/outGroup', (req, res) => {
    const { conversationId, user, members } = req.body;
    const params = {
        TableName: 'conversation',
        Key: {
            id: conversationId,
        },
        UpdateExpression: 'SET #members =:members',
        ExpressionAttributeNames: {
            '#members': 'members', //COLUMN NAME
        },
        ExpressionAttributeValues: {
            ':members': members.filter((u) => u !== user.id),
        },
    };
    docClient.update(params, (err, data) => {
        if (err) {
            console.log('Loi 1' + err);
        } else {
            // Send mess out group
            const paramMess = {
                TableName: 'message',
                Item: {
                    id: uuid(),
                    conversationID: conversationId,
                    sender: user.id,
                    mess: `${user.fullName} đã rời nhóm.`,
                    deleted: false,
                    handleGroup: true,
                    removePerson: [],
                    img_url: '',
                    date: new Date().getTime(),
                },
            };
            docClient.put(paramMess, (err, data) => {
                if (err) {
                    console.log('Loi: ' + err);
                }
                console.log('thanh cong');
            });
            return res.send('Success');
        }
    });
});
router.delete('/deleteGroup', (req, res) => {
    const { conversationId } = req.body;
    const params = {
        TableName: 'conversation',
        Key: {
            id: conversationId,
        },
    };
    docClient.delete(params, (err, data) => {
        if (err) {
            console.log('Loi 1' + err);
        } else {
            console.log(data);
            return res.send('Success');
        }
    });
});
// Search with group name
router.get('/search/group/:id/:groupName', (req, res) => {
    const { groupName, id } = req.params;
    console.log(req.body);
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
            var list = [];
            for (let i = 0; i < data.Items.length; i++) {
                if (data.Items[i].group) {
                    if (data.Items[i].groupName.includes(groupName)) list.push(data.Items[i]);
                }
            }
            return res.status(200).json(list);
        }
    });
});
// Search conversation id with idUser and idFriend
// router.get('/conversationId/:idUser/:idFriend', (req, res) => {
//     const { idUser, idFriend } = req.params;
//     console.log(req.body);
//     var params = {
//         ExpressionAttributeValues: {
//             ':idUser': idUser,
//             ':idFriend': idFriend,
//         },
//         ExpressionAttributeNames: { '#members': 'members' },
//         FilterExpression: 'contains(#members , :idUser) AND contains(#members , :idFriend)',
//         TableName: 'conversation',
//     };
//     docClient.scan(params, (err, data) => {
//         if (err) {
//             return res.status(500).send('Loi' + err);
//         } else {
//             return res.status(200).json(data.Items.filter((item) => !item.group));
//         }
//     });
// });
router.get('/conversationId/:idUser/:idFriend', (req, res) => {
    const { idUser, idFriend } = req.params;
    console.log(req.body);
    var params = {
        ExpressionAttributeValues: {
            ':idUser': idUser,
            ':idFriend': idFriend,
        },
        ExpressionAttributeNames: { '#members': 'members' },
        FilterExpression: 'contains(#members , :idUser) AND contains(#members , :idFriend)',
        TableName: 'conversation',
    };
    docClient.scan(params, (err, data) => {
        if (err) {
            return res.status(500).send('Loi' + err);
        } else {
            const paramsConversation = {
                TableName: 'conversation',
                Key: {
                    id: data.Items.filter((item) => !item.group)[0].id,
                },
            };
            docClient.get(paramsConversation, (err, data) => {
                if (err) {
                    return res.status(500).send('Loi' + err);
                } else {
                    return res.send(data.Item);
                }
            });
        }
    });
});
module.exports = router;
