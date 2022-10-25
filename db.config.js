const AWS  = require("aws-sdk");
const dotenv = require('dotenv');

dotenv.config();

AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
})

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
})

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = docClient;