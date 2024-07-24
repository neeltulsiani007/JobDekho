module.exports.getuserprofile = async (req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
    const jwt_decode = require('jwt-decode')
    console.log("in getuserprofile")
    const email = req.email;
    request.input('email', sql.VarChar, email);
    const numberofposts = await request.query("select count(postid) as c from postintern where useremail = @email")
    console.log(numberofposts.recordset[0].c)
    const posts = numberofposts.recordset[0].c
    request.input('numberofposts', sql.Numeric, posts);
    await request.query("update Intern set numberofposts = @numberofposts where email = @email")

    try{   
  const user = await request.query("Select * from Intern  where email = @email")
  const userrecruiter = await request.query("Select * from Recruiter  where email = @email")

   if(user.recordset[0])
   {
    await request.query("select * from Intern where email=@email",
    function (err, recordset) {       
        if (err) console.log("error in users controller")
        res.send(recordset);     
    });
   }
   if(userrecruiter.recordset[0])
   {
    await request.query("select * from Recruiter where email = @email",
    function (err, recordset) {       
        if (err) console.log("error in users controller")
        res.send(recordset);     
    });
   }
 }catch(e){
    console.log(e)
 }
 };

 module.exports.updateuserprofile = async(req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
    const cloudinary = require("../utils/cloudinary");
    const upload = require("../utils/multer");
    var request = new sql.Request();

    console.log("in updateuserprofile")
    console.log(req.body)
    const name = req.body.name;
    const email = req.email;
    const companyname = req.body.companyname;

    const bio = req.body.bio;
    
     
    try{
        if(req.file)
        {
        const result = await cloudinary.uploader.upload(req.file.path);
        const photo= result.secure_url
     request.input('photo', sql.VarChar,photo);   
     request.input('name', sql.VarChar, name);
     request.input('companyname', sql.VarChar, companyname);
     request.input('email', sql.VarChar, email);
     request.input('bio', sql.VarChar, bio);
     request.input('number', sql.Numeric, number);
     await request.query("update comments set profilephoto = @photo where useremail = @email")
     await request.query("update postrecruiter set profilephoto = @photo where email = @email")
     await request.query("update postrecruiter set username = @name where email=@email")
     await request.query("update Recruiter set name = @name , companyname = @companyname , bio = @bio, email = @email , profilephoto = @photo where email = @email")
        }
        else{
            request.input('name', sql.VarChar, name);
            request.input('companyname', sql.VarChar, companyname);
            request.input('email', sql.VarChar, email);
            request.input('bio', sql.VarChar, bio);
            request.input('number', sql.Numeric, number);      
            await request.query("update postrecruiter set username = @name where email=@email")
            await request.query("update Recruiter set name = @name  , bio = @bio , companyname = @companyname  , email = @email where email = @email")
        }
     }catch(e)
     {
        console.log(e)
        return res.status(200).json({success: false,});
     }
     return res.status(200).json({success: true,});

 }

 module.exports.internprofile = async(req,res)=>{

   console.log("in internprofile")
    var sql = require("mssql");
    var request = new sql.Request();
    const email = req.body.email;
    request.input("email",sql.VarChar,email);
    await request.query("select * from Intern where email = @email",function(err,recordset)
    {
        if (err) console.log("error in interprofile export")
            res.send(recordset); 
    });
 }

 module.exports.getinternexperience = async(req,res)=>{

   var sql = require("mssql");
   var request = new sql.Request();
   const email = req.email;
   request.input("email",sql.VarChar,email);
   await request.query("select * from Experience where useremail = @email",function(err,recordset)
   {
       if (err) console.log("error in ip controller")
           res.send(recordset); 
   });
}

module.exports.getinterneducation = async(req,res)=>{

   var sql = require("mssql");
   var request = new sql.Request();
   const email = req.email;
   console.log(req.email)
   request.input("email",sql.VarChar,email);
   await request.query("select * from Education where useremail = @email",function(err,recordset)
   {
       if (err) console.log("error in ip controller")
           res.send(recordset); 
   });
}


module.exports.updateinternprofile = async(req,res)=>{
   var sql = require("mssql");
   var request = new sql.Request();
   console.log("in updateinternprofile")
    console.log(req.body)
    const name = req.body.name;
    const email = req.email;
    const age = req.body.age;
    const city = req.body.city;
    const skills = req.body.skills;
    const country = req.body.country;
    const state = req.body.state;
    const zipcode = req.body.zipcode;
    const gender = req.body.gender;
    const dob = req.body.dob;
    
    try{
   
    request.input('name', sql.VarChar, name);
    request.input('city', sql.VarChar, city);
    request.input('skills', sql.VarChar, skills);
    request.input('country', sql.VarChar, country);
    request.input('state', sql.VarChar, state);
    request.input('zipcode', sql.VarChar, zipcode);
    request.input('gender', sql.VarChar, gender);
    request.input('dob', sql.VarChar, dob);
    request.input('email', sql.VarChar, email);
    request.input('age', sql.Numeric, age);

    await request.query("delete from skills where useremail = @email")

    const skillsarray = skills.split(',');
    const table = new sql.Table('skills');
    table.create = false; // table already exists
    table.columns.add('skill', sql.VarChar(50), { nullable: true });
    table.columns.add('useremail', sql.VarChar(50), { nullable: true });

    for(let i=0;i<skillsarray.length;i++)
    {
      table.rows.add(skillsarray[i],email)
    }

    request.bulk(table, (err, result) => {
        // ... error checks
      })
    if(req.body.name)
    {
    await request.query("update comments set username = @name where useremail=@email")
    await request.query("update postintern set username = @name where useremail=@email")
    }
    await request.query("update Intern set name = @name , age = @age , skills = @skills , city = @city , gender = @gender , country = @country , state = @state , dob = @dob ,zipcode = @zipcode   where email = @email")
       
      
    }catch(e)
    {
      console.log(e)
      return res.status(200).json({success: false,});
    }
    return res.status(200).json({success: true,});

}

module.exports.postexperience = async(req,res)=>{

    var sql = require("mssql");
    var request = new sql.Request();
    console.log(req.body)
    const experience = req.body.experience;
    const email = req.email;
    const location = req.body.location
    request.input("email",sql.VarChar,email);
    request.input("experience",sql.VarChar,experience);
    request.input("location",sql.VarChar,location);
    await request.query("insert into Experience(useremail,experience,location) values(@email,@experience,@location)",function(err,recordset)
    {
        if (err) console.log(err)
        res.send(recordset); 
    });
 }

 module.exports.posteducation = async(req,res)=>{

    var sql = require("mssql");
    var request = new sql.Request();
    const education = req.body.education;
    const location = req.body.location
    const email = req.email;
    request.input("email",sql.VarChar,email);
    request.input("location",sql.VarChar,location);
    request.input("education",sql.VarChar,education);
    await request.query("insert into Education(useremail,education,location) values(@email,@education,@location)",function(err,recordset)
    {
        if (err) console.log("error in ip controller")
        res.send(recordset); 
    });
 }

 module.exports.updateinternphoto = async(req,res)=>{
    var sql = require("mssql");
    const cloudinary = require("../utils/cloudinary");
    const upload = require("../utils/multer");
    var request = new sql.Request();
    console.log("in updateinternphoto")
    const email = req.email;
    request.input("email",sql.VarChar,email);
    
     try{

        if(req.file)
        {
        const result = await cloudinary.uploader.upload(req.file.path);
        const photo= result.secure_url
     request.input('photo', sql.VarChar,photo);   
     await request.query("update comments set profilephoto = @photo where useremail = @email")
     await request.query("update postintern set profilephoto = @photo where useremail = @email")
     await request.query("update Intern set  profilephoto = @photo where email = @email")
        }
        else
        {
            return res.status(200).json({success: false,});
        }

     }catch(e)
     {
        console.log(e)
        return res.status(200).json({success: false,});
     }
     return res.status(200).json({success: true,});

 }





module.exports.postbio = async(req,res)=>{

    var sql = require("mssql");
    var request = new sql.Request();
    console.log(req.body)
    const bio = req.body.bio;
    const email = req.email;
    request.input("email",sql.VarChar,email);
    request.input("bio",sql.VarChar,bio);
    await request.query("update Intern set bio = @bio where email = @email",function(err,recordset)
    {
        if (err) console.log(err)
        res.send(recordset); 
    });
 }

 module.exports.getprofileexperience = async(req,res)=>{

    var sql = require("mssql");
    var request = new sql.Request();
    const number = req.params.number;
    request.input("number",sql.VarChar,number);
    await request.query("select * from Experience where useremail = @number",function(err,recordset)
    {
        if (err) console.log("error in ip controller")
            res.send(recordset); 
    });
 }
 
 module.exports.getprofileeducation = async(req,res)=>{
 
    var sql = require("mssql");
    var request = new sql.Request();
    const number = req.params.number;
    request.input("number",sql.VarChar,number);
    await request.query("select * from Education where useremail = @number",function(err,recordset)
    {
        if (err) console.log("error in ip controller")
            res.send(recordset); 
    });
 }

 module.exports.settingskills = async(req,res)=>{

var sql = require("mssql");


const request = new sql.Request();

// table.columns.add('skill', sql.VarChar, { nullable: false });
// table.columns.add('usernumber', sql.Int, { nullable: false });
const users = await request.query("select * from Intern")
const table = new sql.Table('skills');
table.create = false; // presuming table already exists

table.columns.add('skill', sql.VarChar(50), { nullable: true });

table.columns.add('useremail', sql.VarChar(50), { nullable: true });



for(let i=0;i<users.recordset.length;i++)
{
 var skills = users.recordset[i].skills.split(',');
 var number = users.recordset[i].email;
 for(let j = 0;j<skills.length;j++)
 {
    table.rows.add(skills[j],number)
 }

}
// Add rows



request.bulk(table, (err, result) => {
  // ... error checks
})
}

module.exports.getuserskills = async(req,res)=>{
 
    var sql = require("mssql");
    var request = new sql.Request();
    const number = req.params.number;
    request.input("number",sql.VarChar,number);
    await request.query("select * from skills where useremail = @number",function(err,recordset)
    {
        if (err) console.log("error in ip controller")
            res.send(recordset); 
    });
 }