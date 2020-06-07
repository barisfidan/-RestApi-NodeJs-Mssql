const jwt = require("jsonwebtoken");
const {isTokenIncluded,getAccessTokenFromHeader} = require("../helpers/authorization/tokenHelpers");



const getAccessToRoute = (req,res,next) =>{

    const {JWT_SECRET_KEY} = process.env;
    if (!isTokenIncluded(req)) {
        //401 Unauthorized
        //403 Forbidden
        return res.status(400)
            .json({
                success: false,
                message : "Auth Failed."
            })
    }
    const accessToken =getAccessTokenFromHeader(req); // token ı alır

   
    jwt.verify(accessToken,JWT_SECRET_KEY,(err,decoded)=>{
        if (err) {
          
            return res.status(400)
            .json({
                success: false,
                message : "Auth Failed."
            })
        }
       
        next();

    })

};


module.exports = {
    getAccessToRoute
};

