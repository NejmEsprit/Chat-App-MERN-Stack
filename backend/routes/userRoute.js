import express from 'express';
import protectRoute from '../middleware/proctectRoute.js';
import { getUsersForSidebar } from '../controllers/userCtrl.js';

const router = express.Router();
router.get('/', protectRoute, getUsersForSidebar)

export default router;