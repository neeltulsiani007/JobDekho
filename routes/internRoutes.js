const app = require('express');
const router = app.Router();
var jwtverification = require("../middleware/jwtverification")
const {insertintern , deleteintern, getallinterns, getinternsbystring , checkinternexists , checkotp} = require("../controllers/internController")
router.post("/insertintern", insertintern);
router.post("/deleteintern", deleteintern);
router.get("/getallinterns",jwtverification,getallinterns);
router.post("/getinternsbystring",getinternsbystring);
router.post("/checkinternexists",checkinternexists);
router.post("/checkotp",checkotp);

module.exports = router;