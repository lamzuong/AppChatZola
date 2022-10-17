const router = require('express').Router();
const dotenv = require('dotenv');
const docClient = require("../db.config.js")

const tableName = 'user';

//Update user
router.put('/',(req, res) => {
    // const {id} = req.params;
    const {id, birthdate, fiends, img, gender} = req.body;
    const params = {
            TableName: 'user',
            Key: {
                id
            },               
            UpdateExpression: 'SET #birthdate =:birthdate, #gender=:gender, #img=:img',
            ExpressionAttributeNames: {//COLUMN NAME 
                '#birthdate': 'birthdate',
                '#gender': 'gender',
                '#img': 'img'
            },
            ExpressionAttributeValues: {
                ':birthdate': birthdate ? birthdate : req.body.birthdateOld,
                ':gender': gender !== null ? gender : req.body.genderOld,
                ':img': img ? img : req.body.imgOld,
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
            console.log(err);
            return res.status(500).send("Loi"+err)
        }
        else{
            console.log(data.Item.address);

            return res.send(data.Item)
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
            console.log(err);
            return res.status(500).send("Loi"+err)
        }
        else{
            return res.status(200).json(data.Items)
        }
    })
})
module.exports = router;