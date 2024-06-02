const jwt = require("jsonwebtoken");

module.exports = {
 Sign: async (body, next) => {
    return await jwt.sign(process.env.JWT_SECRET, {expiresIn: "1h"})
 },
 deCode: async (token, next) => {
    return await jwt.decode(token, process.env.JWT_SECRET)
 }
}
