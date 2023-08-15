const express = require("express");
const router = express.Router();
const { getInbox } = require("../controller/inboxController.js");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse.js");

router.get("/", decorateHtmlResponse("INBOX"), getInbox);

module.exports = router;
