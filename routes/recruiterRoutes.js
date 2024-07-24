const app = require('express');
const router = app.Router();
const jwtverification = require("../middleware/jwtverification")
const {insertrecruiter ,deleterecruiter, getrecruiterbynumber ,handleacceptoffer, getoffers , handlerejectoffer ,getrpostbyid, getshortlistbyid ,userskills, getofferbyid } = require("../controllers/recruiterController")
router.post("/insertrecruiter", insertrecruiter);
router.post("/deleterecruiter", deleterecruiter);
router.post("/getshortlistbyid", getshortlistbyid);
router.post("/getofferbyid", getofferbyid);
router.post("/handlerejectoffer",jwtverification, handlerejectoffer);
router.get("/userskills",jwtverification, userskills);
router.get("/getoffers",jwtverification, getoffers);
router.post("/handleacceptoffer",jwtverification, handleacceptoffer);
router.post("/getrpostbyid",jwtverification, getrpostbyid);
router.get("/getrecruiterbynumber/:number",jwtverification,getrecruiterbynumber)
module.exports = router;