const jwt = require("jsonwebtoken");

let dt = new Date();

let data = new Date(dt.getTime() + 30 * 60000).getTime();

let iat = Math.floor(Date.now() / 1000);

let exp = Math.floor(data / 1000);

let tokenExpCreate = new Date(dt.getTime() + 60 * 60000).getTime();

let tokenExp = Math.floor(tokenExpCreate / 1000);

const payloadSDK = {
    appKey: "PUT APP KEY HERE",
    iat: iat,
    exp: exp,
    tokenExp: tokenExp,
};

const tokenSDK = jwt.sign(payloadSDK, "PUT KEY HERE");

console.log("\n********* TOKEN ********* \n");

console.log(tokenSDK);

console.log("\n************************* \n");