


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
// const config ={
//     user: 'sql12645651',
//     port :3306,
//     password: 'AG8ZeUSj4v',
//     database: 'sql12645651',
//     server: 'sql12.freemysqlhosting.net',
    
//     options:{
//         trustServerCertificate: true,
//         trustedConnection: false,
//         enableArithAbort: true,
//     },
// }

var sql = require('mssql');

// var con = mysql.createConnection({
//     host: 'sql12.freemysqlhosting.net',
//     user: 'sql12645651',
//     port :3306,
//     password: 'AG8ZeUSj4v',
//     database: 'sql12645651',
// });

//  const connect  = ()=>{ con.connect(function(err) {
//   if (err) throw err;
//   console.log(" DB Connected!");
// });
//  }


// const connect = ()=>{
// sql.connect("Driver={ODBC Driver 18 for SQL Server};Server=tcp:projectjd.database.windows.net,1433;Database=Project1;Uid=neel;Pwd={Omsairam007!};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;",  function (err) {
    
//     if (err) {console.log(err)};
//     console.log('DB connected');
// })
// }

const connect = ()=>{
    sql.connect("Driver={ODBC Driver 18 for SQL Server};Server=tcp:server-full-stack-jd.database.windows.net,1433;Database=jd-databse;Uid=neel;Pwd={Password1!};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;",  function (err) {
        
        if (err) {console.log(err)};
        console.log('DB Connected');
    })
    }


module.exports = connect;

