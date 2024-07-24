const app = require('express');
const router = app.Router();
const jwtverification = require("../middleware/jwtverification")
const {recruiterpost, getrecruiterpost,handleoffer, getapplicantsbyid, postapplicants, updateapplicants, getapplicants, handleshortlist} = require("../controllers/postController")
router.post("/recruiterpost",jwtverification,recruiterpost);
router.get("/getrecruiterpost",jwtverification,getrecruiterpost)
router.get("/getrecruiterposts",jwtverification,getrecruiterpost)
router.post("/postapplicants",jwtverification,postapplicants);
router.get("/updateapplicants",jwtverification,updateapplicants)
router.get("/getapplicants",jwtverification,getapplicants)
router.post("/getapplicantsbyid",jwtverification,getapplicantsbyid)
router.post("/handleshortlist",jwtverification,handleshortlist)
router.post("/handleoffer",jwtverification,handleoffer)
module.exports = router;