"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const items_1 = require("./items");
const router = express.Router();
router.use('/items', items_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map