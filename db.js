
var sql = require("mssql");

// const config ={
//     user: 'SA',
//     password: 'Password123',
//     database: 'TutorialDB',
//     server: 'localhost',
    
//     options:{
//         trustServerCertificate: true,
//         trustedConnection: false,
//         enableArithAbort: true,
//     },
// }


const connect = ()=>{
sql.connect("Driver={ODBC Driver 18 for SQL Server};Server=tcp:projectjd.database.windows.net,1433;Database=Project1;Uid=neel;Pwd={Omsairam007!};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;",  function (err) {
    
    if (err) {console.log(err)};
    console.log('DB connected');
})
}
module.exports = connect;

