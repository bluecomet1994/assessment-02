import { Request, Response } from "express";
import ItemModel from "../models/ItemModel";

export default class ItemController {
  static async getItems(req: Request, res: Response) {
    await ItemModel.find()
      .then(items => {
        res.status(200).json(items);
      })
      .catch((error: Error) => {
        res.status(500).json(error);
      });
  }

  static async createItem(req: Request, res: Response) {
    const newItem: any = new ItemModel(req.body);

    newItem.save()
      .then((item: any) => {
        res.status(200).json(item);
      })
      .catch((error: Error) => {
        res.status(500).json(error);
      });
  }

  static async updateItem(req: Request, res: Response) {
    const id = req.params.id;
    const { name, description, quantity, purchased } = req.body;

    await ItemModel.findOne({ id })
      .then(item => {
        if (item) {
          item.name = name;
          item.description = description;
          item.quantity = quantity;
          item.purchased = purchased;

          item.save()
            .then(() => res.status(200).json({ message: "The item has been updated" }));
        } else {
          res.status(200).json({ message: "The item with ID does not exist" });
        }
      })
      .catch((error: Error) => {
        res.status(500).json(error);
      });
  }

  static async purchaseItem(req: Request, res: Response) {
    const id = req.params.id;

    await ItemModel.findOne({ id })
      .then(item => {
        if (item) {
          item.purchased = item.purchased ? false : true;

          item.save()
            .then(() => res.status(200).json({ message: "The item has been purchased" }));
        } else {
          res.status(200).json({ message: "The item with ID does not exist" });
        }
      })
      .catch((error: Error) => {
        res.status(500).json(error);
      });
  }

  static async removeItem(req: Request, res: Response) {
    await ItemModel.findOneAndDelete({ id: req.params.id })
      .then(() => {
        res.status(200).json({
          message: "The item has been removed"
        });
      })
      .catch((error: Error) => {
        res.status(500).json(error);
      });
  }
}