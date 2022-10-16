const router = require('express').Router();
const dotenv = require('dotenv');
const { v4: uuid } = require('uuid');
const docClient = require('../db.config');

const tableName = 'message';

router.post('/', (req, res) => {
    const { conversationID, sender, mess } = req.body;
    const params = {
        TableName: tableName,
        Item: {
            id: uuid(),
            conversationID,
            sender,
            mess,
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
});

router.get('/:conversationID', (req, res) => {
    const { conversationID } = req.params;
    var params = {
        ExpressionAttributeValues: {
            ':id': conversationID,
        },
        ExpressionAttributeNames: { '#conversationID': 'conversationID' },
        FilterExpression: 'contains(#conversationID , :id)',
        TableName: tableName,
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
