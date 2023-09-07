const express = require('express');
const app = express();
const connect = require("./db");
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const internRoutes = require("./routes/internRoutes")
const recruiterRoutes = require("./routes/recruiterRoutes")
const userRoutes = require("./routes/userRoutes")
const refreshtokenRoutes = require("./routes/refreshtokenRoutes")
const logoutRoutes = require("./routes/logoutRoutes")
const internpostRoutes = require("./routes/internpostRoutes")
const profileRoutes = require("./routes/profileRoutes")
const recruiterpostRoutes = require("./routes/recruiterpostRoutes")
const chatRoutes = require("./routes/chatRoutes")
const emailRoutes = require("./routes/emailRoutes")
 var cors = require('cors');
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,        //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}


const PORT = process.env.PORT || 4000;
// const { getuserbynumber } = require("./controllers/userController");

 connect();
 app.use(cookieParser());
 app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))
// app.use(cors());



app.use("/uploads" , express.static("./uploads"))
app.use("/videos" , express.static("./videos"))
app.use("/", internRoutes);
app.use("/", recruiterRoutes);
app.use("/", userRoutes);
app.use("/",refreshtokenRoutes);
app.use("/",logoutRoutes);
app.use('/',internpostRoutes);
app.use('/',profileRoutes)
app.use('/',recruiterpostRoutes);
app.use('/',emailRoutes);
app.use('/',chatRoutes);


app.use(express.static("./client/build"));
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,"client","build","index.html"));
});

const server =   app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
})

// const io = require('socket.io')(server, {
//   cors: {
//       origin: 'http://localhost:3000',
//   }
// });
