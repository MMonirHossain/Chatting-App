const express = require("express");
const router = express.Router();
const { getUsers } = require("../controller/usersController.js");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse.js");
const avatarUpload = require("../middlewares/user/avatarUpload.js");
//const { check } = require("express-validator");
const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middlewares/user/userValidator.js");

//users page
router.get("/", decorateHtmlResponse("USERS"), getUsers);

//add user
router.post("/", avatarUpload, addUserValidator, addUserValidatorHandler);

module.exports = router;
