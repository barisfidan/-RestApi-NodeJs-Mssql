const jwt = require("jsonwebtoken");


const sendJwtToClient = (UserName,Password,id,res) => {
    const token = generateJWTFromUser(UserName,id);

    const {JWT_COOKIE,NODE_ENV} = process.env;

    return res
    .status(200)
    .cookie("access_token",token,{
        httpOnly : true,
        expires : new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 *60),
        secure : NODE_ENV === "development" ? false : true
    })
    .json({
        success : true,
        access_token : token,
        data : {
            name : UserName
        }
    });
}

const generateJWTFromUser = function(UserName,id){ //token işlemleri
    const {JWT_SECRET_KEY,JWT_EXPIRE} = process.env;

    const payload ={
        id : id,
        name : UserName
    };

    const token = jwt.sign(payload,JWT_SECRET_KEY,{
        expiresIn : JWT_EXPIRE
    });
    return token;
}


const isTokenIncluded = (req) =>{
    return (
         req.headers.authorization && req.headers.authorization.startsWith("Bearer:")
         );

}
const getAccessTokenFromHeader = (req) =>{
    const authorization = req.headers.authorization;
    const access_token = authorization.split(" ")[1];
    return access_token;
}
module.exports = {
    sendJwtToClient,
    isTokenIncluded,
    getAccessTokenFromHeader
};
