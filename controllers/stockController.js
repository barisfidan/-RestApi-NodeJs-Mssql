const asyncErrorWrapper = require("express-async-handler");
const sql = require("mssql");

const getAllStock = asyncErrorWrapper(async(req,res,next) =>{
   
        var request = new sql.Request();
      
        request.query('select top 2 * from TBLSTSABIT', function (err, data) {
            
         
            if (err){
                console.log(err)
            } 
            res.send(data.recordset);
          
          
        });
        
    });

const addStock = asyncErrorWrapper(async(req,res,next) =>{
   
    const {STOK_KODU,STOK_ADI} = req.body;
    
    const transaction = new sql.Transaction(/* [pool] */)
    transaction.begin(err => {
    const request = new sql.Request(transaction)
   
    request.query("insert into [TBLSTSABIT] (SUBE_KODU,ISLETME_KODU,STOK_KODU,STOK_ADI) VALUES (1,1,'"+STOK_KODU+"','"+STOK_ADI+"')"
    , (err, result) => {
        // ... error checks
        if (err) {
            console.log("Transaction committed.")
        return res.status(200)
        .json({
            success: false,
        })
        }
        transaction.commit(err => {
            // ... error checks
             console.log("Transaction committed.")
            return res.status(200)
            .json({
                success: true,
            })
           
        })
    })
})
       
       
     
    });

module.exports = {getAllStock,addStock};