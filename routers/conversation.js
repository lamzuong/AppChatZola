const router = require('express').Router();
const dotenv = require('dotenv');
const { v4: uuid } = require('uuid');
const docClient = require('../db.config');

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
module.exports = router;
