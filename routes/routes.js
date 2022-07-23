const express = require('express');
const loginController = require("../controller/userController");
const generalController = require("../controller/general");
const chatController = require("../controller/chat");
var router = express.Router();

router.get("/",generalController.welcome);
// User routes
router.post("/login",loginController.signin);
router.post("/allusers",loginController.getAllUsers);
// Chat routs
router.post("/getMessages",chatController.getMessage);
router.get("/video/:name",chatController.servVideo);
router.post("/videoUpload",chatController.saveVideo);
router.post("/allvideos",chatController.getAllVideos);
module.exports = router;