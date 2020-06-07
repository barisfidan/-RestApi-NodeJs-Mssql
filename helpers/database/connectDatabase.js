const sql = require("mssql");
const connectDatabase= function(USER,PASSWORD,SERVER,DATABASE){
   
    var config = {
        user: USER,
        password: PASSWORD,
        server: SERVER, 
        database: DATABASE
    };
        let pool =  sql.connect(config)
        .then(()=>{
            console.log("sql connection succesfull");

        }).catch(err=>{
            console.log(err);
        })
};

module.exports = connectDatabase;