const AWS  = require("aws-sdk");
const router = require('express').Router();
const dotenv = require('dotenv');
const docClient = require("../db.config.js")

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
dotenv.config();

const tableName = 'user';

const poolData = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.CLINET_ID
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

router.post('/register' ,(req, res) => {
    const {username, email, password, fullName} = req.body;

    var attributeList = [];

    var dataEmail = {
        Name: 'email',
        Value: email,
    };

    var dataPersonalName = {
        Name: 'name',
        Value: username,
    };
    
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    var attributePersonalName = new AmazonCognitoIdentity.CognitoUserAttribute(dataPersonalName);

    attributeList.push(attributePersonalName);
    attributeList.push(attributeEmail);

    userPool.signUp(username, password, attributeList, null, function(err, result) {
        if (err) {
            return res.status(500).send("Loi1: "+err);
        }
        // res.status(200).json(result.userSub);
        const params = {
            TableName: tableName,
            Item: {
                id: result.userSub,
                username,
                fullName,
                email,
                birthdate: '',
                img: '',
                gender: '',
                friends: [],
                loginFirst: true
            }
        };
        docClient.put(params, (err, data) => {
            if(err) {
                console.log(err);
                return res.status(500).send("Loi"+err);
            }
            else{
                console.log(data);
                return res.status(200).send("Thanh cong");
            }
        })
    });
})

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    var authenticationData = {
        Username: email,
        Password: password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
    );
    
    var userData = {
        Username: email,
        Pool: userPool,
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            var accessToken = result;
            const params = {
                TableName: tableName,
                Key:{
                    id: accessToken.getIdToken().payload.sub
                }
            }
            docClient.get(params,(err, data) => {
                if(err) {
                    res.status(500).send("dang nhap khong thanh cong");
                }
                res.status(200).json(data.Item)
            })
        },
        onFailure: function(err) {
            res.status(500).send(err.message || JSON.stringify(err));
        }
    })
})

module.exports = router;