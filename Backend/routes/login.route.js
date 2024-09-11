const router = require("express").Router();
const loginController = require("../controllers/login.controller");

router.post("/login", loginController.login);
router.post("/register", loginController.register);

module.exports = router;
