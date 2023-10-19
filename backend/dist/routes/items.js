"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ItemController_1 = require("../controllers/ItemController");
const router = express.Router();
router.get('/', ItemController_1.default.getItems);
router.post('/', ItemController_1.default.createItem);
router.put('/', ItemController_1.default.updateItem);
router.put('/purchase', ItemController_1.default.purchaseItem);
router.delete('/', ItemController_1.default.removeItem);
exports.default = router;
//# sourceMappingURL=items.js.map