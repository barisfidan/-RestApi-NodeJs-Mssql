const {sendJwtToClient} = require("../helpers/authorization/tokenHelpers");
const asyncErrorWrapper = require("express-async-handler");
const sql = require("mssql");

const login =asyncErrorWrapper(async(req,res,next) =>{
    const {userName,password} = req.body;
    var request = new sql.Request();
    request.query('select  * from TEST..USERS', function (err, data) {
        if (err){
            console.log(err)
        } 
        const UserName = data.recordset[0].UserName;
        const Password = data.recordset[0].Password;
        const id = data.recordset[0].id;

        if (UserName === userName && Password === password) {
        sendJwtToClient(UserName,Password,id,res);// token geri döner
        }
        else{
            return res.status(400)
            .json({
                success: false,
                message : "Username or password is wrong."
            })
        }
      
    });
  
});


module.exports = {login};