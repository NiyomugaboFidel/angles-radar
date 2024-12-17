import express from 'express';
import { toggleCompanyInWatchlist, getUserWatchlist } from '../../controllers/watchlist.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',authMiddleware,  toggleCompanyInWatchlist);

router.get('/', authMiddleware, getUserWatchlist);

export default router;
