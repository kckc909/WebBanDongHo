// routes/LoaiHangRouter.js
const express = require('express');
const router = express.Router();
const LoaiHangController = require('../controllers/loaihang.controller');

router.get('/', LoaiHangController.getAllLoaiHang);
router.get('/:id',LoaiHangController.getLoaiHangById);
router.post('/create', LoaiHangController.createLoaiHang);
router.put('/update/:id', LoaiHangController.updateLoaiHang);
router.delete('/delete/:id', LoaiHangController.deleteLoaiHang);
router.get('/search', LoaiHangController.searchLoaiHang);

module.exports = router;
