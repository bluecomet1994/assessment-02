import * as express from 'express';
import ItemController from '../controllers/ItemController';

const router: express.Router = express.Router();

router.get('/', ItemController.getItems);
router.post('/', ItemController.createItem);
router.put('/', ItemController.updateItem);
router.put('/purchase', ItemController.purchaseItem);
router.delete('/', ItemController.removeItem);

export default router;