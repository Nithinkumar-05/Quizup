const router = require("express").Router();
const LoginController = require("../controllers/login.controller");

router.post("/login", LoginController.login);
router.post("/register", LoginController.register);

module.exports = router;
