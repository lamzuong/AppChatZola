const AWS = require('aws-sdk');
const router = require('express').Router();
const dotenv = require('dotenv');
const docClient = require('../db.config.js');

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
dotenv.config();

const tableName = 'user';

const poolData = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.CLINET_ID,
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
// register
router.post('/register', (req, res) => {
    const { email, password, fullName } = req.body;
    const username = email.split('@')[0];

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

    userPool.signUp(username, password, attributeList, null, function (err, result) {
        if (err) {
            return res.status(500).send('Loi1: ' + err);
        }
        const params = {
            TableName: tableName,
            Item: {
                id: result.userSub,
                fullName,
                email,
                birthdate: '01/01/2000',
                img: 'https://d370tx6r1rzpl2.cloudfront.net/9f7a09e8-24c7-46e0-82aa-01fd28a1a50d1666923758284.png',
                gender: true,
                friends: [],
                listSender: [],
                listReceiver: [],
                loginFirst: true,
            },
        };
        docClient.put(params, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Loi' + err);
            } else {
                console.log(data);
                return res.status(200).send('Thanh cong');
            }
        });
    });
});
// login
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    var authenticationData = {
        Username: email,
        Password: password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    var userData = {
        Username: email,
        Pool: userPool,
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var accessToken = result;
            console.log(accessToken.getAccessToken());
            const params = {
                TableName: tableName,
                Key: {
                    id: accessToken.getIdToken().payload.sub,
                },
            };
            docClient.get(params, (err, data) => {
                if (err) {
                    res.status(500).send('dang nhap khong thanh cong');
                }
                res.status(200).json(data.Item);
            });
        },
        onFailure: function (err) {
            res.status(500).send(err.message || JSON.stringify(err));
        },
    });
});
// deleteUser
router.delete('/deleteUser', (req, res) => {
    const cognito = new AWS.CognitoIdentityServiceProvider();
    cognito.adminDeleteUser(
        {
            UserPoolId: process.env.USER_POOL_ID,
            Username: req.body.username,
        },
        (err, data) => {
            if (err) {
                res.status(500).send('Loi: ', err.stack);
            } else {
                var params = {
                    ExpressionAttributeValues: {
                        ':email': req.body.email,
                    },
                    ExpressionAttributeNames: { '#email': 'email' },
                    FilterExpression: 'contains(#email , :email)',
                    TableName: tableName,
                };
                docClient.scan(params, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        var delParams = {
                            TableName: tableName,
                            Key: {
                                id: data.Items[0].id,
                            },
                        };
                        docClient.delete(delParams, (err, data) => {
                            if (err) {
                                console.log('Loi 1' + err);
                            } else {
                                console.log(data);
                            }
                        });
                    }
                });
                return res.status(200).send('Success');
            }
        },
    );
});

// changePassword
router.post('/changePassword', (req, res) => {
    const cognito = new AWS.CognitoIdentityServiceProvider();
    var changePasswordParams = {
        Password: req.body.password,
        Permanent: true,
        Username: req.body.username,
        UserPoolId: process.env.USER_POOL_ID,
    };
    let data = cognito.adminSetUserPassword(changePasswordParams, (err, data) => {
        if (err) {
            res.status(500).send('Loi: ', err.stack);
        } else {
            res.status(200).send('Success');
        }
    });
    return data;
});

module.exports = router;
