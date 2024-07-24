module.exports.sendemail = async (req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
    console.log("in sendemail")
   const email = req.email;
   console.log(req.email)
   request.input('email', sql.VarChar, email);
   request.input('verified', sql.VarChar, "true");

   try{
		const e =  await request.query("update Intern set verified = @verified where email = @email" );
        const e2 =  await request.query("update Recruiter set verified = @verified where email = @email " );
        return res.status(200).json({success: true})

   }catch(e)
   {
    console.log(error);
	res.status(500).send({ message: "Internal Server Error" });
   }
	}

    module.exports.verifyemail = async (req, res) => {
        try {      
            console.log("inside verifyemail")
            var sql = require("mssql");
            var request = new sql.Request();
            const number = req.params.number;
            const token = req.params.token;
            request.input('number', sql.Numeric, number);
            request.input('token',sql.VarChar,token);
             console.log(number)
             console.log(token)
             const user = await request.query("Select * from Intern  where number = @number and refreshtoken = @token")
             const userrecruiter = await request.query("Select * from Recruiter  where number = @number and refreshtoken = @token")

            if(user.recordset[0])
            {
            console.log("inside user")
              await request.query("update Intern set verified = 'true' where number = @number " )
              res.status(200).send({ message: "Email verified successfully" ,success:true});
            }

            else if(userrecruiter.recordset[0])
            {
                console.log("inside userrecruiter")
                await request.query("update Recruiter set verified = 'true' where number = @number " )
                res.status(200).send({ message: "Email verified successfully" ,success:true});
            }
            else
            {
               console.log("Error")
                res.status(200).send({ message: "Email verification failed" , success:false });
            }
            
        } catch (error) {
            res.status(500).send({ message: "Internal Server Error" ,success:false });
        }
    }
    

