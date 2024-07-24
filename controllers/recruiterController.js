module.exports.insertrecruiter = async (req,res)=>{
    console.log(req.body)
   const name = req.body.name;
   const number = req.body.number;
   const email = req.body.email;
   const password = req.body.password;
   try{
       var sql = require("mssql");
       const bcrypt = require("bcrypt");
       var request = new sql.Request();
       const hashedpassword = await bcrypt.hash(password,10);
       request.input('name', sql.VarChar, name);
       request.input('email', sql.VarChar, email);
       request.input('password', sql.VarChar, hashedpassword);
       request.input('number', sql.Numeric, number);
       const usernumber = await request.query("Select * from Intern where number = @number")
       const usernumberrecruiter = await request.query("Select * from Recruiter  where number = @number")
       const useremail = await request.query("Select * from Intern where email = @email")
       const userrecruiteremail = await request.query("Select * from Recruiter  where email = @email")
         
        if(usernumber.recordset[0])
        {
            return res.status(200).json({success: false})
        }
        else if(useremail.recordset[0]){
            return res.status(200).json({success: false})
        }
        else if(userrecruiteremail.recordset[0]){
            return res.status(200).json({success: false})
        }
        else if(usernumberrecruiter.recordset[0]){
            return res.status(200).json({success: false})
        }
        else
        {
        await request.query("insert into Recruiter(name,email,password,number) values (@name,@email,@password,@number)",
       function (err, recordset) {
           
           if (err) console.log(err)

           // send records as a response
           res.send(recordset);
           
       });
   // });
    }
}catch(e){
   console.log(e)
}
};


module.exports.deleterecruiter = async (req,res)=>{
   var sql = require("mssql");
   var request = new sql.Request();
   console.log(req.body)
   const number = req.body.number;
   request.input('number', sql.Numeric, number);
   await request.query("delete from Recruiter where number = @number",function(err){
    if(err)
    {
        return res.status(200).json({success: false})
    }
   })
  ;
}


module.exports.getrecruiterbynumber = async(req,res)=>{

    console.log("in grbn")
    var sql = require("mssql");
    var request = new sql.Request();
    try{
    const number = req.params.number;
    request.input("number",sql.VarChar,number);

 const applicants = await request.query("select count(distinct (useremail)) as c from applicants where recruiteremail = @number");
  const num = applicants.recordset[0].c
  console.log(num)

  request.input("applicants",sql.Int,num);

  await request.query("update Recruiter set applicants = @applicants where email = @number")

    await request.query("select * from Recruiter where email = @number",
    function (err, recordset) {
        if (err) console.log(err)
        res.send(recordset);   
    });
}catch(e){console.log(e)}

}

module.exports.getshortlistbyid = async(req , res)=>{
    var sql = require("mssql");
   var request = new sql.Request();
   console.log(req.body)
   const postid = req.body.postid;
   request.input('postid', sql.VarChar, postid);
   await request.query("select useremail from shortlist where postid = @postid",function(err,recordset){
    if(err)
    {
        return res.status(200).json({success: false})
    }
    res.send(recordset);
   })
  ;
}


module.exports.getofferbyid = async(req , res)=>{
    var sql = require("mssql");
   var request = new sql.Request();
   console.log(req.body)
   const postid = req.body.postid;
   request.input('postid', sql.VarChar, postid);
   await request.query("select useremail from offered where postid = @postid",function(err,recordset){
    if(err)
    {
        return res.status(200).json({success: false})
    }
    res.send(recordset);
   })
  ;
}

module.exports.getrpostbyid = async(req , res)=>{
    var sql = require("mssql");
   var request = new sql.Request();
   console.log(req.body)
   const postid = req.body.postid;
   request.input('postid', sql.VarChar, postid);
   await request.query("select * from postrecruiter where postid = @postid",function(err,recordset){
    if(err)
    {
        return res.status(200).json({success: false})
    }
    res.send(recordset);
   })
  ;
}
module.exports.handlerejectoffer = async(req , res)=>{
    var sql = require("mssql");
   var request = new sql.Request();
   console.log(req.body)
   const postid = req.body.postid;
   const email = req.email
   request.input('postid', sql.VarChar, postid);
   request.input('email', sql.VarChar, email);
   await request.query("delete from offered where postid = @postid and useremail = @email",function(err,recordset){
    if(err)
    {
        return res.status(200).json({success: false})
    }

   })
   return res.status(200).json({success: true})
}

module.exports.handleacceptoffer = async(req , res)=>{

    var sql = require("mssql");
   var request = new sql.Request();
   console.log(req.body)
   const postid = req.body.postid;
   const email = req.email
   request.input('postid', sql.VarChar, postid);
   request.input('email', sql.VarChar, email);
   request.input('verify', sql.VarChar, 'true');
   const e1 = await request.query("update offered set accepted = @verify where useremail = @email and postid = @postid")
   const e2 = await request.query("update Intern set Bio = @verify where email = @email")

   return res.status(200).json({success: true})
   
}

module.exports.getoffers = async(req , res)=>{
    var sql = require("mssql");
   var request = new sql.Request();
   const email = req.email
   request.input('email', sql.VarChar, email);
   request.input('verify', sql.VarChar, 'true');
   const e1 = await request.query("select * from Intern where email = @email and Bio = @verify")
   if(!e1.recordset[0])
   {
    request.query("select * from offered INNER JOIN postrecruiter on offered.postid = postrecruiter.postid where offered.useremail = @email",function(err,recordset){
    if(err)
    {
        return res.status(200).json({success: false})
    }
    res.send(recordset)
   })
}
else
{
    request.query("select * from offered INNER JOIN postrecruiter on offered.postid = postrecruiter.postid where offered.useremail = @email and offered.accepted = @verify",function(err,recordset){
        if(err)
        {
            return res.status(200).json({success: false})
        }
        res.send(recordset)
       })
}
}


module.exports.userskills = async(req , res)=>{
    var sql = require("mssql");
   var request = new sql.Request();
  // console.log(req.body)
   await request.query("select * from skills",function(err,recordset){
    if(err)
    {
        return res.status(200).json({success: false})
    }
    res.send(recordset);
   })
  ;
}


