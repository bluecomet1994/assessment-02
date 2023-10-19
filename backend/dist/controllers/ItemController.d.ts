import { Request, Response } from "express";
export default class ItemController {
    static getItems(req: Request, res: Response): Promise<void>;
    static createItem(req: Request, res: Response): Promise<void>;
    static updateItem(req: Request, res: Response): Promise<void>;
    static purchaseItem(req: Request, res: Response): Promise<void>;
    static removeItem(req: Request, res: Response): Promise<void>;
}
