const express = require("express");
const { createCategory, updateCategory, deleteCategory, getCategory, getAllCategory } = require("../controller/prodCategoryCtrl");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createCategory);

router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.get("/:id", authMiddleware, isAdmin, getCategory);
// router.get("/", authMiddleware, isAdmin, getAllCategory);
router.get("/", getAllCategory);


router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
// 5:32:27

module.exports = router;