const router = require('express').Router();
const dotenv = require('dotenv');
const docClient = require("../db.config.js")

const tableName = 'user';

//Update user
router.put('/:id',(req, res) => {
    const {id} = req.params;
    const {fullName, birthdate, fiends, email, img, gender} = req.body;
    const params = {
        TableName: tableName,
        Key: id,
        Item: {
            id,
            fullName,
            email,
            birthdate,
            img,
            gender,
            fiends
        }
    };
    docClient.put(params, (err, data) => {
        if(err) {
            console.log(err);
            return res.status(500).send("Loi")
        }
        else{
            console.log(data);
            return res.json(data)
        }
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
            console.log(err);
            return res.status(500).send("Loi"+err)
        }
        else{
            console.log(data.Item.address);

            return res.send(data)
        }
    })
})
module.exports = router;