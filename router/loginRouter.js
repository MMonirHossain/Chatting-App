const express = require("express");

const router = express.Router();

const { getLogin } = require("../controller/loginController.js");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse.js");
//login page

router.get("/", decorateHtmlResponse("LOGIN"), getLogin);

module.exports = router;
