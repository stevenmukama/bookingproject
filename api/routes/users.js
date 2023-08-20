import express from 'express';
import {
	updateUser,
	deleteUser,
	getUser,
	getUsers,
} from '../controllers/user.js';
import {
	verifyAdmin,
	verifyToken,
	verifyUser,
} from '../utils/verifyToken.js';
import { forgotPassword, resetPassword } from '../controllers/auth.js';

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

//UPDATE
router.put('/:id', verifyUser, updateUser);

//DELETE
router.delete('/:id', verifyUser, deleteUser);

//GET
router.get('/:id', verifyUser, getUser);

//GET ALL
router.get('/', verifyAdmin, getUsers);

//forgot password
router.post('/forgotpassword', forgotPassword);

//reset-password'

router.post('/reset-password', resetPassword);

export default router;
