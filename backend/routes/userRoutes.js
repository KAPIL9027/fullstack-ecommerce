import {authUser,
        registerUser,
        logoutUser,
        getUserProfile,
        updateUser,
        deleteUser,
        getUsers,
        updateUserProfile,
        getUserByID} 
        from '../controllers/userController.js'

import express from 'express'
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();


router.get('/',protect,admin,getUsers);
router.post('/logout',logoutUser);
router.post('/login',authUser);
router.post('/register',registerUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserByID).put(protect,admin,updateUser);

export default router;
