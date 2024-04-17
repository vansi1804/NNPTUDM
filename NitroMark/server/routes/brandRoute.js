const express = require("express");
const { createBrand, updateBrand, deleteBrand, getBrand, getAllBrand } = require("../controller/brandCtrl");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createBrand);

router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.get("/:id", authMiddleware, isAdmin, getBrand);
router.get("/", authMiddleware, isAdmin, getAllBrand);


router.delete("/:id", authMiddleware, isAdmin, deleteBrand);
// 5:32:27

module.exports = router;