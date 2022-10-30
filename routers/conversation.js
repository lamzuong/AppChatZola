const router = require('express').Router();
const dotenv = require('dotenv');
const {v4: uuid} = require('uuid');
const docClient = require('../db.config');

router.post('/', (req, res) => {
    const id = uuid()
    let params = null
    if(req.body.members.length > 2) {
        params = {
            TableName: "conversation",
            Item: {
                id,
                members: req.body.members,
                avatarGroup: "https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.15752-9/299037378_415150437354620_5970909854063622706_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=2xwCQSZ4SIwAX8Y8FGs&_nc_ht=scontent.fsgn5-2.fna&oh=03_AdT9FUWmPPe_c9FJfD2ZG3D3bRgBsYtvn7x6yiPRJbpnAg&oe=636E66D1",
                groupName: "Group",
                creator: req.body.id,
                images:[],
                files:[]
            }
        }
        
    }else {
        params = {
            TableName: "conversation",
            Item: {
                id,
                members: req.body.members,
                images:[],
                files:[]
            }
        }
    }
    
    docClient.put(params, (err, data) => {
        if(err) {
            return res.status(500).json("Loi: "+err);
        }
        return res.status(200).json(data)
    })
})

router.get('/:id',(req, res) => {
    const {id} = req.params;
    var params = {
        ExpressionAttributeValues: {
         ":id": id
        }, 
        ExpressionAttributeNames: { "#members": "members" },
        FilterExpression: "contains(#members , :id)", 
        TableName: "conversation"
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