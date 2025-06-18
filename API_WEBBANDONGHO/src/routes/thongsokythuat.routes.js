const express = require("express");
const router = express.Router();
const ThongSoKyThuatController = require("../controllers/thongsokythuat.controller");

router.get("/", ThongSoKyThuatController.getAll);
router.get("/:id", ThongSoKyThuatController.getById);
router.post("/create", ThongSoKyThuatController.insert);
router.put("/update/:id", ThongSoKyThuatController.update);
router.delete("/delete/:id", ThongSoKyThuatController.delete);

module.exports = router;
