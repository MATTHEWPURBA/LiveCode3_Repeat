const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

console.log(secret, "ini secret");
console.log(process.env.JWT_SECRET, "ini secretsss");

const createWebToken = (payload) => {
	let token = jwt.sign(payload, secret);
	return token;
};

const verifyWebToken = (token) => {
	let payload = jwt.verify(token, secret);
	return payload;
};
module.exports = { createWebToken, verifyWebToken };
