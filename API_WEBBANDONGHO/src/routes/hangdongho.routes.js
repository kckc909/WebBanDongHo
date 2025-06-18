const express = require('express');
const router = express.Router();
const HangDongHoController = require('../controllers/hangdongho.controller');



router.get("/", HangDongHoController.getAll);
router.get("/:id", HangDongHoController.getById);
router.post("/create", HangDongHoController.create);
router.put("/update/:id", HangDongHoController.update);
router.delete("/delete/:id", HangDongHoController.delete);
router.get("/search", HangDongHoController.search);

module.exports = router;
