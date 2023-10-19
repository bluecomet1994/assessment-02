"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ItemModel_1 = require("../models/ItemModel");
class ItemController {
    static async getItems(req, res) {
        await ItemModel_1.default.find()
            .then(items => {
            res.status(200).json(items);
        })
            .catch((error) => {
            res.status(500).json(error);
        });
    }
    static async createItem(req, res) {
        const newItem = new ItemModel_1.default(req.body);
        newItem.save()
            .then((item) => {
            res.status(200).json(item);
        })
            .catch((error) => {
            res.status(500).json(error);
        });
    }
    static async updateItem(req, res) {
        const { name, description, quantity, purchased } = req.body;
        await ItemModel_1.default.findOne({ _id: req.query.id })
            .then(item => {
            if (item) {
                item.name = name;
                item.description = description;
                item.quantity = quantity;
                item.purchased = purchased;
                item.save()
                    .then(() => res.status(200).json({ message: "The item has been updated" }));
            }
            else {
                res.status(200).json({ message: "The item with ID does not exist" });
            }
        })
            .catch((error) => {
            res.status(500).json(error);
        });
    }
    static async purchaseItem(req, res) {
        await ItemModel_1.default.findOne({ _id: req.query.id })
            .then(item => {
            if (item) {
                item.purchased = item.purchased ? false : true;
                item.save()
                    .then(() => res.status(200).json({ message: "The item has been purchased" }));
            }
            else {
                res.status(200).json({ message: "The item with ID does not exist" });
            }
        })
            .catch((error) => {
            res.status(500).json(error);
        });
    }
    static async removeItem(req, res) {
        await ItemModel_1.default.findOneAndDelete({ id: req.params.id })
            .then(() => {
            res.status(200).json({
                message: "The item has been removed"
            });
        })
            .catch((error) => {
            res.status(500).json(error);
        });
    }
}
exports.default = ItemController;
//# sourceMappingURL=ItemController.js.map