
module.exports.internpost = async(req,res)=>{
    var sql = require("mssql");
    const cloudinary = require("../utils/cloudinary");
       const upload = require("../utils/multer");
    var request = new sql.Request();
    const moment = require('moment')
    try{
    // console.log(req.body)
      console.log("in post intern")
    const name = req.user;
    const caption = req.body.caption
    const email = req.email;
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result)
    const photo= result.secure_url
    const  cloudid= result.public_id

        // const photo = req.file.filename;
        request.input('name', sql.VarChar, name);
        request.input('email', sql.VarChar, email);
        request.input('photo', sql.VarChar,photo);
        request.input('filetype', sql.VarChar,"photo");
        request.input('caption', sql.VarChar, caption);
        request.input('cloudid', sql.VarChar, cloudid);
        const date = moment(new Date()).format("YYYY-MM-DD");
        request.input('DATE', sql.Date,date);

        const userintern = await request.query("Select * from Intern where email = @email")
        const userrecruiter = await request.query("Select * from Recruiter  where email = @email")
         
        if(userintern.recordset[0])
        {
            const pic = await request.query("select profilephoto as p from Intern where email  = @email")
            const  profile = pic.recordset[0].p;
            request.input('profile', sql.VarChar,profile);
            await request.query("insert into postintern(filetype,username,useremail,imagedata,caption,posttype,date,profilephoto,cloudid) values (@filetype,@name,@email,@photo,@caption,'Intern',@date,@profile,@cloudid)",
            function (err, recordset){
                if (err) console.log(err)
                return  res.status(200).json({success: true,});
            });
        }

    }catch(e)
    {
        console.log(e); 
        return res.status(200).json({success: false,});
       
    }
}

module.exports.users = async (req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
    try{     
         await request.query("select * from Intern",
        function (err, recordset) {       
            if (err) console.log("error in users controller")
            res.send(recordset);     
        });
    
 }catch(e){
    console.log(e)
 }
 };

 module.exports.getpost = async (req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
    try{     
         await request.query("select * from postintern",
        function (err, recordset) {       
            if (err) console.log("error in post controller")
            res.send(recordset);     
        });
 }catch(e){
    console.log(e)
 }
 };
 module.exports.getrecruiterposts = async (req,res)=>{
    var sql = require("mssql");
    const email = req.email;
    request.input('email', sql.VarChar, email);
    var request = new sql.Request();
    try{     
         await request.query("select * from postrecruiter where email = @email",
        function (err, recordset) {       
            if (err) console.log("error in post controller")
            res.send(recordset);     
        });
 }catch(e){
    console.log(e)
 }
 };

 module.exports.getpostsbyoffset = async(req,res)=>{

    console.log("inside getoffset")
    var sql = require("mssql");
    var request = new sql.Request();
    const offset = req.params.offset*4;
    const fetch = offset+4
     console.log(offset)
    request.input('offset', sql.Int, offset);
    request.input('fetch', sql.Int, fetch);
    const numberofposts = await request.query("select count(postid) as c from postintern",)
   

    console.log(numberofposts)
    const number = numberofposts.recordset[0].c
    if(fetch > number)
    {
        console.log("here")
        return res.status(200).json({hasMore:"false"})
    }
    try{     
        await request.query("select * from postintern order by date offset @offset rows fetch next 4 rows only",
       function (err, recordset) {       
           if (err) console.log("error in post controller")
         //  if(Object.keys(recordset).length <4)
          // {
            // console.log(recordset)
     
            res.send(recordset);  
         //  }
        //    console.log( Object.keys(recordset).length)
         //  res.send(recordset);  
      

 
       });

}catch(e){
   console.log(e)
}

 }

 module.exports.postlikes = async(req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
        const  postid  = req.body.postid;
        const email = req.email;
        console.log("here")
        request.input('email', sql.VarChar, email);
        
        request.input('postid', sql.Numeric, postid);

         const found = await request.query("select * from likes where useremail = @email and postid = @postid")
          console.log(found)
        if (!found.recordset[0]) {
          await request.query("insert into likes(postid,useremail) values(@postid,@email)");
          res.json({ liked: true });
        } else {
          await request.query("delete from likes where useremail = @email and postid = @postid");
          res.json({ liked: false });
        }
        const likesnumber = await request.query("select count(useremail) as c from likes where postid = @postid")
        console.log(likesnumber.recordset[0].c)
        request.input('countlikes', sql.Numeric, likesnumber.recordset[0].c);
        await request.query("update postintern set countlikes = @countlikes where postid = @postid");

 };

 module.exports.handleshortlist = async(req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
        const  postid  = req.body.postid;
        const email = req.body.useremail;
        console.log("here")
        request.input('email', sql.VarChar, email);  
        request.input('postid', sql.VarChar, postid);

         const found = await request.query("select * from shortlist where useremail = @email and postid = @postid")
          console.log(found)
        if (!found.recordset[0]) {
          await request.query("insert into shortlist(postid,useremail) values(@postid,@email)");
          res.json({ liked: true });
        } else {
          await request.query("delete from shortlist where useremail = @email and postid = @postid");
          res.json({ liked: false });
        }

        const likesnumber = await request.query("select count(useremail) as c from shortlist where postid = @postid")
        request.input('countlikes', sql.Numeric, likesnumber.recordset[0].c);
        await request.query("update postrecruiter set numberofshortlisted = @countlikes where postid = @postid");

 };

 module.exports.handleoffer= async(req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
        const  postid  = req.body.postid;
        const email = req.body.useremail;
        console.log("here")
        request.input('email', sql.VarChar, email);  
        request.input('postid', sql.VarChar, postid);
        request.input('accepted', sql.VarChar, 'false');

         const found = await request.query("select * from offered where useremail = @email and postid = @postid")
          console.log(found)
        if (!found.recordset[0]) {
          await request.query("insert into offered(postid,useremail,accepted) values(@postid,@email,@accepted)");
          res.json({ liked: true });
        } else {
          await request.query("delete from offered where useremail = @email and postid = @postid");
          res.json({ liked: false });
        }

 };

 module.exports.updatelikes = async (req,res)=>{
    console.log("here")
    var sql = require("mssql");
    var request = new sql.Request();
    console.log(req.email)
     const email = req.email;
     request.input('email',sql.VarChar,email);
    try{     
        await request.query("select postid from likes where useremail = @email",
        function (err, recordset) {       
            if (err) console.log("error in users controller")
            res.send(recordset);     
        });

 }catch(e){
    console.log(e)
 }
 };

 module.exports.individualpost = async(req,res)=>{


    var sql = require("mssql");
    var request = new sql.Request();
    const id = req.params.id;
    
    request.input("postid",sql.Numeric,id);
    await request.query("select * from postintern where postid = @postid",function(err,recordset)
    {
        if (err) console.log("error in users controller")
            res.send(recordset); 
    });
    
 }

 module.exports.getcomments = async(req,res)=>{
   
    var sql = require("mssql");
    var request = new sql.Request();
    const id = req.params.id;
    request.input("postid",sql.Numeric,id);
    await request.query("select * from comments where postid = @postid",function(err,recordset)
    {
        if (err) console.log("error in users controller")
            res.send(recordset); 
    });
 }

 module.exports.addcomments = async(req,res)=>{

    var sql = require("mssql");
    var request = new sql.Request();
    const moment = require('moment')
    console.log("inside addcomments")
    const id = req.params.id;
    const comment = req.body.comment;
    const date = (new Date());
    console.log(req.user)
    console.log(date)
    const name = req.user;
    const email = req.email;
    request.input("email",sql.VarChar,email);
    const user = await request.query("select * from Intern where email  = @email");
    const userrecruiter = await request.query("select * from Recruiter where email  = @email");
    request.input("postid",sql.Numeric,id);

    request.input("name",sql.VarChar,name);
    request.input("date",sql.DateTime,date);
    request.input("comment",sql.VarChar,comment);
    console.log(id,comment,date,name)
    const comm = await request.query("select count(comment) as c from comments where postid = @postid")
    const comments = comm.recordset[0].c;
    console.log(comments)
    request.input("comments",sql.Numeric,comments+1);
    var pic;
    await request.query("update postintern set countcomments = @comments where postid=@postid")
    if(user.recordset[0]){
     pic = await request.query("select profilephoto as p from Intern where email  = @email")
    }
    else 
    {
        pic = await request.query("select profilephoto as p from Recruiter where email  = @email")
    }
    if(pic.recordset[0].p){
    const  profile = pic.recordset[0].p;
    request.input('profile', sql.VarChar,profile);
    await request.query("insert into comments(comment,postid,useremail,username,commentdate,profilephoto) values(@comment,@postid,@email,@name,@date,@profile)",function(err,recordset)
    {
        if (err) console.log("error in addcomments controller")
            res.send(recordset); 
    });
}
else
{
    await request.query("insert into comments(comment,postid,useremail,username,commentdate) values(@comment,@postid,@email,@name,@date)",function(err,recordset)
    {
        if (err) console.log("error in addcomments controller")
            res.send(recordset); 
    });
}
 }

 module.exports.recruiterpost = async(req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
    const moment = require('moment')
    console.log(req.body)
 
    const name = req.body.name;
    const email = req.email;
    const mode = req.body.mode;
    const stipend = req.body.stipend;
    const username = req.user;
    const date = req.body.lastdate;
    datecheck = new Date(date)
    const lastdate = (new Date(datecheck.getTime() + (24 * 60 * 60 * 1000)))
    const postdate = moment(new Date()).format("YYYY-MM-DD");
    const postid = req.body.uid;
    var skills = req.body.skills;
    const info = req.body.info
    request.input("email",sql.VarChar,email);
    request.input("postid",sql.VarChar,postid);
    request.input("username",sql.VarChar,username);
    request.input("name",sql.VarChar,name);
    request.input("info",sql.VarChar,info);
    request.input("mode",sql.VarChar,mode);
    request.input("stipend",sql.Numeric,stipend);
    request.input("lastdate",sql.Date,lastdate);
    request.input("postdate",sql.Date,postdate);
    request.input("skills",sql.VarChar,skills);
    const photo = await request.query("select profilephoto as p from Recruiter where email = @email")
    const profilephoto = photo.recordset[0].p
    request.input("profilephoto",sql.VarChar,profilephoto);
    var min = Math.ceil(0);
    var max = Math.floor(6);
    var image = Math.floor(Math.random() * (max - min + 1) + min);
    request.input("imageid",sql.Numeric,image);
   const array  = skills.split(",")
   console.log(array)  

    try{
    if(req.mode === 'Online')
    {
        console.log("in online")
        if(req.body.info != ""){
            console.log("here")
        await request.query("insert into postrecruiter(profilephoto,imagenumber,postid,username,postdate,email,cname,info,mode,stipend,lastdatetoapply,skills) values(@profilephoto,@imageid,'${postid}',@username,@postdate,@email,@name,@info,@mode,@stipend,@lastdate,@skills)")
        }
        else
        {
        await request.query("insert into postrecruiter(profilephoto,imagenumber,postid,username,postdate,email,cname,mode,stipend,lastdatetoapply,skills) values(@profilephoto,@imageid,'${postid}',@username,@postdate,@email,@name,@mode,@stipend,@lastdate,@skills)")
        }
    }

    else
    {
       
       const address = req.body.address;
       const city = req.body.city;
       const country = req.body.country;
       const state = req.body.state;
       const zipcode = req.body.zipcode;
    
       request.input("address",sql.VarChar,address);
       request.input("city",sql.VarChar,city);
       request.input("country",sql.VarChar,country);
       request.input("state",sql.VarChar,state);
       request.input("zipcode",sql.VarChar,zipcode);
 
       if(req.body.info)
       {
        await request.query("insert into postrecruiter(profilephoto,imagenumber,postid,username,postdate,email,cname,info,mode,stipend,lastdatetoapply,skills,address,city,state,zipcode,country) values(@profilephoto,@imageid,@postid,@username,@postdate,@email,@name,@info,@mode,@stipend,@lastdate,@skills,@address,@city,@state,@zipcode,@country)")
       }
       else
       {
        await request.query("insert into postrecruiter(profilephoto,imagenumber,postid,username,postdate,email,cname,mode,stipend,lastdatetoapply,skills,address,city,state,zipcode,country) values(@profilephoto,@imageid,@postid,@username,@postdate,@email,@name,@mode,@stipend,@lastdate,@skills,@address,@city,@state,@zipcode,@country)")
       }
    }
    }catch(e)
    {
        console.log(e)
    }
    }

module.exports.getrecruiterpost = async (req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
    try{     
         await request.query("select * from postrecruiter",
        function (err, recordset) {       
            if (err) console.log("error in post controller")
            res.send(recordset);     
        });

 }catch(e){
    console.log(e)
 }
 };

 module.exports.postapplicants = async(req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
        const  postid  = req.body.postid;
        const email = req.email;
        request.input('email', sql.VarChar, email);
        request.input('postid', sql.VarChar, postid);

      
         
          const rnumber = await request.query("select email as n from postrecruiter where postid = @postid")
          const recruiternumber = rnumber.recordset[0].n;
          request.input('recruiternumber', sql.VarChar, recruiternumber);
          const found = await request.query("select * from applicants where useremail = @email and postid = @postid")
          console.log(found)
        if (!found.recordset[0]) {
          await request.query("insert into applicants(recruiteremail,postid,useremail) values(@recruiternumber,@postid,@email)");
          res.json({ liked: true });
        }else{
          await request.query("delete from applicants where useremail = @email and postid = @postid");
          res.json({ liked: false });
        }
        const numberofapplicants = await request.query("select count(useremail) as c from applicants where postid = @postid")
        request.input('numberofapplicants', sql.Numeric, numberofapplicants.recordset[0].c);
        await request.query("update postrecruiter set numberofapplicants = @numberofapplicants where postid = @postid");

 };


 module.exports.updateapplicants = async (req,res)=>{
    console.log("here")
    var sql = require("mssql");
    var request = new sql.Request();
     const email = req.email;
     request.input('email',sql.VarChar,email);
    try{     
        await request.query("select postid from applicants where useremail = @email",
        function (err, recordset){       
            if (err) console.log("error in users controller")
            res.send(recordset);     
        });

 }catch(e){
    console.log(e)
 }
 };


 module.exports.getapplicants = async (req,res)=>{
    console.log("here")
    var sql = require("mssql");
    var request = new sql.Request();
     const email = req.email;
     request.input('email',sql.VarChar,email);
    try{     
      await request.query("select distinct(useremail) from applicants where recruiteremail = @email",
      function (err, recordset){       
          if (err) {console.log("error in users controller")   
          console.log(err) 
      }
      res.send(recordset);
      });

 }catch(e){
    console.log(e)
 }
 };






module.exports.internvideo = async(req,res)=>{
    var sql = require("mssql");
    const cloudinary = require("../utils/cloudinary");
       const upload = require("../utils/multer");
    var request = new sql.Request();
    const moment = require('moment')
    try{
    const name = req.user;
    const caption = req.body.caption
    const email = req.email;
    console.log("before result")
    const result = await cloudinary.uploader.upload(req.file.path,{resource_type: "video", });
    console.log(result)
    const video= result.secure_url
    const  cloudid= result.public_id

        // const photo = req.file.filename;
        request.input('name', sql.VarChar, name);
        request.input('email', sql.Numeric, email);
        request.input('video', sql.VarChar,video);
        request.input('filetype', sql.VarChar,"video");
        request.input('caption', sql.VarChar, caption);
        request.input('cloudid', sql.VarChar, cloudid);
        const date = moment(new Date()).format("YYYY-MM-DD");
        request.input('DATE', sql.Date,date);

        const userintern = await request.query("Select * from Intern where email = @email")
        const userrecruiter = await request.query("Select * from Recruiter  where email = @email")
         
        if(userintern.recordset[0])
        {
            const pic = await request.query("select profilephoto as p from Intern where email  = @email")
            const  profile = pic.recordset[0].p;
            request.input('profile', sql.VarChar,profile);
            await request.query("insert into postintern(filetype,username,useremail,imagedata,caption,posttype,date,profilephoto,cloudid) values (@filetype,@name,@email,@video,@caption,'Intern',@date,@profile,@cloudid)",
            function (err, recordset){
                if (err) console.log(err)
                res.send(recordset);
            });
        }

    }catch(e)
    {
        console.log(e); 
        return res.status(200).json({success: false,});
       
    }
}

module.exports.getapplicantsbyid = async (req,res)=>{
    console.log("here")
    var sql = require("mssql");
    var request = new sql.Request();
    const email = req.email;
    const postid = req.body.postid
    request.input('email',sql.VarChar,email);
    request.input('postid',sql.VarChar,postid);
    try{     
      await request.query("SELECT * FROM Intern AS i INNER JOIN Applicants AS a ON i.email = a.useremail WHERE a.postid = @postid;",
      function (err, recordset){       
          if (err) {console.log("error in getappbyid controller")   
          console.log(err) 
      }
      res.send(recordset);
      });

 }catch(e){
    console.log(e)
 }
 };